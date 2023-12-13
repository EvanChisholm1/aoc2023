import { readFileSync } from "fs";

// const input = readFileSync("./sample.txt", "utf-8");
const input = readFileSync("./input.txt", "utf-8");

const records = input.split("\n").map((line) => {
    const [field, listStr] = line.split(" ");
    const list = listStr.split(",").map((x) => parseInt(x, 10));
    return { field: field.split(""), list };
});

function checkValidArrangement({ field, list }) {
    let listPointer = -1;
    let currentSize = 0;
    let isInGroup = false;

    const acutalList = [];

    for (let i = 0; i < field.length; i++) {
        if (field[i] === "#") {
            isInGroup = true;
            currentSize++;
        } else {
            if (isInGroup) {
                acutalList.push(currentSize);
                currentSize = 0;
                listPointer++;
            }
            isInGroup = false;
        }
    }
    if (isInGroup) {
        acutalList.push(currentSize);
    }
    // console.log(acutalList, list);

    if (acutalList.length !== list.length) return false;

    return acutalList.every((x, i) => x === list[i]);
}

function findArrangements(record, start = 0) {
    const field = [...record.field];
    const list = [...record.list];

    if (start === field.length) {
        return checkValidArrangement({ field, list }) ? 1 : 0;
    }

    for (let i = start; i < field.length; i++) {
        if (field[i] === "?") {
            const a = [...field];
            a[i] = "#";
            const aResults = findArrangements({ field: a, list }, i + 1);

            const b = [...field];
            b[i] = ".";
            const bResults = findArrangements({ field: b, list }, i + 1);

            return aResults + bResults;
        }
    }

    return checkValidArrangement({ field, list }) ? 1 : 0;
}

const combinations = records.map((record) => findArrangements(record));
const sum = combinations.reduce((acc, x) => acc + x, 0);
console.log(sum);

// console.log(records);
// console.log(combinations);
