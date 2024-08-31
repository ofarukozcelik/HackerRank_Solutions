'use strict';

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
 * Complete the 'matrixRotation' function below.
 *
 * The function accepts following parameters:
 *  1. 2D_INTEGER_ARRAY matrix
 *  2. INTEGER r
 */

function matrixRotation(matrix, r) {
    // Number of rows
    const m = matrix.length;
    
    // Number of columns
    const n = matrix[0].length;
    
    // Number of rotation layers (minimum value of `m` or `n` divided by 2)
    // The challenge ensures that matrix dimensions are always even.
    const k = Math.min(m, n) / 2;
    
    // Rotation layers array
    const rotated = [];
    
    // Build rotation layers array from original array
    for (let i = 0; i < k; i++) {
        // Temporary row array
        const arr = [];
        
        // Traverse layer's columns left-to-right
        for (let j = i; j < (n - 1 - i); j++) {
            arr.push(matrix[i][j]);
        }
        
        // Traverse layer's rows top-to-bottom
        for (let j = i; j < (m - 1 - i); j++) {
            arr.push(matrix[j][n - 1 - i]);
        }
        
        // Traverse layer's columns right-to-left
        for (let j = (n - 1 - i); j > i; j--) {
            arr.push(matrix[m - 1 - i][j]);
        }
        
        // Traverse layer's rows bottom-to-top
        for (let j = (m - 1 - i); j > i; j--) {
            arr.push(matrix[j][i]);
        }
        
        rotated.push(arr);
    }
    
    // Apply rotations to each layer (k)
    for (let i = 0; i < k; i++) {
        // Get rotated layer at current depth
        const row = rotated[i];
        
        // Assign an index variable which points to current layer column.
        // Note that we use the modulus operator here to prevent running
        // out of resources. Since `1 <= r <= 10^9`. Meaning (r) can 
        // reach up to 1 billion. This guarantees that we'll hit the 
        // execution time limit unless the modulus operator is
        // used for calculating the rotations without
        // needless iterations.
        let idx = r % row.length;
        
        // Increases the index number after each update to the original matrix
        const increment = () => idx = (idx + 1) % row.length;
        
        // Update columns left-to-right
        for (let j = i; j < (n - 1 - i); j++) {
            matrix[i][j] = row[idx];
            increment();
        }
        
        // Update rows top-to-bottom
        for (let j = i; j < (m - 1 - i); j++) {
            matrix[j][n - 1 - i] = row[idx];
            increment();
        }
        
        // Update columns right-to-left
        for (let j = (n - 1 - i); j > i; j--) {
            matrix[m - 1 - i][j] = row[idx];
            increment();
        }
        
        // Update rows bottom-to-top
        for (let j = (m - 1 - i); j > i; j--) {
            matrix[j][i] = row[idx];
            increment();
        }
    }
    
    // Print rotated matrix
    for (let row of matrix) {
        console.log(row.join(' '));
    }
}

function main() {
    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const m = parseInt(firstMultipleInput[0], 10);

    const n = parseInt(firstMultipleInput[1], 10);

    const r = parseInt(firstMultipleInput[2], 10);

    let matrix = Array(m);

    for (let i = 0; i < m; i++) {
        matrix[i] = readLine().replace(/\s+$/g, '').split(' ').map(matrixTemp => parseInt(matrixTemp, 10));
    }

    matrixRotation(matrix, r);
}
