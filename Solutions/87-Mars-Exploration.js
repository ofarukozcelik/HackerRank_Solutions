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
 * Complete the 'marsExploration' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts STRING s as parameter.
 */

function marsExploration(s) {
  const signal = "SOS";
  let count = 0;

  for (let i = 0, { length } = s; i < length; i += 3) {
    const focus = s.slice(i, i + 3);

    focus[0] !== signal[0] && (count += 1);
    focus[1] !== signal[1] && (count += 1);
    focus[2] !== signal[2] && (count += 1);
  }

  return count;
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const s = readLine();

  const result = marsExploration(s);

  ws.write(result + "\n");

  ws.end();
}
