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

// functional recursive solution:
// the cooler solution :)
function recurse(arr) {
    const diffs = commonDifference(arr);
    const allZeros = diffs.every((diff) => diff === 0);

    if (allZeros) return arr[arr.length - 1];
    else return recurse(diffs) + arr[arr.length - 1];
}

const out = histories.reduce((acc, history) => acc + recurse(history), 0);
console.log(out);

// imperative solution:
let total = 0;

histories.forEach((history) => {
    let diffs = commonDifference(history);
    let allZeros = diffs.every((diff) => diff === 0);
    const lastVals = [history[history.length - 1], diffs[diffs.length - 1]];

    while (!allZeros) {
        diffs = commonDifference(diffs);
        allZeros = diffs.every((diff) => diff === 0);
        lastVals.push(diffs[diffs.length - 1]);
    }

    total += lastVals.reduce((acc, val) => acc + val, 0);
});

console.log(total);
