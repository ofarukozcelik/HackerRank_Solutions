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
 * Complete the 'funnyString' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts STRING s as parameter.
 */

function funnyString(s) {
  // Write your code here
  const values = new Array(s.length).fill(0).reduce((target, item, index) => {
    target.push(s.charCodeAt(index));

    return target;
  }, []);

  let count = values.length - 1;

  for (let i = 0, itotal = values.length - 1; i < itotal; i++) {
    let a = Math.abs(values[i] - values[i + 1]);
    let b = Math.abs(values[count - i] - values[count - i - 1]);

    if (a !== b) {
      return "Not Funny";
    }
  }

  return "Funny";
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const q = parseInt(readLine().trim(), 10);

  for (let qItr = 0; qItr < q; qItr++) {
    const s = readLine();

    const result = funnyString(s);

    ws.write(result + "\n");
  }

  ws.end();
}
