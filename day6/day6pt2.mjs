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

let answer = 1;

const time = times;
const record = records;
let winningStrats = 0;

for (let j = 0; j <= time; j++) {
    const movingTime = time - j;
    const speed = j;
    const dist = movingTime * speed;

    if (dist > record) winningStrats++;
}
answer = answer * winningStrats;

console.log(answer);
