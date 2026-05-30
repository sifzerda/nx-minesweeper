"use client";

import { useEffect, useMemo } from "react";
import Cell from "./Cell";
import { useMineStore } from "./useMineStore";

export default function Minesweeper({
  rows = 8,
  cols = 8,
  mines = 10,
}) {

  const initialize = useMineStore(
    (s) => s.initialize
  );

  const reset = useMineStore(
    (s) => s.reset
  );

  const gameOver = useMineStore(
    (s) => s.gameOver
  );

  const gameWon = useMineStore(
    (s) => s.gameWon
  );

  const flags = useMineStore(
    (s) => s.flags
  );

  const time = useMineStore(
    (s) => s.time
  );

  const timerActive = useMineStore(
    (s) => s.timerActive
  );

  const tick = useMineStore(
    (s) => s.tick
  );

  const revealedCount = useMineStore(
    (s) => s.revealedCount
  );

  useEffect(() => {

    initialize(
      rows,
      cols,
      mines
    );

  }, [
    initialize,
    rows,
    cols,
    mines
  ]);

  useEffect(() => {

    if (!timerActive) return;

    const id = setInterval(
      tick,
      1000
    );

    return () => clearInterval(id);

  }, [timerActive, tick]);

  const totalCells =
    rows * cols;

  const gridStyle = useMemo(() => {

    const size =
      `min(40px, calc((100vw - 32px) / ${cols}))`;

    return {
      gridTemplateColumns:
        `repeat(${cols}, ${size})`,
      gridAutoRows: size,
    };

  }, [cols]);

  return (
    <div className="flex flex-col items-center gap-4">

      {(gameOver || gameWon) && (
        <div className="absolute inset-0 z-50 bg-black/70 flex items-center justify-center">

          <div className="flex flex-col items-center gap-3">

            <span
              className={`font-mono text-2xl font-bold tracking-widest ${
                gameWon
                  ? "text-green-400"
                  : "text-red-500"
              }`}
            >
              {gameWon
                ? "YOU WIN!"
                : "GAME OVER"}
            </span>

            <button
              onClick={() =>
                reset(
                  rows,
                  cols,
                  mines
                )
              }
              className="border border-cyan-300 px-4 py-1 text-cyan-300 text-sm font-mono hover:bg-cyan-300 hover:text-black transition-colors"
            >
              Play Again
            </button>

          </div>

        </div>
      )}

      {/* Stats */}

      <div className="flex flex-wrap gap-2 justify-center text-xs sm:text-sm">

        <div className="border px-2 sm:px-3 py-1 text-cyan-300 font-mono min-w-[80px] text-center">
          ⏱ {time}
        </div>

        <div className="border px-2 sm:px-3 py-1 text-cyan-300 font-mono min-w-[80px] text-center">
          🚩 {flags}
        </div>

        <div className="border px-2 sm:px-3 py-1 text-cyan-300 font-mono min-w-[80px] text-center">
          💣 {mines}
        </div>

        <div className="border px-2 sm:px-3 py-1 text-cyan-300 font-mono min-w-[120px] text-center">
          🧱 {revealedCount} / {totalCells}
        </div>

      </div>

      <button
        onClick={() =>
          reset(
            rows,
            cols,
            mines
          )
        }
        className="border px-4 py-1 text-cyan-300"
      >
        Reset
      </button>

      <div className="w-full flex justify-center overflow-hidden px-0 sm:px-2">

        <div
          className="grid gap-[2px] p-1 bg-black max-w-full"
          style={gridStyle}
        >
          {Array.from(
            { length: rows },
            (_, r) =>
              Array.from(
                { length: cols },
                (_, c) => (
                  <Cell
                    key={`${r}-${c}`}
                    r={r}
                    c={c}
                  />
                )
              )
          )}
        </div>

      </div>

    </div>
  );
}