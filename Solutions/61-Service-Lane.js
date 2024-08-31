'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the 'serviceLane' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. 2D_INTEGER_ARRAY cases
 */



function serviceLane(n, cases, width) {
    const result = [];
    
    for (const [start, end] of cases) {
        let minWidth = width[start];
        
        for (let i = start + 1; i <= end; i++) {
            if (width[i] < minWidth) {
                minWidth = width[i];
            }
        }
        
        result.push(minWidth);
    }
    
    return result;
}

function main() {
    const fs = require('fs');
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(firstMultipleInput[0], 10);
    const t = parseInt(firstMultipleInput[1], 10);

    const width = readLine().replace(/\s+$/g, '').split(' ').map(Number);

    const cases = [];
    for (let i = 0; i < t; i++) {
        cases.push(readLine().replace(/\s+$/g, '').split(' ').map(Number));
    }

    const result = serviceLane(n, cases, width);

    ws.write(result.join('\n') + '\n');

    ws.end();
}
