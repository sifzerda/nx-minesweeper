"use client";

import { memo } from "react";
import { useMineStore } from "./useMineStore";

export default memo(function StatsBar({
  mines
}) {

  const time = useMineStore(
    s => s.time
  );

  const flags = useMineStore(
    s => s.flags
  );

  const revealedCount = useMineStore(
    s => s.revealedCount
  );

  return (
    <div className="flex flex-wrap gap-2 justify-center text-xs sm:text-sm">

      <div className="border px-3 py-1 text-cyan-300 font-mono min-w-[80px] text-center">
        ⏱ {time}
      </div>

      <div className="border px-3 py-1 text-cyan-300 font-mono min-w-[80px] text-center">
        🚩 {flags}
      </div>

      <div className="border px-3 py-1 text-cyan-300 font-mono min-w-[80px] text-center">
        💣 {mines}
      </div>

      <div className="border px-3 py-1 text-cyan-300 font-mono min-w-[120px] text-center">
        🧱 {revealedCount}
      </div>

    </div>
  );

});