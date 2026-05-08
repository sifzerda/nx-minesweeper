"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import Cell from "./Cell";


const generateGrid = (rows, cols, mines) => {
  const grid = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({
      revealed: false,
      flagged: false,
      mine: false,
      adjacent: 0,
    }))
  );

  let placed = 0;
  while (placed < mines) {
    const r = Math.floor(Math.random() * rows);
    const c = Math.floor(Math.random() * cols);
    if (!grid[r][c].mine) {
      grid[r][c].mine = true;
      placed++;
    }
  }

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r][c].mine) continue;

      let count = 0;
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          const nr = r + dr;
          const nc = c + dc;
          if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
            if (grid[nr][nc].mine) count++;
          }
        }
      }
      grid[r][c].adjacent = count;
    }
  }

  return grid;
};

const cloneCell = (grid, clonedRows, r, c) => {
  if (!clonedRows.has(r)) {
    grid[r] = [...grid[r]];
    clonedRows.add(r);
  }

  grid[r][c] = { ...grid[r][c] };
};

export default function Minesweeper({ rows = 8, cols = 8, mines = 10 }) {
  const [grid, setGrid] = useState(generateGrid(rows, cols, mines));
  const [gameOver, setGameOver] = useState(false);
  const [time, setTime] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [score, setScore] = useState(0);
  const [flags, setFlags] = useState(mines);

  useEffect(() => {
    let interval;

    if (timerActive && !gameOver) {
      interval = setInterval(() => {
        setTime((t) => t + 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [timerActive, gameOver]);

  const reveal = useCallback((r, c, workingGrid = null, isUserClick = false) => {
    const baseGrid = workingGrid || grid;

    if (gameOver || baseGrid[r][c].revealed || baseGrid[r][c].flagged) return;

    if (isUserClick && !timerActive) setTimerActive(true);

    const newGrid = workingGrid ? baseGrid : [...baseGrid];
    const clonedRows = new Set();
    const visited = new Set();
    const queue = [[r, c]];

    while (queue.length) {
      const [rr, cc] = queue.pop();

      if (
        rr < 0 ||
        rr >= rows ||
        cc < 0 ||
        cc >= cols
      ) continue;

      const key = `${rr}-${cc}`;

      if (visited.has(key)) continue;

      visited.add(key);

      cloneCell(newGrid, clonedRows, rr, cc);

      const cell = newGrid[rr][cc];

      if (cell.revealed || cell.flagged) continue;

      cell.revealed = true;

      if (cell.adjacent === 0 && !cell.mine) {
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            queue.push([rr + dr, cc + dc]);
          }
        }
      }
    }

    if (newGrid[r][c].mine) {
      for (let rr = 0; rr < rows; rr++) {
        for (let cc = 0; cc < cols; cc++) {
          if (newGrid[rr][cc].mine) {
            cloneCell(newGrid, clonedRows, rr, cc);
            newGrid[rr][cc].revealed = true;
          }
        }
      }

      setGameOver(true);
    } else {
      if (isUserClick) setScore((s) => s + 1);
    }

    if (!workingGrid) setGrid(newGrid);
  },
    [grid, gameOver, timerActive, rows, cols]
  );

  const toggleFlag = useCallback((e, r, c) => {
    e.preventDefault();

    if (gameOver || grid[r][c].revealed) return;

    const cell = grid[r][c];

    const newGrid = [...grid];

    newGrid[r] = [...newGrid[r]];

    newGrid[r][c] = {
      ...newGrid[r][c],
      flagged: !cell.flagged,
    };

    const isAddingFlag = !cell.flagged;

    if (isAddingFlag && flags <= 0) return;

    setGrid(newGrid);

    setFlags((f) => {
      const next = isAddingFlag ? f - 1 : f + 1;
      return Math.min(mines, Math.max(0, next));
    });
  },
    [grid, gameOver, flags, mines]
  );

  const resetGame = () => {
    setGrid(generateGrid(rows, cols, mines));
    setGameOver(false);
    setTime(0);
    setScore(0);
    setTimerActive(false);
    setFlags(mines);
  };

  // derived stats
  const totalCells = rows * cols;
  const clearedCells = useMemo(() => {
    let count = 0;

    for (const row of grid) {
      for (const cell of row) {
        if (cell.revealed) count++;
      }
    }

    return count;
  }, [grid]);

  const gridStyle = useMemo(() => ({
    gridTemplateColumns: `repeat(${cols}, 40px)`,
  }), [cols]);

  return (
    <div className="flex flex-col items-center gap-4">
      {gameOver && (
        <span className="text-red-500 font-mono text-sm">Game Over!</span>
      )}

      {/* STATS BAR */}
      <div className="flex flex-wrap gap-3 justify-center">

        <div className="border px-3 py-1 text-cyan-300 font-mono"> ⏱ {time}</div>
        <div className="border px-3 py-1 text-cyan-300 font-mono"> 🎯 {score}</div>
        <div className="border px-3 py-1 text-cyan-300 font-mono"> 🚩 {flags}</div>
        <div className="border px-3 py-1 text-cyan-300 font-mono">💣 {mines}</div>
        <div className="border px-3 py-1 text-cyan-300 font-mono"> 🧱 {clearedCells} / {totalCells}</div>

      </div>

      <button onClick={resetGame} className="border px-4 py-2 text-cyan-300">Reset</button>

      <div className="grid gap-1 p-2 bg-black" style={gridStyle}>

        {grid.map((row, r) =>
          row.map((cell, c) => (
            <Cell
              key={`${r}-${c}`}
              cell={cell}
              r={r}
              c={c}
              gameOver={gameOver}
              reveal={reveal}
              toggleFlag={toggleFlag}
            />
          ))
        )}

      </div>
    </div>
  );
}