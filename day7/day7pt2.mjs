import { readFileSync } from "fs";

// const input = readFileSync("./sample.txt", "utf-8");
const input = readFileSync("./input.txt", "utf-8");

const hands = input
    .split("\n")
    .map((x) => x.split(" "))
    .map(([hand, bid]) => [hand, parseInt(bid)]);

function classifyType(hand) {
    const counts = {};
    hand.split("").forEach((c) => {
        if (counts[c]) counts[c]++;
        else counts[c] = 1;
    });

    const jokerCount = counts["J"] ? counts["J"] : 0;

    let maxCount = 0;
    const countArr = [];
    for (const [k, v] of Object.entries(counts)) {
        if (k === "J") continue;
        maxCount = Math.max(v, maxCount);
        countArr.push(v);
    }

    countArr.sort((a, b) => b - a);

    maxCount += jokerCount;
    countArr[0] += jokerCount;

    if (maxCount === 5) return 0;
    else if (maxCount === 4) return 1;
    else if (maxCount === 3 && countArr[1] === 2) return 2;
    else if (maxCount === 3 && countArr[1] === 1) return 3;
    else if (countArr[0] === 2 && countArr[1] === 2) return 4;
    else if (countArr[0] === 2 && countArr[1] === 1) return 5;
    else if (maxCount === 1) return 6;
}

const cardRanks = "AKQT98765432J"
    .split("")
    .reverse()
    .reduce((acc, face, i) => {
        acc[face] = i;
        return acc;
    }, new Object());

hands.sort(([a], [b]) => {
    const typeDiff = classifyType(a) - classifyType(b);
    if (typeDiff !== 0) return typeDiff;

    for (let i = 0; i < 5; i++) {
        if (a[i] === b[i]) continue;
        return cardRanks[b[i]] - cardRanks[a[i]];
    }

    return 0;
});

const answer = hands
    .reverse()
    .reduce((acc, [_, bid], i) => acc + bid * (i + 1), 0);

console.log(answer);
