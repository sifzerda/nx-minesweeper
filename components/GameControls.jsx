// components/GameControls.jsx

"use client";

import { useMineStore } from "./useMineStore";
import { DIFFICULTIES } from "./lib/minesweeper.js"

export default function GameControls({
  flagMode,
  setFlagMode,
}) {
  const difficulty = useMineStore((s) => s.difficulty);
  const setDifficulty = useMineStore((s) => s.setDifficulty);
  const reset = useMineStore((s) => s.reset);
  const status = useMineStore((s) => s.status);

  const face = {
    ready: "🙂",
    playing: "🙂",
    won: "😎",
    lost: "😵",
  }[status];

  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-3">
      <select
        value={difficulty}
        onChange={(event) => {
          setDifficulty(event.target.value);
          setFlagMode(false);
        }}
        aria-label="Difficulty"
        className="border border-cyan-500/40 bg-zinc-900 px-3 py-2 text-sm text-cyan-200"
      >
        {Object.keys(DIFFICULTIES).map((key) => (
          <option key={key} value={key}>
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </option>
        ))}
      </select>

      <button
        type="button"
        onClick={() => reset()}
        className="border border-cyan-500/40 bg-zinc-900 px-4 py-2 text-xl hover:bg-zinc-800"
        aria-label="Restart game"
        title="Restart"
      >
        {face}
      </button>

      <button
        type="button"
        aria-pressed={flagMode}
        onClick={() => setFlagMode((value) => !value)}
        className={`border px-4 py-2 text-sm font-semibold transition-colors ${
          flagMode
            ? "border-cyan-300 bg-cyan-300 text-black"
            : "border-cyan-500/40 bg-zinc-900 text-cyan-200"
        }`}
      >
        🚩 {flagMode ? "Flag mode ON" : "Flag mode"}
      </button>
    </div>
  );
}
