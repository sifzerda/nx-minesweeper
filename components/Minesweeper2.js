"use client";

import { useState, useEffect } from "react";

const generateGrid = (rows, cols, mines) => {
  const grid = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({ revealed: false, flagged: false, mine: false, adjacent: 0 }))
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
          if (r + dr >= 0 && r + dr < rows && c + dc >= 0 && c + dc < cols) {
            if (grid[r + dr][c + dc].mine) count++;
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

  const reveal = (r, c) => {
    if (!timerActive) setTimerActive(true);
    if (gameOver || grid[r][c].revealed || grid[r][c].flagged) return;

    const newGrid = grid.map((row) => row.map((cell) => ({ ...cell })));
    newGrid[r][c].revealed = true;
    if (!grid[r][c].revealed && !grid[r][c].mine) {
      setScore((s) => s + 1);
    }

    if (newGrid[r][c].mine) {
      setGameOver(true);
      alert("💥 Boom! Game Over");
    } else if (newGrid[r][c].adjacent === 0) {
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          const nr = r + dr;
          const nc = c + dc;
          if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && !newGrid[nr][nc].revealed) {
            reveal(nr, nc);
          }
        }
      }
    }

    setGrid(newGrid);
  };

  const toggleFlag = (e, r, c) => {
    e.preventDefault();

    if (gameOver || grid[r][c].revealed) return;

    const newGrid = grid.map((row) =>
      row.map((cell) => ({ ...cell }))
    );

    // toggle flag
    newGrid[r][c].flagged = !newGrid[r][c].flagged;

    // update grid first
    setGrid(newGrid);

    // update flag counter based on NEW value
    setFlags((f) => f + (newGrid[r][c].flagged ? 1 : -1));
  };

  const resetGame = () => {
    setGrid(generateGrid(rows, cols, mines));
    setGameOver(false);
    setTime(0);
    setScore(0);
    setTimerActive(false);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="mb-2 flex gap-2">
        {gameOver && <span className="text-red-500 font-mono text-sm tracking-wider">Game Over!</span>}
      </div>

      <div className="relative w-full max-w-full z-10 mb-1 sm:mb-1 flex flex-col items-center gap-3">

        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 w-full">

          <div className="rounded-md border border-cyan-500/40 bg-black px-3 py-2 sm:px-4 font-mono text-xs sm:text-sm uppercase tracking-[0.15em] text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.25)] text-center w-full sm:w-auto">
            ⏱ Time: {time}s
          </div>

          <div className="rounded-md border border-cyan-500/40 bg-black px-3 py-2 sm:px-4 font-mono text-xs sm:text-sm uppercase tracking-[0.15em] text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.25)] text-center w-full sm:w-auto">
            🎯 Score: {score}
          </div>

        </div>

        {/* ROW 2: FLAGS + MINES */}
        <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 w-full">

          <div className="rounded-md border border-cyan-500/40 bg-black px-3 py-2 sm:px-4 font-mono text-xs sm:text-sm uppercase tracking-[0.15em] text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.25)] text-center w-full sm:w-auto">
            🚩 Flags: {flags}
          </div>

          <div className="rounded-md border border-cyan-500/40 bg-black px-3 py-2 sm:px-4 font-mono text-xs sm:text-sm uppercase tracking-[0.15em] text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.25)] text-center w-full sm:w-auto">
            💣 Mines: {mines}
          </div>

        </div>

        {/* ROW 3: RESET */}
        <div className="flex justify-center w-full">

          <div className="rounded-md border border-cyan-500/40 bg-black px-3 py-2 sm:px-4 font-mono text-xs sm:text-sm uppercase tracking-[0.15em] text-cyan-300 shadow-[0_0_20px_rgba(34,211,238,0.25)] text-center hover:bg-cyan-500/10 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition">
            <button
              onClick={resetGame}
              className="font-mono text-sm uppercase tracking-wider text-cyan-300">Reset
            </button>
          </div>

        </div>

      </div>

      <div
        className="grid gap-1 rounded-xl border border-cyan-500/20 p-2 shadow-[0_0_50px_rgba(34,211,238,0.15)] bg-black/90"
        style={{ gridTemplateColumns: `repeat(${cols}, 40px)` }}
      >

        {grid.flat().map((cell, index) => {
          const r = Math.floor(index / cols);
          const c = index % cols;

          let content = "";
          let bg = "bg-zinc-950 text-cyan-200 shadow-[inset_0_0_10px_rgba(34,211,238,0.2)]";
          if (cell.revealed) {
            bg = cell.mine
              ? "bg-red-600 text-black shadow-[0_0_15px_rgba(239,68,68,0.6)]"
              : "bg-zinc-800 text-white shadow-[inset_0_0_15px_rgba(34,211,238,0.3)]";
            content = cell.mine ? "💣" : cell.adjacent > 0 ? cell.adjacent : "";
          } else if (cell.flagged) {
            content = "🚩";
            bg = "bg-blue-500 text-black shadow-[0_0_15px_rgba(59,130,246,0.5)]";
          }

          return (
            <div
              key={index}
              onClick={() => reveal(r, c)}
              onContextMenu={(e) => toggleFlag(e, r, c)}
              className={`flex h-10 w-10 items-center justify-center cursor-pointer select-none rounded border border-cyan-500/10 font-mono text-lg font-bold ${bg} transition-all duration-150 hover:scale-105`}
            >
              {content}
            </div>
          );
        })}
      </div>
    </div>
  );
}