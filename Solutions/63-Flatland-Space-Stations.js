'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.replace(/\s*$/, '')
        .split('\n')
        .map(str => str.replace(/\s*$/, ''));

    main();
});

function readLine() {
    return inputString[currentLine++];
}

// Complete the flatlandSpaceStations function below.
function flatlandSpaceStations(n, c) {
  let max = 0;

  c.sort((a, b) => a - b);

  for (let i of Array.from({ length: c.length - 1 }, (value, index) => index)) {
    let value = +Math.ceil((c[i + 1] - c[i] - 1) / 2.0);
    value > max && (max = value);
  }

  c[0] - 0 > max && (max = c[0] - 0);

  n - 1 - c[c.length - 1] > max && (max = n - 1 - c[c.length - 1]);

  return max;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const nm = readLine().split(' ');

    const n = parseInt(nm[0], 10);

    const m = parseInt(nm[1], 10);

    const c = readLine().split(' ').map(cTemp => parseInt(cTemp, 10));

    let result = flatlandSpaceStations(n, c);

    ws.write(result + "\n");

    ws.end();
}
