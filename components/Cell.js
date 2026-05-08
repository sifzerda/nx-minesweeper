"use client";

import { memo } from "react";

const Cell = memo(function Cell({
  cell,
  r,
  c,
  gameOver,
  reveal,
  toggleFlag,
}) {
  let content = "";
  let bg = "bg-zinc-900 text-cyan-200";
  let disabled = gameOver ? "opacity-50 cursor-not-allowed" : "";

  if (cell.revealed) {
    bg = cell.mine ? "bg-red-600" : "bg-zinc-700";

    content = cell.mine
      ? "💣"
      : cell.adjacent > 0
      ? cell.adjacent
      : "";
  } else if (cell.flagged) {
    content = "🚩";
    bg = "bg-blue-500";
  }

  return (
    <div
      onClick={() => reveal(r, c, null, true)}
      onContextMenu={(e) => toggleFlag(e, r, c)}
      className={`touch-manipulation flex h-10 w-10 items-center justify-center border text-lg font-bold ${bg} ${disabled}`}>
      {content}
    </div>
  );
});

export default Cell;