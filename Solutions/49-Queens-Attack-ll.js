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
 * Complete the 'queensAttack' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. INTEGER k
 *  3. INTEGER r_q
 *  4. INTEGER c_q
 *  5. 2D_INTEGER_ARRAY obstacles
 */

function queensAttack(n, k, r_q, c_q, obstacles) {
    let up = n - r_q;
    let right = n - c_q;
    let down = r_q - 1;
    let left = c_q - 1;

    let up_left = Math.min(up, left);
    let up_right = n - Math.max(c_q, r_q);
    let down_left = Math.min(c_q, r_q) - 1;
    let down_right = Math.min(r_q - 1, n - c_q);

    for (let i of Array.from({ length: k }, (value, index) => index)) {
        let { 0: r_o, 1: c_o } = obstacles[i];

        r_o == r_q &&
            (c_o > c_q
                ? (up = Math.min(up, c_o - c_q - 1))
                : (down = Math.min(down, c_q - c_o - 1)));

        c_o == c_q &&
            (r_o > r_q
                ? (right = Math.min(right, r_o - r_q - 1))
                : (left = Math.min(left, r_q - r_o - 1)));

        Math.abs(c_o - c_q) == Math.abs(r_o - r_q) &&
            (c_o > c_q && r_o > r_q && (up_right = Math.min(up_right, c_o - c_q - 1)),
                c_o > c_q &&
                r_o < r_q &&
                (down_right = Math.min(down_right, c_o - c_q - 1)),
                c_o < c_q && r_o > r_q && (up_left = Math.min(up_left, c_q - c_o - 1)),
                c_o < c_q &&
                r_o < r_q &&
                (down_left = Math.min(down_left, c_q - c_o - 1)));
    }

    return right + left + up + down + down_left + up_left + down_right + up_right;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(firstMultipleInput[0], 10);

    const k = parseInt(firstMultipleInput[1], 10);

    const secondMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const r_q = parseInt(secondMultipleInput[0], 10);

    const c_q = parseInt(secondMultipleInput[1], 10);

    let obstacles = Array(k);

    for (let i = 0; i < k; i++) {
        obstacles[i] = readLine().replace(/\s+$/g, '').split(' ').map(obstaclesTemp => parseInt(obstaclesTemp, 10));
    }

    const result = queensAttack(n, k, r_q, c_q, obstacles);

    ws.write(result + '\n');

    ws.end();
}
