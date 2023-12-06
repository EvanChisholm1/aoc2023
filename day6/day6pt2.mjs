import { readFileSync } from "fs";

// const input = readFileSync("./sample.txt", "utf-8");
const input = readFileSync("./input.txt", "utf-8");

const [times, records] = input.split("\n").map((line) => {
    const numbers = parseInt(
        line
            .split(":")[1]
            .trim()
            .split(" ")
            .filter((x) => (x ? true : false))
            .join("")
    );

    return numbers;
});

const time = times;
const record = records;

function quadraticFormula(a, b, c) {
    const high = (-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a);
    const low = (-b - Math.sqrt(b * b - 4 * a * c)) / (2 * a);
    return [low, high].sort((a, b) => a - b);
}

const [low, high] = quadraticFormula(-1, time, -record);

// add and subtract one because you don't win on the zeros, only tie
const min = Math.floor(low) + 1;
const max = Math.ceil(high) - 1;
const answer = max - min + 1;

console.log(answer);
