import { readFileSync } from "fs";

const input = readFileSync("./input.txt", "utf8");
// const input = readFileSync("./sample2.txt", "utf8");
// const input = readFileSync("./sample3.txt", "utf8");
// const input = readFileSync("./sample4.txt", "utf8");

const grid = input.split("\n").map((line) => line.split(""));

let startX = 0;
let startY = 0;

for (let x = 0; x < grid[0].length; x++) {
    for (let y = 0; y < grid.length; y++) {
        if (grid[y][x] === "S") {
            startX = x;
            startY = y;
        }
    }
}

function nextCoord(x, y) {
    if (grid[y][x] === "S") {
        return [
            [x + 1, y],
            [x - 1, y],
            [x, y + 1],
            [x, y - 1],
        ].filter(([fx, fy]) => {
            if (fx < 0 || fy < 0 || fx >= grid[0].length || fy >= grid.length) {
                return false;
            }
            if (grid[fy][fx] === ".") {
                // console.log(x, y, grid[y][x]);
                return false;
            }
            const nextNext = nextCoord(fx, fy);
            const connects = nextNext.reduce(
                (acc, [fx, fy]) => acc || (fx === x && fy === y),
                false
            );
            return connects;
        });
    }

    if (grid[y][x] === ".") {
        return null;
    } else if (grid[y][x] === "-") {
        return [
            [x + 1, y],
            [x - 1, y],
        ];
    } else if (grid[y][x] === "|") {
        return [
            [x, y + 1],
            [x, y - 1],
        ];
    } else if (grid[y][x] === "L") {
        return [
            [x, y - 1],
            [x + 1, y],
        ];
    } else if (grid[y][x] === "J") {
        return [
            [x, y - 1],
            [x - 1, y],
        ];
    } else if (grid[y][x] === "F") {
        return [
            [x, y + 1],
            [x + 1, y],
        ];
    } else if (grid[y][x] === "7") {
        return [
            [x, y + 1],
            [x - 1, y],
        ];
    }
}

const visited = new Set();

let maxDist = 0;
let q = [[startX, startY, 0]];
function dfs(x, y, step) {
    if (visited.has(`${x},${y}`)) {
        return 0;
    }
    maxDist = Math.max(maxDist, step);
    visited.add(`${x},${y}`);
    const next = nextCoord(x, y);
    if (next === null) {
        return 0;
    }

    next.forEach(([x, y]) => {
        q.push([x, y, step + 1]);
    });
}

while (q.length > 0) {
    const [x, y, step] = q.shift();
    dfs(x, y, step);
}

let nInLoop = 0;

for (let y = 0; y < grid.length; y++) {
    let inLoop = false;
    for (let x = 0; x < grid[0].length; x++) {
        if (
            visited.has(`${x},${y}`) &&
            visited.has(`${x},${y - 1}`) &&
            grid[y - 1][x] !== "J" &&
            grid[y - 1][x] !== "L" &&
            grid[y - 1][x] !== "-"
        ) {
            inLoop = !inLoop;
        }

        if (!visited.has(`${x},${y}`) && inLoop) {
            nInLoop++;
        }
    }
}

console.log(nInLoop);
