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
 * Complete the 'gridSearch' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts following parameters:
 *  1. STRING_ARRAY G
 *  2. STRING_ARRAY P
 */

function gridSearch(G, P) {
  // Write your code here
  const n = G.length;
  const m = P.length;
  for (let i = 0; i <= n - m; i++) {
    // loop row
    for (let j = 0; j <= G[i].length - P[0].length; j++) {
      // loop P
      let check = true;

      for (let k = 0; k < m; k++) {
        if (G[i + k].substring(j, P[0].length + j) !== P[k]) {
          check = false;
          break;
        }
      }
      if (check) {
        return "YES";
      }
    }
  }
  return "NO";
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const t = parseInt(readLine().trim(), 10);

  for (let tItr = 0; tItr < t; tItr++) {
    const firstMultipleInput = readLine().replace(/\s+$/g, "").split(" ");

    const R = parseInt(firstMultipleInput[0], 10);

    const C = parseInt(firstMultipleInput[1], 10);

    let G = [];

    for (let i = 0; i < R; i++) {
      const GItem = readLine();
      G.push(GItem);
    }

    const secondMultipleInput = readLine().replace(/\s+$/g, "").split(" ");

    const r = parseInt(secondMultipleInput[0], 10);

    const c = parseInt(secondMultipleInput[1], 10);

    let P = [];

    for (let i = 0; i < r; i++) {
      const PItem = readLine();
      P.push(PItem);
    }

    const result = gridSearch(G, P);

    ws.write(result + "\n");
  }

  ws.end();
}
