'use strict';

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
 * Complete the 'kaprekarNumbers' function below.
 *
 * The function accepts following parameters:
 *  1. INTEGER p
 *  2. INTEGER q
 */z

function kaprekarNumbers(p, q) {
    let result = [];
    for (let i = p; i <= q; i++) {
        const squareString = (i * i).toString();
        const num1 = squareString.substring(0, squareString.length / 2);
        const num2 = squareString.substring(squareString.length / 2, squareString.length);

        if (Number(num1) + Number(num2) === i) {
            result = result.concat(i)
        }
    }
    if (result.length === 0) {
        console.log('INVALID RANGE')
    } else {
        console.log(...result);
    }
}

function main() {
    const p = parseInt(readLine().trim(), 10);

    const q = parseInt(readLine().trim(), 10);

    kaprekarNumbers(p, q);
}
