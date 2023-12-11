import { readFileSync } from "fs";

// const input = readFileSync("./sample.txt", "utf-8");
const input = readFileSync("./input.txt", "utf-8");

const grid = input.split("\n").map((line) => line.split(""));
const WIDTH = grid[0].length;
const HEIGHT = grid.length;

const doubleColumns = new Set();
const doubleRows = new Set();
const galaxies = [];

for (let y = 0; y < HEIGHT; y++) {
    let rowEmpty = true;
    for (let x = 0; x < WIDTH; x++) {
        if (grid[y][x] === "#") {
            galaxies.push({ x, y });
            rowEmpty = false;
        }
    }
    if (rowEmpty) doubleRows.add(y);
}

for (let x = 0; x < WIDTH; x++) {
    let colEmpty = true;
    for (let y = 0; y < HEIGHT; y++) {
        if (grid[y][x] === "#") {
            colEmpty = false;
            break;
        }
    }
    if (colEmpty) doubleColumns.add(x);
}

// little prefix sum action
// I don't think you NEED this but it most def makes it a lot faster
const prefixX = [];
const prefixY = [];

let prev = 0;
for (let i = 0; i < WIDTH; i++) {
    if (doubleColumns.has(i)) {
        const cur = prev + 1000000;
        prefixX.push(cur);
        prev = cur;
    } else {
        const cur = prev + 1;
        prefixX.push(cur);
        prev = cur;
    }
}

prev = 0;
for (let i = 0; i < HEIGHT; i++) {
    if (doubleRows.has(i)) {
        const cur = prev + 1000000;
        prefixY.push(cur);
        prev = cur;
    } else {
        const cur = prev + 1;
        prefixY.push(cur);
        prev = cur;
    }
}

function findShortest(a, b) {
    const horizontalDist = prefixX[b.x] - prefixX[a.x];
    const verticalDist = prefixY[b.y] - prefixY[a.y];
    return Math.abs(horizontalDist) + Math.abs(verticalDist);
}

let sum = 0;

for (let i = 0; i < galaxies.length - 1; i++) {
    for (let j = i + 1; j < galaxies.length; j++) {
        sum += findShortest(galaxies[i], galaxies[j]);
    }
}

console.log(sum);
