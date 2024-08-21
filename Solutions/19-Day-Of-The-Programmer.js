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
 * Complete the 'dayOfProgrammer' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts INTEGER year as parameter.
 */

function dayOfProgrammer(year) {
  // Write your code here
  let isLeefYeer =
    year % 4 === 0
      ? year % 100 === 0
        ? year < 1918 || year % 400 === 0
          ? true
          : false
        : true
      : false;

  return `${year === 1918 ? 26 : isLeefYeer ? 12 : 13}.09.${year}`;
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const year = parseInt(readLine().trim(), 10);

  const result = dayOfProgrammer(year);

  ws.write(result + "\n");

  ws.end();
}
