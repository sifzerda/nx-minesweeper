// components/Minesweeper.jsx

"use client";

import { useEffect, useState } from "react";
import { useMineStore } from "./useMineStore";

import StatsBar from "./StatsBar";
import MineGrid from "./MineGrid";
import GameOverlay from "./GameOverlay";
import GameControls from "./GameControls";

export default function Minesweeper() {
  const [flagMode, setFlagMode] = useState(false);

  const status = useMineStore((s) => s.status);
  const tick = useMineStore((s) => s.tick);

  useEffect(() => {
    if (status !== "playing") return;

    const interval = setInterval(tick, 1000);

    return () => clearInterval(interval);
  }, [status, tick]);

  return (
    <section className="flex w-full min-w-0 flex-col items-center gap-5">
      <h1 className="font-mono text-2xl font-bold tracking-widest text-cyan-300">
        MINESWEEPER
      </h1>

      <GameControls
        flagMode={flagMode}
        setFlagMode={setFlagMode}
      />

      <StatsBar />

      <div className="relative w-full min-w-0">
        <MineGrid flagMode={flagMode} />
        <GameOverlay />
      </div>

      <p className="text-center text-xs text-zinc-500">
        Left-click to reveal · Right-click to flag
        <span className="block">
          Click revealed numbers to chord
        </span>
        <span className="block">
          On mobile, enable flag mode to place flags
        </span>
      </p>
    </section>
  );
}
