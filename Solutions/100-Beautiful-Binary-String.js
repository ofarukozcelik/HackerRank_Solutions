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

function main() {
  const n = parseInt(readLine().trim(), 10);
  const a = readLine().trim();

  let c = 0;
  let i = 0;

  while (i < a.length) {
    if (a[i] === "0" && a[i + 1] === "1" && a[i + 2] === "0") {
      c++;
      i += 3;
    } else {
      i++;
    }
  }

  console.log(c);
}
