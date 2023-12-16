import { readFileSync } from "fs";

// const input = readFileSync("./sample.txt", "utf-8");
const input = readFileSync("./input.txt", "utf-8");
const lines = input.split("\n").join("").split(",");

function hash(text) {
    return text
        .split("")
        .reduce((acc, cur) => ((acc + cur.charCodeAt()) * 17) % 256, 0);
}

const out = lines.reduce((acc, cur) => acc + hash(cur), 0);
console.log(out);
