import { readFileSync } from "fs";

// const input = readFileSync("./sample2.txt", "utf-8");
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
const current = [];

for (const key of Object.keys(lookup)) {
    if (key[key.length - 1] === "A") current.push(key);
}

const shortestPaths = current.map((x) => {
    let cur = x;
    let step = 0;
    while (cur[cur.length - 1] !== "Z") {
        const inst = lrInst[step % lrInst.length];
        const next = lookup[cur][inst === "L" ? 0 : 1];
        cur = next;
        step++;
    }
    return step;
});

shortestPaths.sort((a, b) => a - b);

function gcd(a, b) {
    while (b !== 0) {
        [a, b] = [b, a % b];
    }

    return a;
}

function lcm(a, b) {
    return (a * b) / gcd(a, b);
}

const answer = shortestPaths.reduce((acc, x) => lcm(acc, x), 1);
console.log(answer);
