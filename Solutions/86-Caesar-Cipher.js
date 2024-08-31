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
 * Complete the 'caesarCipher' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts following parameters:
 *  1. STRING s
 *  2. INTEGER k
 */

function caesarCipher(s, k) {
  const lowerA = "abcdefghijklmnopqrstuvwxyz";
  const upperA = lowerA.toUpperCase();

  const res = s.split("").map((c) => {
    if (lowerA.includes(c)) {
      return lowerA[(lowerA.indexOf(c) + k) % 26];
    } else if (upperA.includes(c)) {
      return upperA[(upperA.indexOf(c) + k) % 26];
    } else {
      return c;
    }
  });

  return res.join("");
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const n = parseInt(readLine().trim(), 10);

  const s = readLine();

  const k = parseInt(readLine().trim(), 10);

  const result = caesarCipher(s, k);

  ws.write(result + "\n");

  ws.end();
}
