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
  const [flags, setFlags] = useState(mines);

  useEffect(() => {
    let interval;

    if (timerActive && !gameOver) {
      interval = setInterval(() => {
        setTime((t) => t + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timerActive, gameOver]);

  const reveal = (r, c, workingGrid = null, isUserClick = false) => {
    const baseGrid = workingGrid || grid;

    if (gameOver || baseGrid[r][c].revealed || baseGrid[r][c].flagged) return;

    if (isUserClick && !timerActive) setTimerActive(true);

    const newGrid = workingGrid
      ? baseGrid
      : baseGrid.map((row) => row.map((cell) => ({ ...cell })));

    const floodReveal = (rr, cc) => {
      if (
        rr < 0 ||
        rr >= rows ||
        cc < 0 ||
        cc >= cols ||
        newGrid[rr][cc].revealed ||
        newGrid[rr][cc].flagged
      ) return;

      newGrid[rr][cc].revealed = true;

      if (newGrid[rr][cc].adjacent === 0 && !newGrid[rr][cc].mine) {
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            floodReveal(rr + dr, cc + dc);
          }
        }
      }
    };

    floodReveal(r, c);

    if (newGrid[r][c].mine) {
      for (let rr = 0; rr < rows; rr++) {
        for (let cc = 0; cc < cols; cc++) {
          if (newGrid[rr][cc].mine) {
            newGrid[rr][cc].revealed = true;
          }
        }
      }

      setGameOver(true);
      alert("💥 Boom! Game Over");
    } else {
      if (isUserClick) setScore((s) => s + 1);
    }

    if (!workingGrid) setGrid(newGrid);
  };

  const toggleFlag = (e, r, c) => {
    e.preventDefault();

    if (gameOver || grid[r][c].revealed) return;

    const cell = grid[r][c];

    const newGrid = grid.map((row) =>
      row.map((cell) => ({ ...cell }))
    );

    const isAddingFlag = !cell.flagged;

    if (isAddingFlag && flags <= 0) return;

    newGrid[r][c].flagged = !cell.flagged;

    setGrid(newGrid);

    setFlags((f) => {
      const next = isAddingFlag ? f - 1 : f + 1;
      return Math.min(mines, Math.max(0, next));
    });
  };

  const resetGame = () => {
    setGrid(generateGrid(rows, cols, mines));
    setGameOver(false);
    setTime(0);
    setScore(0);
    setTimerActive(false);
    setFlags(mines);
  };

  // 🧮 derived stats
  const totalCells = rows * cols;
  const clearedCells = grid.flat().filter((c) => c.revealed).length;
  const remainingCells = totalCells - clearedCells;

  return (
    <div className="flex flex-col items-center gap-4">
      {gameOver && (
        <span className="text-red-500 font-mono text-sm">
          Game Over!
        </span>
      )}

      {/* STATS BAR */}
      <div className="flex flex-wrap gap-3 justify-center">

        <div className="border px-3 py-1 text-cyan-300">
          ⏱ {time}
        </div>

        <div className="border px-3 py-1 text-cyan-300">
          🎯 {score}
        </div>

        <div className="border px-3 py-1 text-cyan-300">
          🚩 {flags}
        </div>

        <div className="border px-3 py-1 text-cyan-300">
          💣 {mines}
        </div>

        {/* NEW BOX */}
        <div className="border px-3 py-1 text-cyan-300">
          🧱 {clearedCells} / {totalCells}
        </div>

      </div>

      <button
        onClick={resetGame}
        className="border px-4 py-2 text-cyan-300"
      >
        Reset
      </button>

      <div
        className="grid gap-1 p-2 bg-black"
        style={{ gridTemplateColumns: `repeat(${cols}, 40px)` }}
      >
        {grid.map((row, r) =>
          row.map((cell, c) => {
            let content = "";
            let bg = "bg-zinc-900 text-cyan-200";
            let disabled = gameOver ? "opacity-50 cursor-not-allowed" : "";

            if (cell.revealed) {
              bg = cell.mine ? "bg-red-600" : "bg-zinc-700";
              content = cell.mine
                ? "💣"
                : cell.adjacent > 0
                ? cell.adjacent
                : "";
            } else if (cell.flagged) {
              content = "🚩";
              bg = "bg-blue-500";
            }

            return (
              <div
                key={`${r}-${c}`}
                onClick={() => reveal(r, c, null, true)}
                onContextMenu={(e) => toggleFlag(e, r, c)}
                className={`flex h-10 w-10 items-center justify-center border text-lg font-bold ${bg} ${disabled}`}
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