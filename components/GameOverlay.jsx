// components/GameOverlay.jsx

"use client";

import { memo } from "react";
import { useMineStore } from "./useMineStore";

function GameOverlay() {
  const status = useMineStore((s) => s.status);
  const reset = useMineStore((s) => s.reset);
  const time = useMineStore((s) => s.time);

  if (status !== "won" && status !== "lost") {
    return null;
  }

  const won = status === "won";

  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/75 p-4">
      <div
        role="status"
        className="flex flex-col items-center gap-4 border border-cyan-500/40 bg-zinc-950 px-8 py-6 text-center shadow-2xl"
      >
        <span className="text-4xl">
          {won ? "🏆" : "💥"}
        </span>

        <h2
          className={`font-mono text-2xl font-bold tracking-widest ${
            won ? "text-green-400" : "text-red-400"
          }`}
        >
          {won ? "YOU WIN!" : "GAME OVER"}
        </h2>

        <p className="text-sm text-zinc-400">
          {won
            ? `Completed in ${time} seconds`
            : "You triggered a mine!"}
        </p>

        <button
          type="button"
          onClick={() => reset()}
          className="border border-cyan-300 px-6 py-2 font-mono text-sm text-cyan-300 transition-colors hover:bg-cyan-300 hover:text-black"
        >
          PLAY AGAIN
        </button>
      </div>
    </div>
  );
}

export default memo(GameOverlay);
