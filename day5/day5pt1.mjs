import { readFileSync } from "fs";

const input = readFileSync("./input.txt", "utf8");
const [seeds, ...chunks] = input.split("\n\n").map((chunk) => {
    const [key, values] = chunk.split(":");
    return { key, values: values.trim() };
});

const seedArr = seeds.values.split(" ").map((seed) => parseInt(seed));

const tables = chunks.map((chunk) => {
    const rows = chunk.values.split("\n").map((row) => {
        const [destStart, sourceStart, length] = row
            .split(" ")
            .map((x) => parseInt(x));
        return { destStart, sourceStart, length };
    });
    return rows;
});

let minPos = Infinity;
for (const seed of seedArr) {
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

console.log(minPos);
