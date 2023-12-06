import { readFileSync } from "fs";

const input = readFileSync("./input.txt", "utf8");
const [seeds, ...chunks] = input.split("\n\n").map((chunk) => {
    const [key, values] = chunk.split(":");
    return { key, values: values.trim() };
});

const seedArr = seeds.values.split(" ").map((seed) => parseInt(seed));
const seedRanges = seedArr.reduce((acc, seed, i) => {
    if (acc.length !== 0 && acc[acc.length - 1].length < 2) {
        acc[acc.length - 1].push(seed);
    } else {
        acc.push([seed]);
    }
    return acc;
}, []);

const tables = chunks.map((chunk) => {
    const rows = chunk.values.split("\n").map((row) => {
        const [destStart, sourceStart, length] = row
            .split(" ")
            .map((x) => parseInt(x));
        return { destStart, sourceStart, length };
    });
    return rows;
});

// crappy brute force algorithm, took a few minutes to run
// will add another batching algorithim
let minPos = Infinity;
for (const [lower, rangeLength] of seedRanges) {
    for (let seed = lower; seed < lower + rangeLength; seed++) {
        let current = seed;

        for (const table of tables) {
            for (const row of table) {
                if (
                    current >= row.sourceStart &&
                    current < row.sourceStart + row.length
                ) {
                    current = current - row.sourceStart + row.destStart;
                    break;
                }
            }
        }

        minPos = Math.min(minPos, current);
    }
}

console.log(minPos);
