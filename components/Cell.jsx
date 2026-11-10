// components/Cell.jsx

"use client";

import { memo, useCallback } from "react";
import { useMineStore } from "./useMineStore";

const NUMBER_COLORS = {
  1: "text-blue-400",
  2: "text-green-400",
  3: "text-red-400",
  4: "text-purple-400",
  5: "text-orange-400",
  6: "text-cyan-400",
  7: "text-pink-400",
  8: "text-zinc-200",
};

function Cell({ r, c, flagMode }) {
  const cell = useMineStore((s) => s.grid[r]?.[c]);
  const status = useMineStore((s) => s.status);

  const reveal = useMineStore((s) => s.reveal);
  const chord = useMineStore((s) => s.chord);
  const toggleFlag = useMineStore((s) => s.toggleFlag);

  const finished = status === "won" || status === "lost";

  const handleClick = useCallback(() => {
    if (!cell || finished) return;

    if (cell.revealed) {
      if (!flagMode && cell.adjacent > 0) {
        chord(r, c);
      }
      return;
    }

    if (flagMode) {
      toggleFlag(r, c);
    } else {
      reveal(r, c);
    }
  }, [
    cell,
    finished,
    flagMode,
    chord,
    reveal,
    toggleFlag,
    r,
    c,
  ]);

  const handleContextMenu = useCallback(
    (event) => {
      event.preventDefault();

      if (!finished && !cell?.revealed) {
        toggleFlag(r, c);
      }
    },
    [finished, cell, toggleFlag, r, c]
  );

  if (!cell) return null;

  const canChord =
    cell.revealed &&
    !cell.mine &&
    cell.adjacent > 0 &&
    !finished;

  const disabled =
    finished ||
    (cell.revealed && !canChord);

  const background = cell.exploded
    ? "bg-red-600"
    : cell.revealed
      ? canChord
        ? "bg-zinc-800 hover:bg-zinc-600"
        : "bg-zinc-800"
      : "bg-zinc-700 hover:bg-zinc-600 active:bg-zinc-500";

  const content = cell.revealed
    ? cell.mine
      ? "💣"
      : cell.adjacent || ""
    : cell.flagged
      ? "🚩"
      : "";

  const numberColor =
    cell.revealed && !cell.mine
      ? NUMBER_COLORS[cell.adjacent] ?? ""
      : "";

  const description = cell.revealed
    ? cell.mine
      ? "Mine"
      : cell.adjacent
        ? `${cell.adjacent} adjacent mines, click to chord`
        : "Empty"
    : cell.flagged
      ? "Flagged"
      : "Hidden";

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={handleClick}
      onContextMenu={handleContextMenu}
      aria-label={`Row ${r + 1}, column ${c + 1}: ${description}`}
      className={`
        flex h-full w-full items-center justify-center
        select-none touch-manipulation
        border border-black/40
        text-sm font-black sm:text-base
        transition-colors duration-75
        focus-visible:outline-2
        focus-visible:outline-cyan-300
        disabled:cursor-default
        ${background}
        ${numberColor}
      `}
    >
      {content}
    </button>
  );
}

export default memo(Cell);
