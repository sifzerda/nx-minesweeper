// lib/gridTransaction.js

export function createGridTransaction(source) {
  const grid = [...source];

  const copiedRows = new Set();
  const copiedCells = new Set();

  const cols = source[0].length;

  function read(r, c) {
    return grid[r][c];
  }

  function write(r, c, changes) {
    const key = r * cols + c;
    const current = read(r, c);

    const hasChanges = Object.entries(changes).some(
      ([property, value]) => current[property] !== value
    );

    if (!hasChanges) return current;

    if (!copiedRows.has(r)) {
      grid[r] = [...grid[r]];
      copiedRows.add(r);
    }

    if (!copiedCells.has(key)) {
      grid[r][c] = { ...grid[r][c] };
      copiedCells.add(key);
    }

    Object.assign(grid[r][c], changes);

    return grid[r][c];
  }

  return {
    grid,
    read,
    write,

    get changed() {
      return copiedCells.size > 0;
    },
  };
}
