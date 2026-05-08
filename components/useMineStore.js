import { create } from "zustand";

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

                    if (
                        nr >= 0 &&
                        nr < rows &&
                        nc >= 0 &&
                        nc < cols &&
                        grid[nr][nc].mine
                    ) {
                        count++;
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

export const useMineStore = create((set, get) => ({
    rows: 8,
    cols: 8,
    mines: 10,
    grid: [],
    gameOver: false,
    time: 0,
    timerActive: false,
    flags: 10,
    revealedCount: 0,

    initialize: (rows, cols, mines) => {
        set({
            rows,
            cols,
            mines,
            flags: mines,
            gameOver: false,
            time: 0,
            timerActive: false,
            grid: generateGrid(rows, cols, mines),
        });
    },

    reset: (rows, cols, mines) => {
        set({
            rows,
            cols,
            mines,
            flags: mines,
            gameOver: false,
            time: 0,
            timerActive: false,
            revealedCount: 0,
            grid: generateGrid(rows, cols, mines),
        });
    },

    reveal: (r, c) => {
        const {
            grid,
            gameOver,
            rows,
            cols,
            timerActive,
        } = get();

        let localRevealed = get().revealedCount;

        if (
            gameOver ||
            grid[r][c].revealed ||
            grid[r][c].flagged
        ) return;

        if (!timerActive) {
            set({ timerActive: true });
        }

        const newGrid = [...grid];
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

            const key = rr * cols + cc;
            if (visited.has(key)) continue;
            visited.add(key);

            cloneCell(newGrid, clonedRows, rr, cc);

            const cell = newGrid[rr][cc];

            if (!cell.revealed && !cell.flagged) {
                cell.revealed = true;
                localRevealed++;
            }

            if (cell.mine) {

                for (let rr = 0; rr < rows; rr++) {
                    for (let cc = 0; cc < cols; cc++) {

                        if (newGrid[rr][cc].mine) {
                            cloneCell(newGrid, clonedRows, rr, cc);
                            newGrid[rr][cc].revealed = true;
                        }
                    }
                }

                set({
                    grid: newGrid,
                    gameOver: true,
                    timerActive: false,
                    revealedCount: localRevealed
                });

                return;
            }

            if (cell.adjacent === 0) {
                for (let dr = -1; dr <= 1; dr++) {
                    for (let dc = -1; dc <= 1; dc++) {
                        queue.push([rr + dr, cc + dc]);
                    }
                }
            }
        }

        set({
            grid: newGrid,
            revealedCount: localRevealed
        });
    },

    toggleFlag: (r, c) => {
        const { grid, gameOver, flags, rows, cols, mines, timerActive } = get();
        if (gameOver || grid[r][c].revealed) return;
        const cell = grid[r][c];
        if (!cell.flagged && flags <= 0) return;
        const newGrid = [...grid];
        newGrid[r] = [...newGrid[r]];
        newGrid[r][c] = {
            ...newGrid[r][c],
            flagged: !cell.flagged,
        };

        const isAddingFlag = !cell.flagged;
        const nextFlags = isAddingFlag ? flags - 1 : flags + 1;
        const totalCells = rows * cols;
        let revealedCount = 0;

        for (const row of newGrid) {
            for (const cell of row) {
                if (cell.revealed) revealedCount++;
            }
        }

        const hasWon = revealedCount === totalCells - mines;

        set({
            grid: newGrid,
            flags: nextFlags,
            revealedCount,
            gameOver: hasWon,
            timerActive: hasWon ? false : timerActive,
        });
    },
    tick: () => {
        set((state) => ({ time: state.time + 1 }));
    },
}));