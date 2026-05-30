"use client";

import { memo } from "react";
import { useMineStore } from "./useMineStore";

export default memo(function GameOverlay({rows, cols, mines}) {

  const reset = useMineStore(s => s.reset);
  const gameOver = useMineStore(s => s.gameOver);
  const gameWon = useMineStore(s => s.gameWon);

  if (!gameOver && !gameWon) {
    return null;
  }

  return (
    <div className="absolute inset-0 z-50 bg-black/70 flex items-center justify-center">

      <div className="flex flex-col items-center gap-3">

        <span className={`font-mono text-2xl font-bold tracking-widest ${
            gameWon
              ? "text-green-400"
              : "text-red-500"
          }`}>
          {gameWon
            ? "YOU WIN!"
            : "GAME OVER"}
        </span>

        <button onClick={() => reset(rows, cols, mines)}
          className="border border-cyan-300 px-4 py-1 text-cyan-300 hover:bg-cyan-300 hover:text-black transition-colors">
          Play Again
        </button>

      </div>

    </div>
  );
});