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
 * Complete the 'beautifulTriplets' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER d
 *  2. INTEGER_ARRAY arr
 */

function beautifulTriplets(d, arr) {
    let count = arr[0];
    let max = arr[arr.length - 1];
    let result = 0;

    let { values } = new Array(arr.length).fill(0).reduce(
        (target, item, index) => {
            target["values"][arr[index]] = target["values"][arr[index]]
                ? (target["values"][arr[index]] += 1)
                : 1;

            return target;
        },
        { values: {} }
    );

    while (count <= max) {
        values[count] &&
            values[count + d] &&
            values[count + d * 2] &&
            (result += Math.max(
                values[count],
                values[count + d],
                values[count + d * 2]
            ));

        count++;
    }

    return result;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(firstMultipleInput[0], 10);

    const d = parseInt(firstMultipleInput[1], 10);

    const arr = readLine().replace(/\s+$/g, '').split(' ').map(arrTemp => parseInt(arrTemp, 10));

    const result = beautifulTriplets(d, arr);

    ws.write(result + '\n');

    ws.end();
}
