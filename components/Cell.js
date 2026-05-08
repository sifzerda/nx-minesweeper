"use client";

import { memo, useCallback } from "react";
import { useMineStore } from "./useMineStore";

const Cell = memo(function Cell({ r, c }) {
    const cell = useMineStore( useCallback((s) => s.grid[r]?.[c], [r, c]));
    const reveal = useMineStore((s) => s.reveal);
    const toggleFlag = useMineStore((s) => s.toggleFlag);

    if (!cell) return null;

    let content = "";
    let bg = "bg-zinc-900";

    if (cell.revealed) {
        bg = cell.mine
            ? "bg-red-600"
            : "bg-zinc-700";

        content = cell.mine
            ? "💣"
            : cell.adjacent || "";
    } else if (cell.flagged) {
        content = "🚩";
        bg = "bg-blue-500";
    }

    return (
        <button onClick={() => reveal(r, c)}
            onContextMenu={(e) => {
                e.preventDefault();
                toggleFlag(r, c);
            }}
            className={`touch-manipulation flex h-10 w-10 items-center justify-center border ${bg}`}>
            {content}
        </button>
    );
});

export default Cell;