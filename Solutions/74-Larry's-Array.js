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
 * Complete the 'larrysArray' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts INTEGER_ARRAY A as parameter.
 */

function larrysArray(A) {
    var numInversions = 0;
    
    // loop over the array
    for(let i=0;i<A.length;i++) {
        // if number in the sequence is in wrong position
        if (A[i] != i+1) {
            
            let j = i+1
            // finds the first element that is in the correct position
            for(; j<A.length; j++) {
                if (A[j]==i+1) {
                    break;
                }
            }
            
            // (Perform an inversion) when a smaller element is to the right of a larger element
            while(j > i) {
                // Swapping positions
                [A[j-1], A[j]] = [A[j], A[j-1]];
                
                j--;
                numInversions++;
            };
        };
    };
    
    // The array can be sorted if the number of inversions in the array are even.
    return numInversions%2==0 ? 'YES' : 'NO'
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const t = parseInt(readLine().trim(), 10);

    for (let tItr = 0; tItr < t; tItr++) {
        const n = parseInt(readLine().trim(), 10);

        const A = readLine().replace(/\s+$/g, '').split(' ').map(ATemp => parseInt(ATemp, 10));

        const result = larrysArray(A);

        ws.write(result + '\n');
    }

    ws.end();
}
