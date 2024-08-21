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
 * Complete the 'hurdleRace' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER k
 *  2. INTEGER_ARRAY height
 */


function hurdleRace(k, height) {
    let maxCount = 0;
    for (let i = 0; i < height.length; i++) {
        if (height[i] > k) {
            let diff = height[i] - k;
            if (diff > maxCount) {
                maxCount = diff;
            }

        }
    }
    if (maxCount === 0) {
        return 0;
    }
    return maxCount;

}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(firstMultipleInput[0], 10);

    const k = parseInt(firstMultipleInput[1], 10);

    const height = readLine().replace(/\s+$/g, '').split(' ').map(heightTemp => parseInt(heightTemp, 10));

    const result = hurdleRace(k, height);

    ws.write(result + '\n');

    ws.end();
}
