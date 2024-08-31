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
 * Complete the 'twoPluses' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts STRING_ARRAY grid as parameter.
 */

const walkPlus = (rowIdx, colIdx, gridMap, res) => {
    let step = 0
    let total = 1
    const maxRowLength = gridMap[0].length - 1
    const maxColLength = gridMap.length - 1
    let arrPosPlus = [`${rowIdx}|${colIdx}`]
    res[`${rowIdx}|${colIdx}|${step}`] = {
        step,
        total,
        arrPosPlus
    }
    while(true) {
       step += 1
       const left = colIdx - step
       const right = colIdx + step
       const top = rowIdx - step
       const bottom = rowIdx + step

       if (left < 0 || right > maxRowLength || top < 0 || bottom > maxColLength) {
           step -= 1
           break
       }

       const cellLeft = gridMap[rowIdx][left]
       const cellRight = gridMap[rowIdx][right]
       const cellTop = gridMap[top][colIdx]
       const cellBottom = gridMap[bottom][colIdx]
       
       if ([cellLeft, cellRight, cellTop, cellBottom].includes('B')) {
           step -= 1
           break
       }
        total += 4
        arrPosPlus = arrPosPlus.concat(
            [
                `${rowIdx}|${left}`,
                `${rowIdx}|${right}`,
                `${top}|${colIdx}`,
                `${bottom}|${colIdx}`
            ]
        )
        res[`${rowIdx}|${colIdx}|${step}`] = {
            step,
            total,
            arrPosPlus
        }
    }
    return res
}

const hashPlusByGrid = (gridMap) => {
    const res = {}
    gridMap.forEach((row, rowIdx) => {
        row.forEach((cell, colIdx) => {
            if (cell === 'G') {
                walkPlus(rowIdx, colIdx, gridMap, res)
            }
        })
    })
    return res
}

const isIntersection = (arr1, arr2) => {
    return arr1.some(pos => arr2.includes(pos))
}

function twoPluses(grid) {
    const gridMap = grid.map(i => i.split(''))
    const hashPlus = hashPlusByGrid(gridMap)
    let maxTotal = 0
    Object.keys(hashPlus).forEach(key1 => {
        const { total: total1, arrPosPlus: arrPosPlus1 } = hashPlus[key1]
        Object.keys(hashPlus).forEach(key2 => {
            const { total: total2, arrPosPlus: arrPosPlus2 } = hashPlus[key2]
            if (
                key1 === key2
                || isIntersection(
                    arrPosPlus1,
                    arrPosPlus2
                )
            ) {
                return
            }
            const total = total1 * total2
            if (maxTotal < total) {
                maxTotal = total
            }
        })
    })
    return maxTotal
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(firstMultipleInput[0], 10);

    const m = parseInt(firstMultipleInput[1], 10);

    let grid = [];

    for (let i = 0; i < n; i++) {
        const gridItem = readLine();
        grid.push(gridItem);
    }

    const result = twoPluses(grid);

    ws.write(result + '\n');

    ws.end();
}
