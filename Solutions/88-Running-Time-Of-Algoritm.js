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
 * Complete the 'runningTime' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts INTEGER_ARRAY arr as parameter.
 */

function runningTime(arr) {
  // Write your code here
  let count = 0;

  for (let i = 0, itotal = arr.length - 1; i < itotal; i++) {
    if (arr[i] > arr[i + 1]) {
      let value = arr[i];

      arr[i] = arr[i + 1];
      arr[i + 1] = value;
      count++;
      i = -1;
    }
  }

  return count;
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const n = parseInt(readLine().trim(), 10);

  const arr = readLine()
    .replace(/\s+$/g, "")
    .split(" ")
    .map((arrTemp) => parseInt(arrTemp, 10));

  const result = runningTime(arr);

  ws.write(result + "\n");

  ws.end();
}
