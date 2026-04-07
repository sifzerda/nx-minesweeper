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

export default function Minesweeper({ rows = 5, cols = 10, mines = 10 }) {
  const [grid, setGrid] = useState(generateGrid(rows, cols, mines));
  const [gameOver, setGameOver] = useState(false);

  const reveal = (r, c) => {
    if (gameOver || grid[r][c].revealed || grid[r][c].flagged) return;

    const newGrid = grid.map((row) => row.map((cell) => ({ ...cell })));
    newGrid[r][c].revealed = true;

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

    const newGrid = grid.map((row) => row.map((cell) => ({ ...cell })));
    newGrid[r][c].flagged = !newGrid[r][c].flagged;
    setGrid(newGrid);
  };

  const resetGame = () => {
    setGrid(generateGrid(rows, cols, mines));
    setGameOver(false);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="mb-2 flex gap-2">
        <button
          onClick={resetGame}
          className="px-3 py-1 rounded border border-cyan-500/40 bg-black/70 font-mono text-sm uppercase tracking-wider text-cyan-300 shadow-[0_0_15px_rgba(34,211,238,0.25)] hover:bg-cyan-500/10 hover:shadow-[0_0_20px_rgba(34,211,238,0.4)] transition"
        >
          Reset
        </button>
        {gameOver && <span className="text-red-500 font-mono text-sm tracking-wider">Game Over!</span>}
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