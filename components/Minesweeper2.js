"use client";

import { useState, useEffect } from "react";

const generateGrid = (rows, cols, mines) => {
  const grid = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({
      revealed: false,
      flagged: false,
      mine: false,
      adjacent: 0,
    }))
  );

  let placed = 0;
  while (placed < mines) {
    const r = Math.floor(Math.random() * rows);
    const c = Math.floor(Math.random() * cols);
    if (!grid[r][c].mine) {
      grid[r][c].mine = true;
      placed++;
    }
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c].mine) continue;
      let count = 0;
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          const nr = r + dr;
          const nc = c + dc;
          if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
            if (grid[nr][nc].mine) count++;
          }
        }
      }
      grid[r][c].adjacent = count;
    }
  }

  return grid;
};

export default function Minesweeper({ rows = 8, cols = 8, mines = 10 }) {
  const [grid, setGrid] = useState(generateGrid(rows, cols, mines));
  const [gameOver, setGameOver] = useState(false);
  const [time, setTime] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [score, setScore] = useState(0);
  const [flags, setFlags] = useState(0);

  useEffect(() => {
    let interval;

    if (timerActive && !gameOver) {
      interval = setInterval(() => {
        setTime((t) => t + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timerActive, gameOver]);

  const reveal = (r, c, workingGrid = null) => {
    const baseGrid = workingGrid || grid;

    if (!timerActive) setTimerActive(true);
    if (gameOver || baseGrid[r][c].revealed || baseGrid[r][c].flagged) return;

    const newGrid = workingGrid
      ? baseGrid
      : baseGrid.map((row) => row.map((cell) => ({ ...cell })));

    // Score only if first reveal of safe tile
    if (!newGrid[r][c].revealed && !newGrid[r][c].mine) {
      setScore((s) => s + 1);
    }

    newGrid[r][c].revealed = true;

    if (newGrid[r][c].mine) {
      setGameOver(true);
      alert("💥 Boom! Game Over");
    } else if (newGrid[r][c].adjacent === 0) {
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          const nr = r + dr;
          const nc = c + dc;

          if (
            nr >= 0 &&
            nr < rows &&
            nc >= 0 &&
            nc < cols &&
            !newGrid[nr][nc].revealed
          ) {
            reveal(nr, nc, newGrid); // reuse same grid
          }
        }
      }
    }

    if (!workingGrid) setGrid(newGrid);
  };

  const toggleFlag = (e, r, c) => {
    e.preventDefault();

    if (gameOver || grid[r][c].revealed) return;

    const newGrid = grid.map((row) =>
      row.map((cell) => ({ ...cell }))
    );

    newGrid[r][c].flagged = !newGrid[r][c].flagged;

    setGrid(newGrid);
    setFlags((f) => f + (newGrid[r][c].flagged ? 1 : -1));
  };

  const resetGame = () => {
    setGrid(generateGrid(rows, cols, mines));
    setGameOver(false);
    setTime(0);
    setScore(0);
    setFlags(0);
    setTimerActive(false);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="mb-2 flex gap-2">
        {gameOver && (
          <span className="text-red-500 font-mono text-sm tracking-wider">
            Game Over!
          </span>
        )}
      </div>

      <div className="relative w-full max-w-full z-10 mb-1 flex flex-col items-center gap-3">
        <div className="flex flex-col sm:flex-row justify-center gap-3 w-full">
          <div className="rounded-md border border-cyan-500/40 bg-black px-4 py-2 font-mono text-sm text-cyan-300 text-center">
            ⏱ Time: {time}
          </div>

          <div className="rounded-md border border-cyan-500/40 bg-black px-4 py-2 font-mono text-sm text-cyan-300 text-center">
            🎯 Score: {score}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-center gap-3 w-full">
          <div className="rounded-md border border-cyan-500/40 bg-black px-4 py-2 font-mono text-sm text-cyan-300 text-center">
            🚩 Flags: {flags}
          </div>

          <div className="rounded-md border border-cyan-500/40 bg-black px-4 py-2 font-mono text-sm text-cyan-300 text-center">
            💣 Mines: {mines}
          </div>
        </div>

        <button
          onClick={resetGame}
          className="rounded-md border border-cyan-500/40 bg-black px-4 py-2 font-mono text-sm text-cyan-300 hover:bg-cyan-500/10"
        >
          Reset
        </button>
      </div>

      <div
        className="grid gap-1 rounded-xl border border-cyan-500/20 p-2 bg-black/90"
        style={{ gridTemplateColumns: `repeat(${cols}, 40px)` }}
      >
        {grid.map((row, r) =>
          row.map((cell, c) => {
            let content = "";
            let bg =
              "bg-zinc-950 text-cyan-200 shadow-[inset_0_0_10px_rgba(34,211,238,0.2)]";

            if (cell.revealed) {
              bg = cell.mine
                ? "bg-red-600 text-black"
                : "bg-zinc-800 text-white";
              content = cell.mine
                ? "💣"
                : cell.adjacent > 0
                ? cell.adjacent
                : "";
            } else if (cell.flagged) {
              content = "🚩";
              bg = "bg-blue-500 text-black";
            }

            return (
              <div
                key={`${r}-${c}`}
                onClick={() => reveal(r, c)}
                onContextMenu={(e) => toggleFlag(e, r, c)}
                className={`flex h-10 w-10 items-center justify-center cursor-pointer select-none rounded border border-cyan-500/10 font-mono text-lg font-bold ${bg} hover:scale-105`}
              >
                {content}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}