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
 * Complete the 'fairRations' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts INTEGER_ARRAY B as parameter.
 */

// Complete the fairRations function below.
function fairRations(B) {
  let count = new Array(B.length - 1).fill(0).reduce((target, item, index) => {
    !!(B[index] % 2) && (B[index + 1]++, (target += 2));

    return target;
  }, 0);

  return !(B[B.length - 1] % 2) ? count : "NO";
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const N = parseInt(readLine().trim(), 10);

  const B = readLine()
    .replace(/\s+$/g, "")
    .split(" ")
    .map((BTemp) => parseInt(BTemp, 10));

  const result = fairRations(B);

  ws.write(result + "\n");

  ws.end();
}
