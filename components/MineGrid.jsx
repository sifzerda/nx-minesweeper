"use client";

import { memo, useMemo } from "react";
import Cell from "./Cell";

export default memo(function MineGrid({rows, cols}) {

  const gridStyle = useMemo(() => {

    const size =`min(40px, calc((100vw - 32px) / ${cols}))`;

    return {gridTemplateColumns:`repeat(${cols}, ${size})`, gridAutoRows: size};

  }, [cols]);

  return (
    <div className="w-full flex justify-center overflow-hidden">

      <div className="grid gap-0.5 p-1 bg-black" style={gridStyle}>
        {Array.from(
          { length: rows },
          (_, r) =>
            Array.from(
              { length: cols },
              (_, c) => (<Cell key={`${r}-${c}`} r={r} c={c} />)
            )
        )}
      </div>

    </div>
  );
});