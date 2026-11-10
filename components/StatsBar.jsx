// components/StatsBar.jsx

"use client";

import { memo } from "react";
import { useMineStore } from "./useMineStore";

function Stat({ label, value, icon }) {
  return (
    <div className="flex min-w-24 flex-col items-center border border-cyan-500/25 bg-zinc-900/70 px-4 py-2">
      <span className="text-[10px] uppercase tracking-widest text-zinc-400">
        {label}
      </span>

      <span className="font-mono text-lg font-bold tabular-nums text-cyan-300">
        {icon} {value}
      </span>
    </div>
  );
}

function StatsBar() {
  const time = useMineStore((s) => s.time);
  const flags = useMineStore((s) => s.flags);
  const mines = useMineStore((s) => s.mines);
  const revealed = useMineStore((s) => s.revealedCount);
  const rows = useMineStore((s) => s.rows);
  const cols = useMineStore((s) => s.cols);

  return (
    <div className="flex flex-wrap justify-center gap-2">
      <Stat label="Time" icon="⏱" value={time} />
      <Stat label="Remaining" icon="🚩" value={mines - flags} />
      <Stat
        label="Revealed"
        icon="◻"
        value={`${revealed}/${rows * cols - mines}`}
      />
    </div>
  );
}

export default memo(StatsBar);
