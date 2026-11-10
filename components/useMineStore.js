// components/useMineStore.js

import { create } from "zustand";

import {
  DIFFICULTIES,
  createGrid,
  getNeighbors,
  placeMines,
  revealCells,
  chordReveal,
  revealAllMines,
} from "./lib/minesweeper";

import { createGridTransaction } from "./lib/gridTransaction";

const DEFAULT_DIFFICULTY = "beginner";

function createGame(difficulty) {
  const config = DIFFICULTIES[difficulty];

  return {
    difficulty,
    ...config,

    grid: createGrid(config.rows, config.cols),

    status: "ready",
    minesPlaced: false,

    flags: 0,
    revealedCount: 0,

    time: 0,
  };
}

function finishReveal(state, tx, result) {
  const revealedCount =
    state.revealedCount + result.revealed;

  if (result.hitMine) {
    revealAllMines(tx);

    return {
      grid: tx.grid,
      revealedCount,
      minesPlaced: true,
      status: "lost",
    };
  }

  const won =
    revealedCount ===
    state.rows * state.cols - state.mines;

  return {
    grid: tx.grid,
    revealedCount,
    minesPlaced: true,
    status: won ? "won" : "playing",
  };
}

function isValidCell(state, r, c) {
  return (
    Number.isInteger(r) &&
    Number.isInteger(c) &&
    r >= 0 &&
    c >= 0 &&
    r < state.rows &&
    c < state.cols
  );
}

export const useMineStore = create((set) => ({
  ...createGame(DEFAULT_DIFFICULTY),

  reset: () =>
    set((state) => createGame(state.difficulty)),

  setDifficulty: (difficulty) => {
    if (!DIFFICULTIES[difficulty]) return;

    set(createGame(difficulty));
  },

  reveal: (r, c) =>
    set((state) => {
      if (
        !isValidCell(state, r, c) ||
        state.status === "won" ||
        state.status === "lost"
      ) {
        return state;
      }

      const cell = state.grid[r][c];

      if (cell.revealed || cell.flagged) return state;

      const tx = createGridTransaction(state.grid);

      if (!state.minesPlaced) {
        placeMines(tx, state.mines, r, c);
      }

      const result = revealCells(tx, [[r, c]]);

      return finishReveal(state, tx, result);
    }),

  chord: (r, c) =>
    set((state) => {
      if (
        state.status !== "playing" ||
        !isValidCell(state, r, c)
      ) {
        return state;
      }

      const cell = state.grid[r][c];

      if (
        !cell.revealed ||
        cell.mine ||
        cell.adjacent === 0
      ) {
        return state;
      }

      const neighbors = getNeighbors(
        r,
        c,
        state.rows,
        state.cols
      );

      const flaggedCount = neighbors.reduce(
        (count, [nr, nc]) =>
          count + Number(state.grid[nr][nc].flagged),
        0
      );

      if (flaggedCount !== cell.adjacent) {
        return state;
      }

      const hasTargets = neighbors.some(([nr, nc]) => {
        const neighbor = state.grid[nr][nc];

        return !neighbor.revealed && !neighbor.flagged;
      });

      if (!hasTargets) return state;

      const tx = createGridTransaction(state.grid);

      const result = chordReveal(tx, r, c);

      if (!tx.changed) return state;

      return finishReveal(state, tx, result);
    }),

  toggleFlag: (r, c) =>
    set((state) => {
      if (
        !isValidCell(state, r, c) ||
        state.status === "won" ||
        state.status === "lost"
      ) {
        return state;
      }

      const cell = state.grid[r][c];

      if (cell.revealed) return state;

      if (!cell.flagged && state.flags >= state.mines) {
        return state;
      }

      const tx = createGridTransaction(state.grid);

      tx.write(r, c, {
        flagged: !cell.flagged,
      });

      return {
        grid: tx.grid,
        flags: state.flags + (cell.flagged ? -1 : 1),
      };
    }),

  tick: () =>
    set((state) => {
      if (state.status !== "playing" || state.time >= 999) {
        return state;
      }

      return { time: state.time + 1 };
    }),
}));
