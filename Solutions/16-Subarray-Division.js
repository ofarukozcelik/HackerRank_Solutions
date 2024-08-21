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
 * Complete the 'birthday' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts following parameters:
 *  1. INTEGER_ARRAY s
 *  2. INTEGER d
 *  3. INTEGER m
 */

function birthday(s, d, m) {
  // Write your code here
  var countIfSumEquareTo_d = 0;

  if (m === s.length && s[0] === d) {
    countIfSumEquareTo_d++;
  }

  for (var i = 0; i < s.length - 1; i++) {
    console.log("Round of i : " + i);
    console.log("Start With : " + s[i]);
    var sumOfEach = 0;
    for (var j = i; j < m + i; j++) {
      console.log("Round of j : " + j);
      console.log("s[j] : " + s[j]);
      sumOfEach += s[j];
    }
    if (sumOfEach === d) {
      countIfSumEquareTo_d++;
    }
  }
  return countIfSumEquareTo_d;
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const n = parseInt(readLine().trim(), 10);

  const s = readLine()
    .replace(/\s+$/g, "")
    .split(" ")
    .map((sTemp) => parseInt(sTemp, 10));

  const firstMultipleInput = readLine().replace(/\s+$/g, "").split(" ");

  const d = parseInt(firstMultipleInput[0], 10);

  const m = parseInt(firstMultipleInput[1], 10);

  const result = birthday(s, d, m);

  ws.write(result + "\n");

  ws.end();
}
