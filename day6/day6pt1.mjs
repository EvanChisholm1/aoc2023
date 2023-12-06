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

let answer = 1;

for (let i = 0; i < times.length; i++) {
    const time = times[i];
    const record = records[i];
    let winningStrats = 0;

    for (let j = 0; j <= time; j++) {
        const movingTime = time - j;
        const speed = j;
        const dist = movingTime * speed;

        if (dist > record) winningStrats++;
    }
    answer = answer * winningStrats;
}

console.log(answer);
