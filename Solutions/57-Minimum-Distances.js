'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function (inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function () {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the 'minimumDistances' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts INTEGER_ARRAY a as parameter.
 */

function minimumDistances(a) {
    let result = 0;

    for (let i of Array.from({ length: a.length }, (value, index) => index)) {
        for (let j of Array.from(
            { length: a.length },
            (value, index) => index + i + 1
        )) {
            ((a[i] === a[j] && !result) ||
                (a[i] === a[j] && Math.abs(i - j) < result)) &&
                (result = Math.abs(i - j));
        }
    }

    return !result ? -1 : result;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const n = parseInt(readLine().trim(), 10);

    const a = readLine().replace(/\s+$/g, '').split(' ').map(aTemp => parseInt(aTemp, 10));

    const result = minimumDistances(a);

    ws.write(result + '\n');

    ws.end();
}
