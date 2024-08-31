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
 * Complete the 'bomberMan' function below.
 *
 * The function is expected to return a STRING_ARRAY.
 * The function accepts following parameters:
 *  1. INTEGER n
 *  2. STRING_ARRAY grid
 */

function timerUpdate (grid) {
  let rows = grid.length
  let cols = grid[0].length

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (Number.isInteger(parseInt(grid[i][j]))) {
        grid[i][j] -= 1
      }
    }
  }

  return grid
}

function plant(grid) {
  let rows = grid.length
  let cols = grid[0].length

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j] === '.') {
        grid[i][j] = 3
      }
    }
  }

  return grid
}

function detonate(grid) {
  let rows = grid.length
  let cols = grid[0].length

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (grid[i][j] === 0) {
        grid[i][j] = '.'

        if (i > 0 && grid[i - 1][j] !== 0) {
          grid[i - 1][j] = '.'
        }

        if (i < rows - 1 && grid[i + 1][j] !== 0) {
          grid[i + 1][j] = '.'
        }

        if (j > 0 && grid[i][j - 1] !== 0) {
          grid[i][j - 1] = '.'
        }

        if (j < cols - 1 && grid[i][j + 1] !== 0) {
          grid[i][j + 1] = '.'
        }

      }
    }
  }

  return grid
}

function output(grid) {
  let rows = grid.length

  let outputArr = []

  for (let i = 0; i < rows; i++) {
    outputArr.push(grid[i].join('').replace(/\d/g, 'O'))
  }

  return outputArr
}

function bomberMan(n, grid) {
  let rows = grid.length
  let cols = grid[0].length

  for (let i = 0; i < rows; i++) {
    grid[i] = grid[i].replace(/O/g, 2).split('')
  }

  if (n === 0 || n === 1) {
    return output(grid)
  }

  for (let seconds = 2; seconds < 4 + n % 4 + 1; seconds++) {
    grid = timerUpdate(grid)

    if (seconds % 2 === 0) {
      grid = plant(grid)
    } else {
      grid = detonate(grid)
    }

  }

  return output(grid)
}
function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const r = parseInt(firstMultipleInput[0], 10);

    const c = parseInt(firstMultipleInput[1], 10);

    const n = parseInt(firstMultipleInput[2], 10);

    let grid = [];

    for (let i = 0; i < r; i++) {
        const gridItem = readLine();
        grid.push(gridItem);
    }

    const result = bomberMan(n, grid);

    ws.write(result.join('\n') + '\n');

    ws.end();
}
