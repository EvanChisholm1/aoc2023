import { readFileSync } from "fs";

// const input = readFileSync("./sample.txt", "utf8");
const input = readFileSync("./input.txt", "utf8");

const histories = input
    .split("\n")
    .map((line) => line.split(" ").map((x) => parseInt(x)));

function commonDifference(arr) {
    const diffs = [];

    for (let i = 0; i < arr.length - 1; i++) {
        diffs.push(arr[i + 1] - arr[i]);
    }

    return diffs;
}

// functional solution:
function recurse(arr) {
    const diffs = commonDifference(arr);
    const allZeros = diffs.every((diff) => diff === 0);

    if (allZeros) return arr[0];
    else return arr[0] - recurse(diffs);
}

const out = histories.reduce((acc, history) => acc + recurse(history), 0);
console.log(out);

// imperative solution:
let total = 0;

histories.forEach((history) => {
    let diffs = commonDifference(history);
    let allZeros = diffs.every((diff) => diff === 0);
    const firstVals = [history[0], diffs[0]];

    while (!allZeros) {
        diffs = commonDifference(diffs);
        allZeros = diffs.every((diff) => diff === 0);
        firstVals.push(diffs[0]);
    }

    total += firstVals.reverse().reduce((acc, val) => val - acc, 0);
});

console.log(total);
