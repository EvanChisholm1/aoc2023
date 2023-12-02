import { readFileSync } from "fs";

const input = readFileSync("./input.txt", "utf8");

const maxValues = {
    red: 12,
    green: 13,
    blue: 14,
};

const lines = input.split("\n");
let sum = 0;
lines.map((line) => {
    const id = parseInt(line.split(":")[0].split(" ")[1]);
    // console.log(id);
    const minSet = {
        red: 0,
        green: 0,
        blue: 0,
    };

    let includeCurrent = true;
    line.split(":")[1]
        .split(",")
        .flatMap((x) => x.split(";"))
        .map((x) => x.trim())
        .forEach((x) => {
            const [n, color] = x.split(" ");
            if (maxValues[color] < n) {
                includeCurrent = false;
            }
            minSet[color] = Math.max(minSet[color], parseInt(n));
        });

    if (includeCurrent) {
        // sum += id;
    }

    const powerSet = minSet.red * minSet.green * minSet.blue;
    sum += powerSet;
});

console.log(sum);
