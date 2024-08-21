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
 * Complete the 'viralAdvertising' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts INTEGER n as parameter.
 */

function viralAdvertising(n) {
  let shared = 5,
    like = 0,
    totalLikes = 0;
  for (let i = 1; i <= n; i++) {
    like = Math.floor(shared / 2);
    shared = like * 3;
    totalLikes += like;
  }
  return totalLikes;
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const n = parseInt(readLine().trim(), 10);

  const result = viralAdvertising(n);

  ws.write(result + "\n");

  ws.end();
}
