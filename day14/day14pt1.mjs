import { readFileSync } from "fs";

const input = readFileSync("./input.txt", "utf-8");
// const input = readFileSync("./sample.txt", "utf-8");
const grid = input.split("\n").map((line) => line.split(""));
console.log(grid);

let totalLoad = 0;
for (let x = 0; x < grid[0].length; x++) {
    let lastY = 0;
    for (let y = 0; y < grid.length; y++) {
        if (grid[y][x] === "O") {
            totalLoad += grid.length - lastY;
            lastY++;
        } else if (grid[y][x] === "#") {
            lastY = y + 1;
        }
    }
}

console.log(totalLoad);
