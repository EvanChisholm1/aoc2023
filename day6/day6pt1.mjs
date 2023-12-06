import { readFileSync } from "fs";

// const input = readFileSync("./sample.txt", "utf-8");
const input = readFileSync("./input.txt", "utf-8");

const [times, records] = input.split("\n").map((line) => {
    const numbers = line
        .split(":")[1]
        .trim()
        .split(" ")
        .filter((x) => (x ? true : false))
        .map((x) => parseInt(x));

    return numbers;
});

// quadratic function that models the win and losses
// f(holdtime) = holdTime * (raceLength - holdTime) - record
// f(holdtime) = -holdtime^2 + (holdtime * raceLength) - record

// use quadratic formula to find the zeros and use them to get the range
function quadraticFormula(a, b, c) {
    const high = (-b + Math.sqrt(b * b - 4 * a * c)) / (2 * a);
    const low = (-b - Math.sqrt(b * b - 4 * a * c)) / (2 * a);
    return [low, high].sort((a, b) => a - b);
}

let answer = 1;

for (let i = 0; i < times.length; i++) {
    const time = times[i];
    const record = records[i];

    const [low, high] = quadraticFormula(-1, time, -record);

    // add and subtract one because you don't win on the zeros, only tie
    const min = Math.floor(low) + 1;
    const max = Math.ceil(high) - 1;
    const winningStrats = max - min + 1;

    answer = answer * winningStrats;
}

console.log(answer);
