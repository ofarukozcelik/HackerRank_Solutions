"use strict";

const fs = require("fs");

process.stdin.resume();
process.stdin.setEncoding("utf-8");

let inputString = "";
let currentLine = 0;

process.stdin.on("data", function (inputStdin) {
  inputString += inputStdin;
});

process.stdin.on("end", function () {
  inputString = inputString.split("\n");

  main();
});

function readLine() {
  return inputString[currentLine++];
}

/*
 * Complete the 'cavityMap' function below.
 *
 * The function is expected to return a STRING_ARRAY.
 * The function accepts STRING_ARRAY grid as parameter.
 */

function cavityMap(grid) {
  // Turn grid into a 2D array
  const twoDArr = grid.map((ele) => ele.split(""));

  // Loop through 2D array checking values against neighbours
  for (let i = 1; i < twoDArr.length - 1; i++) {
    for (let j = 1; j < twoDArr[i].length - 1; j++) {
      if (horizontalCheck(twoDArr, i, j) && verticalCheck(twoDArr, i, j)) {
        twoDArr[i][j] = "X";
      }
    }
  }
  const newGrid = twoDArr.map((ele) => ele.join(""));
  return newGrid;
}

// Check against horizontal values
function horizontalCheck(arr, column, row) {
  if (
    arr[column][row] > arr[column][row - 1] &&
    arr[column][row] > arr[column][row + 1]
  ) {
    return true;
  } else {
    return false;
  }
}

// Check against vertical values
function verticalCheck(arr, column, row) {
  if (
    arr[column][row] > arr[column - 1][row] &&
    arr[column][row] > arr[column + 1][row]
  ) {
    return true;
  } else {
    return false;
  }
}
function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const n = parseInt(readLine().trim(), 10);

  let grid = [];

  for (let i = 0; i < n; i++) {
    const gridItem = readLine();
    grid.push(gridItem);
  }

  const result = cavityMap(grid);

  ws.write(result.join("\n") + "\n");

  ws.end();
}
