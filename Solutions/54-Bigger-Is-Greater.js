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
 * Complete the 'biggerIsGreater' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts STRING w as parameter.
 */

function biggerIsGreater(w) {
    let highestI = -1

    for (let i = 0; i < w.length - 1; i++) {
        if (w[i] < w[i + 1]) {
            highestI = i
        }
    }

    if (highestI === -1) {
        return 'no answer'
    }

    let highestJ = -1

    for (let j = highestI + 1; j < w.length; j++) {
        if (w[j] > w[highestI]) {
            highestJ = j
        }
    }

    let wArr = w.split('')

    let temp = wArr[highestI]
    wArr[highestI] = wArr[highestJ]
    wArr[highestJ] = temp

    let wArrStart = wArr.slice(0, highestI + 1)
    let wArrEnd = wArr.slice(highestI + 1)

    return wArrStart.concat(wArrEnd.reverse()).join('')
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const T = parseInt(readLine().trim(), 10);

    for (let TItr = 0; TItr < T; TItr++) {
        const w = readLine();

        const result = biggerIsGreater(w);

        ws.write(result + '\n');
    }

    ws.end();
}
