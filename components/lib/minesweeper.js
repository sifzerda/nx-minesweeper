// /lib/minesweeper.js

export const DIFFICULTIES = {
  beginner: { rows: 8, cols: 8, mines: 10 },
  intermediate: { rows: 16, cols: 16, mines: 40 },
  expert: { rows: 16, cols: 30, mines: 99 },
};

export function createGrid(rows, cols) {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({
      mine: false,
      revealed: false,
      flagged: false,
      adjacent: 0,
      exploded: false,
    }))
  );
}

export function getNeighbors(r, c, rows, cols) {
  const neighbors = [];

  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (dr === 0 && dc === 0) continue;

      const nr = r + dr;
      const nc = c + dc;

      if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
        neighbors.push([nr, nc]);
      }
    }
  }

  return neighbors;
}

export function placeMines(tx, mines, safeR, safeC) {
  const rows = tx.grid.length;
  const cols = tx.grid[0].length;

  const safeIndex = safeR * cols + safeC;

  const safeArea = new Set([
    safeIndex,
    ...getNeighbors(safeR, safeC, rows, cols).map(
      ([r, c]) => r * cols + c
    ),
  ]);

  const protectArea = rows * cols - safeArea.size >= mines;

  const candidates = [];

  for (let i = 0; i < rows * cols; i++) {
    if (i === safeIndex) continue;
    if (protectArea && safeArea.has(i)) continue;

    candidates.push(i);
  }

  // Partial Fisher-Yates shuffle.
  for (let i = 0; i < mines; i++) {
    const j =
      i + Math.floor(Math.random() * (candidates.length - i));

    [candidates[i], candidates[j]] = [
      candidates[j],
      candidates[i],
    ];

    const index = candidates[i];
    const r = Math.floor(index / cols);
    const c = index % cols;

    tx.write(r, c, { mine: true });
  }

  // Calculate adjacent mine counts.
  for (let i = 0; i < mines; i++) {
    const index = candidates[i];

    const r = Math.floor(index / cols);
    const c = index % cols;

    for (const [nr, nc] of getNeighbors(r, c, rows, cols)) {
      const cell = tx.read(nr, nc);

      if (!cell.mine) {
        tx.write(nr, nc, {
          adjacent: cell.adjacent + 1,
        });
      }
    }
  }
}

/**
 * Multi-source breadth-first reveal.
 *
 * Accepts one or more starting cells.
 * Used by both normal reveal and chord reveal.
 */
export function revealCells(tx, startingCells) {
  const rows = tx.grid.length;
  const cols = tx.grid[0].length;

  const visited = new Uint8Array(rows * cols);
  const queue = [];

  function enqueue(r, c) {
    if (r < 0 || r >= rows || c < 0 || c >= cols) return;

    const index = r * cols + c;

    if (visited[index]) return;

    const cell = tx.read(r, c);

    if (cell.revealed || cell.flagged) return;

    visited[index] = 1;
    queue.push(index);
  }

  for (const [r, c] of startingCells) {
    enqueue(r, c);
  }

  let head = 0;
  let revealed = 0;
  let hitMine = false;

  while (head < queue.length) {
    const index = queue[head++];

    const r = Math.floor(index / cols);
    const c = index % cols;

    const cell = tx.read(r, c);

    if (cell.revealed || cell.flagged) continue;

    if (cell.mine) {
      tx.write(r, c, {
        revealed: true,
        exploded: true,
      });

      hitMine = true;
      break;
    }

    tx.write(r, c, { revealed: true });
    revealed++;

    if (cell.adjacent !== 0) continue;

    for (const [nr, nc] of getNeighbors(r, c, rows, cols)) {
      enqueue(nr, nc);
    }
  }

  return { revealed, hitMine };
}

export function chordReveal(tx, r, c) {
  const rows = tx.grid.length;
  const cols = tx.grid[0].length;

  const cell = tx.read(r, c);

  if (!cell.revealed || cell.mine || cell.adjacent === 0) {
    return { revealed: 0, hitMine: false };
  }

  const neighbors = getNeighbors(r, c, rows, cols);

  const flaggedCount = neighbors.reduce(
    (count, [nr, nc]) =>
      count + Number(tx.read(nr, nc).flagged),
    0
  );

  if (flaggedCount !== cell.adjacent) {
    return { revealed: 0, hitMine: false };
  }

  const targets = neighbors.filter(([nr, nc]) => {
    const neighbor = tx.read(nr, nc);

    return !neighbor.revealed && !neighbor.flagged;
  });

  if (targets.length === 0) {
    return { revealed: 0, hitMine: false };
  }

  return revealCells(tx, targets);
}

export function revealAllMines(tx) {
  const rows = tx.grid.length;
  const cols = tx.grid[0].length;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const cell = tx.read(r, c);

      if (cell.mine && !cell.revealed) {
        tx.write(r, c, { revealed: true });
      }
    }
  }
}
