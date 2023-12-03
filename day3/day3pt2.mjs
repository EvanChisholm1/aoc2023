import { readFileSync } from "fs";

// This might be some of the worst code I've ever written. I'm sorry.
// read at your own risk.

const input = readFileSync("./input.txt", "utf8");
const grid = input.split("\n").map((line) => line.split(""));

const isDigit = (char) => char >= "0" && char <= "9";

function neighboringSymbol(x, y) {
    const neighbors = [];
    if (x > 0) {
        neighbors.push({ coords: [x - 1, y], char: grid[y][x - 1] });
    }
    if (x < grid[0].length - 1) {
        neighbors.push({ coords: [x + 1, y], char: grid[y][x + 1] });
    }
    if (y > 0) {
        neighbors.push({ coords: [x, y - 1], char: grid[y - 1][x] });
    }
    if (y < grid.length - 1) {
        neighbors.push({ coords: [x, y + 1], char: grid[y + 1][x] });
    }
    // diagonals
    if (x > 0 && y > 0) {
        neighbors.push({ coords: [x - 1, y - 1], char: grid[y - 1][x - 1] });
    }
    if (x > 0 && y < grid.length - 1) {
        neighbors.push({ coords: [x - 1, y + 1], char: grid[y + 1][x - 1] });
    }
    if (x < grid[0].length - 1 && y > 0) {
        neighbors.push({ coords: [x + 1, y - 1], char: grid[y - 1][x + 1] });
    }
    if (x < grid[0].length - 1 && y < grid.length - 1) {
        neighbors.push({ coords: [x + 1, y + 1], char: grid[y + 1][x + 1] });
    }

    return neighbors.filter((x) => {
        if (isDigit(x.char)) {
            return false;
        }
        if (x.char === ".") {
            return false;
        } else {
            return true;
        }
    });
}

let sum = 0;

const gears = {};
for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[0].length; x++) {
        if (grid[y][x] === "*") {
            gears[`${x},${y}`] = new Set();
        }
    }
}

for (let y = 0; y < grid.length; y++) {
    let numString = "";
    let currentNeighborSymbol = false;
    let neighboringGears = new Set();
    for (let x = 0; x < grid[0].length; x++) {
        if (isDigit(grid[y][x])) {
            numString = `${numString}${grid[y][x]}`;
            const neighbors = neighboringSymbol(x, y);
            neighbors.forEach(({ coords, char }) => {
                if (char === "*") {
                    neighboringGears.add(`${coords[0]},${coords[1]}`);
                }
            });
        } else {
            if (neighboringGears.size > 0) {
                neighboringGears.forEach((gear) => {
                    gears[gear].add(parseInt(numString));
                });
            }
            numString = "";
            currentNeighborSymbol = false;
            neighboringGears = new Set();
        }
    }
    if (neighboringGears.size > 0) {
        neighboringGears.forEach((gear) => {
            gears[gear].add(parseInt(numString));
        });
    }
    numString = "";
    currentNeighborSymbol = false;
    neighboringGears = new Set();
}

for (const gear in gears) {
    const gearSet = gears[gear];
    new Set().size;
    const gearArray = Array.from(gearSet);
    if (gearArray.length !== 2) continue;

    sum += gearArray[0] * gearArray[1];
}

console.log(sum);
