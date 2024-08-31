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
 * Complete the 'weightedUniformStrings' function below.
 *
 * The function is expected to return a STRING_ARRAY.
 * The function accepts following parameters:
 *  1. STRING s
 *  2. INTEGER_ARRAY queries
 */

function weightedUniformStrings(s, queries) {
  const count = (string) =>
    string.split("").reduce((acc, letter, index) => {
      if (!acc[letter]) {
        acc[letter] = [1];
      } else {
        if (string[index - 1] && string[index - 1] === letter) {
          acc[letter][acc[letter].length - 1] += 1;
        } else {
          acc[letter].push(1);
        }
      }
      return acc;
    }, {});

  const letterCounts = count(s);
  return queries.map((query) => {
    for (let i = 1; i <= 26; i++) {
      if (Number.isInteger(query / i)) {
        const countsArray = letterCounts[String.fromCharCode(96 + i)];
        if (countsArray && countsArray.find((a) => a >= query / i)) {
          return "Yes";
          break;
        }
      }
    }
    return "No";
  });
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const s = readLine();

  const queriesCount = parseInt(readLine().trim(), 10);

  let queries = [];

  for (let i = 0; i < queriesCount; i++) {
    const queriesItem = parseInt(readLine().trim(), 10);
    queries.push(queriesItem);
  }

  const result = weightedUniformStrings(s, queries);

  ws.write(result.join("\n") + "\n");

  ws.end();
}
