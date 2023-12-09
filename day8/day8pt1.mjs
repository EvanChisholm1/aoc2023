import { readFileSync } from "fs";

// const input = readFileSync("./sample.txt", "utf-8");
const input = readFileSync("./input.txt", "utf-8");
const [lrInst, map] = input.split("\n\n");

const lookup = map
    .split("\n")
    .map((line) => {
        const [key, valuesStr] = line.split(" = ");
        return {
            key,
            values: valuesStr.replace("(", "").replace(")", "").split(", "),
        };
    })
    .reduce((acc, { key, values }) => {
        acc[key] = values;
        return acc;
    }, {});

let step = 0;
let current = "AAA";
while (current !== "ZZZ") {
    const inst = lrInst[step % lrInst.length];
    const next = lookup[current][inst === "L" ? 0 : 1];
    current = next;
    step++;
}

console.log(step);
