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
 * Complete the 'timeInWords' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts following parameters:
 *  1. INTEGER h
 *  2. INTEGER m
 */

function timeInWords(h, m) {
    let words = [
        "zero",
        "one",
        "two",
        "three",
        "four",
        "five",
        "six",
        "seven",
        "eight",
        "nine",
        "ten",
        "eleven",
        "twelve",
        "thirteen",
        "fourteen",
        "fifteen",
        "sixteen",
        "seventeen",
        "eightteen",
        "nineteen",
        "twenty",
        "twenty one",
        "twenty two",
        "twenty three",
        "twenty four",
        "twenty five",
        "twenty six",
        "twenty seven",
        "twenty eight",
        "twenty nine"
    ];

    return !m
        ? `${words[h]} o' clock`
        : `${!(m % 30)
            ? "half"
            : !(m % 15)
                ? "quarter"
                : `${m <= 30 ? words[m] : words[60 - m]} ${`minute${m > 1 ? "s" : ""
                }`}`
        } ${m <= 30 ? "past" : "to"} ${words[m <= 30 ? h : h + 1]}`;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const h = parseInt(readLine().trim(), 10);

    const m = parseInt(readLine().trim(), 10);

    const result = timeInWords(h, m);

    ws.write(result + '\n');

    ws.end();
}
