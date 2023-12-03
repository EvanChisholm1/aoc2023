import { readFileSync } from "fs";

const input = readFileSync("./input.txt", "utf8");
const grid = input.split("\n").map((line) => line.split(""));

const isDigit = (char) => char >= "0" && char <= "9";

function neighboringSymbol(x, y) {
    const neighbors = [];
    if (x > 0) {
        neighbors.push(grid[y][x - 1]);
    }
    if (x < grid[0].length - 1) {
        neighbors.push(grid[y][x + 1]);
    }
    if (y > 0) {
        neighbors.push(grid[y - 1][x]);
    }
    if (y < grid.length - 1) {
        neighbors.push(grid[y + 1][x]);
    }
    // diagonals
    if (x > 0 && y > 0) {
        neighbors.push(grid[y - 1][x - 1]);
    }
    if (x > 0 && y < grid.length - 1) {
        neighbors.push(grid[y + 1][x - 1]);
    }
    if (x < grid[0].length - 1 && y > 0) {
        neighbors.push(grid[y - 1][x + 1]);
    }
    if (x < grid[0].length - 1 && y < grid.length - 1) {
        neighbors.push(grid[y + 1][x + 1]);
    }

    return (
        neighbors.filter((x) => {
            if (isDigit(x)) {
                return false;
            }
            if (x === ".") {
                return false;
            } else {
                return true;
            }
        }).length > 0
    );
}

let sum = 0;

for (let y = 0; y < grid.length; y++) {
    let numString = "";
    let currentNeighborSymbol = false;
    for (let x = 0; x < grid[0].length; x++) {
        if (isDigit(grid[y][x])) {
            numString = `${numString}${grid[y][x]}`;
            currentNeighborSymbol =
                neighboringSymbol(x, y) || currentNeighborSymbol;
        } else {
            if (numString) sum += parseInt(numString) * currentNeighborSymbol;
            numString = "";
            currentNeighborSymbol = false;
        }
    }

    if (numString) sum += parseInt(numString) * currentNeighborSymbol;
    numString = "";
    currentNeighborSymbol = false;
}

console.log(sum);
