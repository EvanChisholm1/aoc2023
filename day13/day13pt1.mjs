import { readFileSync } from "fs";

// const input = readFileSync("./sample.txt", "utf-8");
const input = readFileSync("./input.txt", "utf-8");
const grids = input
    .split("\n\n")
    .map((grid) => grid.split("\n").map((line) => line.split("")));

function isReflection(row, x) {
    let lhs = x;
    let rhs = x + 1;

    while (row[lhs] === row[rhs]) {
        lhs--;
        rhs++;

        if (lhs < 0 || rhs >= row.length) {
            return true;
        }
    }

    return false;
}

function prettyPrintGrid(grid) {
    for (const row of grid) {
        console.log(row.join(""));
    }
}

let sum = 0;

for (const grid of grids) {
    for (let x = 0; x < grid[0].length - 1; x++) {
        const currentIsReflection = grid.every((row) => isReflection(row, x));
        if (currentIsReflection) {
            sum += x + 1;
        }
    }

    const columns = grid[0].map((_, i) => grid.map((row) => row[i]));
    // console.log("\n\n");
    // prettyPrintGrid(grid);
    // prettyPrintGrid(columns);

    for (let y = 0; y < grid.length - 1; y++) {
        const currentIsReflection = columns.every((row) =>
            isReflection(row, y)
        );
        if (currentIsReflection) sum += (y + 1) * 100;
    }
}

console.log(sum);
