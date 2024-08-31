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
 * Complete the 'introTutorial' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER V
 *  2. INTEGER_ARRAY arr
 */

function introTutorial(V, arr) {
  // Loop through the array to find the index of the value V
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === V) {
      return i;
    }
  }
  return -1; // Return -1 if the value is not found, though the problem guarantees that V will be in arr
}

// Example usage:
const V = 4;
const arr = [1, 4, 5, 7, 9, 12];
console.log(introTutorial(V, arr)); // Expected output: 1

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const V = parseInt(readLine().trim(), 10);

  const n = parseInt(readLine().trim(), 10);

  const arr = readLine()
    .replace(/\s+$/g, "")
    .split(" ")
    .map((arrTemp) => parseInt(arrTemp, 10));

  const result = introTutorial(V, arr);

  ws.write(result + "\n");

  ws.end();
}
