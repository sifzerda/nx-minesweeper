"use client";

import { useEffect, useMemo } from "react";
import Cell from "./Cell";

import { useMineStore } from "./useMineStore";

export default function Minesweeper({
  rows = 8,
  cols = 8,
  mines = 10,
}) {
  const initialize = useMineStore((s) => s.initialize);
  const reset = useMineStore((s) => s.reset);
  const grid = useMineStore((s) => s.grid);
  const gameOver = useMineStore((s) => s.gameOver);
  const flags = useMineStore((s) => s.flags);
  const time = useMineStore((s) => s.time);
  const timerActive = useMineStore((s) => s.timerActive);
  const tick = useMineStore((s) => s.tick);

  useEffect(() => {
    initialize(rows, cols, mines);
  }, [rows, cols, mines]);

  useEffect(() => {
    if (!timerActive) return;
    const id = setInterval(() => tick(), 1000);
    return () => clearInterval(id);
  }, [timerActive]);

  const totalCells = rows * cols;

  const clearedCells = useMemo(() => {
    let count = 0;

    for (const row of grid) {
      for (const cell of row) {
        if (cell.revealed) count++;
      }
    }

    return count;
  }, [grid]);

  const gridStyle = useMemo(() => {
    const size = `min(40px, calc((100vw - 32px) / ${cols}))`;

    return {
      gridTemplateColumns: `repeat(${cols}, ${size})`,
      gridAutoRows: size,
    };
  }, [cols]);

  const gameWon = useMemo(() => {
  if (!grid.length) return false;
  // Win condition 1: all non-mine cells revealed
  const allNonMinesRevealed = clearedCells === totalCells - mines;
  // Win condition 2: every mine is flagged (and nothing else needs to be)
  let allMinesFlagged = true;
  for (const row of grid) {
    for (const cell of row) {
      if (cell.mine && !cell.flagged) { allMinesFlagged = false; break; }
    }
  }
  return allNonMinesRevealed || allMinesFlagged;
}, [grid, clearedCells, totalCells, mines]);

  return (
    <div className="flex flex-col items-center gap-4">

{(gameOver || gameWon) && (
  <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
    <div className="flex flex-col items-center gap-3">
      <span className={`font-mono text-2xl font-bold tracking-widest ${gameWon ? 'text-green-400' : 'text-red-500'}`}>
        {gameWon ? 'YOU WIN!' : 'GAME OVER'}
      </span>
      <button
        onClick={() => reset(rows, cols, mines)}
        className="border border-cyan-300 px-4 py-1 text-cyan-300 text-sm font-mono hover:bg-cyan-300 hover:text-black transition-colors"
      >
        Play Again
      </button>
    </div>
  </div>
)}

      {/* STATS BAR */}
      <div className="flex flex-wrap gap-2 justify-center text-xs sm:text-sm">
        <div className="flex flex-wrap gap-2 justify-center text-xs sm:text-sm">
          <div className="border px-2 sm:px-3 py-1 text-cyan-300 font-mono min-w-[80px] text-center"> ⏱ {time}</div>
          <div className="border px-2 sm:px-3 py-1 text-cyan-300 font-mono min-w-[80px] text-center"> 🚩 {flags}</div>
          <div className="border px-2 sm:px-3 py-1 text-cyan-300 font-mono min-w-[80px] text-center"> 💣 {mines}</div>
          <div className="border px-2 sm:px-3 py-1 text-cyan-300 font-mono min-w-[120px] text-center"> 🧱 {clearedCells} / {totalCells}</div>
        </div>
      </div>

      <button onClick={() => reset(rows, cols, mines)} className="border px-4 py-1 text-cyan-300"> Reset</button>

      <div className="w-full flex justify-center overflow-hidden px-0 sm:px-2">
        <div
          className="grid gap-[2px] p-1 bg-black max-w-full"
          style={gridStyle}
        >
          {grid.map((row, r) =>
            row.map((_, c) => (
              <Cell
                key={`${r}-${c}`}
                r={r}
                c={c}
              />
            ))
          )}
        </div>
      </div>

    </div>
  );
}