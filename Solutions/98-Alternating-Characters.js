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
 * Complete the 'alternatingCharacters' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts STRING s as parameter.
 */

const alternatingCharacters = (str) => {
  const alteredString = alternateString(str);

  return str.length - alteredString.length;
};

const alternateString = (str) =>
  [...str].reduce((altered, cur) =>
    altered.slice(-1) === cur ? altered : altered + cur
  );

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const q = parseInt(readLine().trim(), 10);

  for (let qItr = 0; qItr < q; qItr++) {
    const s = readLine();

    const result = alternatingCharacters(s);

    ws.write(result + "\n");
  }

  ws.end();
}
