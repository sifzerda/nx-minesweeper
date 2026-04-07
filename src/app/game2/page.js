"use client";

import { useState, useEffect } from "react";

export default function Minesweeper2({ rows = 8, cols = 8, mines = 10 }) {
  const [grid, setGrid] = useState([]);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    initGrid();
  }, []);

  function initGrid() {
    let newGrid = Array(rows)
      .fill(null)
      .map(() =>
        Array(cols).fill({ mine: false, revealed: false, adjacent: 0, flagged: false })
      );

    let minesPlaced = 0;
    while (minesPlaced < mines) {
      const r = Math.floor(Math.random() * rows);
      const c = Math.floor(Math.random() * cols);
      if (!newGrid[r][c].mine) {
        newGrid[r][c] = { ...newGrid[r][c], mine: true };
        minesPlaced++;
      }
    }

    // Calculate adjacent mine counts
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (newGrid[r][c].mine) continue;
        let count = 0;
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            const nr = r + dr;
            const nc = c + dc;
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
              if (newGrid[nr][nc].mine) count++;
            }
          }
        }
        newGrid[r][c] = { ...newGrid[r][c], adjacent: count };
      }
    }

    setGrid(newGrid);
    setGameOver(false);
  }

  function revealCell(r, c) {
    if (gameOver || grid[r][c].revealed || grid[r][c].flagged) return;

    const newGrid = grid.map((row) => row.map((cell) => ({ ...cell })));

    function reveal(r, c) {
      if (r < 0 || r >= rows || c < 0 || c >= cols) return;
      const cell = newGrid[r][c];
      if (cell.revealed || cell.flagged) return;
      cell.revealed = true;
      if (cell.adjacent === 0 && !cell.mine) {
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            if (dr !== 0 || dc !== 0) reveal(r + dr, c + dc);
          }
        }
      }
    }

    if (newGrid[r][c].mine) {
      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          if (newGrid[i][j].mine) newGrid[i][j].revealed = true;
        }
      }
      setGameOver(true);
    } else {
      reveal(r, c);
    }

    setGrid(newGrid);
  }

  function toggleFlag(r, c, e) {
    e.preventDefault();
    if (grid[r][c].revealed || gameOver) return;
    const newGrid = grid.map((row) => row.map((cell) => ({ ...cell })));
    newGrid[r][c].flagged = !newGrid[r][c].flagged;
    setGrid(newGrid);
  }

  // Neon colors for numbers 1-8
  const numberColors = [
    "text-blue-400",
    "text-green-400",
    "text-red-400",
    "text-purple-400",
    "text-yellow-400",
    "text-pink-400",
    "text-cyan-400",
    "text-white",
  ];

  return (
    <div className="flex flex-col items-center mt-20 z-10 relative">
      {gameOver && <div className="mb-4 text-red-500 font-mono text-lg">💥 GAME OVER 💥</div>}
      <div
        className="grid gap-[2px] border border-cyan-500/30 p-2 rounded-lg backdrop-blur-md"
        style={{ gridTemplateColumns: `repeat(${cols}, 40px)` }}
      >
        {grid.map((row, rIdx) =>
          row.map((cell, cIdx) => (
            <button
              key={`${rIdx}-${cIdx}`}
              onClick={() => revealCell(rIdx, cIdx)}
              onContextMenu={(e) => toggleFlag(rIdx, cIdx, e)}
              className={`w-10 h-10 flex items-center justify-center font-mono font-bold text-sm 
                rounded border border-cyan-600/20 transition-all duration-150
                ${cell.revealed ? "bg-black text-white shadow-[0_0_8px_cyan]" 
                  : cell.flagged ? "bg-red-600/70 text-white shadow-[0_0_8px_red]" 
                  : "bg-black text-black hover:bg-cyan-900/20"}`}
            >
              {cell.revealed
                ? cell.mine
                  ? "💣"
                  : cell.adjacent
                  ? <span className={`${numberColors[cell.adjacent - 1]} drop-shadow-lg`}>{cell.adjacent}</span>
                  : ""
                : cell.flagged
                ? "🚩"
                : ""}
            </button>
          ))
        )}
      </div>
      <button
        onClick={initGrid}
        className="mt-6 px-4 py-2 font-mono text-sm uppercase tracking-wider bg-cyan-600/70 hover:bg-cyan-500/80 rounded shadow-[0_0_20px_cyan] transition-all"
      >
        Reset
      </button>
    </div>
  );
}