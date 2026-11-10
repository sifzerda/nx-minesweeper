// components/MineGrid.jsx

"use client";

import { memo, useMemo } from "react";
import { useMineStore } from "./useMineStore";
import Cell from "./Cell";

function MineGrid({ flagMode }) {
  const rows = useMineStore((s) => s.rows);
  const cols = useMineStore((s) => s.cols);

  const positions = useMemo(
    () =>
      Array.from({ length: rows * cols }, (_, index) => ({
        r: Math.floor(index / cols),
        c: index % cols,
      })),
    [rows, cols]
  );

  return (
    <div className="w-full max-w-full overflow-x-auto pb-2">
      <div
        role="group"
        aria-label="Minesweeper board"
        className="mx-auto grid w-max gap-px border border-cyan-500/30 bg-zinc-950 p-1"
        style={{
          gridTemplateColumns: `repeat(${cols}, var(--cell-size))`,
          "--cell-size": "clamp(28px, 5vw, 40px)",
        }}
      >
        {positions.map(({ r, c }) => (
          <div
            key={`${r}-${c}`}
            className="h-(--cell-size) w-(--cell-size)"
          >
            <Cell r={r} c={c} flagMode={flagMode} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default memo(MineGrid);
