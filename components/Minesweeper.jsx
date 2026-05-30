"use client";

import { useEffect } from "react";
import { useMineStore } from "./useMineStore";

import StatsBar from "./StatsBar";
import MineGrid from "./MineGrid";
import GameOverlay from "./GameOverlay";

export default function Minesweeper({rows = 8, cols = 8, mines = 10}) {

  const initialize = useMineStore(s => s.initialize);
  const timerActive = useMineStore(s => s.timerActive);
  const tick = useMineStore(s => s.tick);

  useEffect(() => {
    initialize(rows, cols, mines);
  }, [initialize, rows, cols, mines]);

  useEffect(() => {

    if (!timerActive) return;
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [timerActive, tick]);

  return (
    <div className="relative flex flex-col items-center gap-4">

      <GameOverlay rows={rows} cols={cols} mines={mines} />
      <StatsBar mines={mines} />
      <MineGrid rows={rows} cols={cols} />

    </div>
  );
}