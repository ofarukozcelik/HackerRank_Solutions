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
  const frequencies = new Array(100).fill(0);
  const order = new Map();
  const output = [];

  for (let i = 0; i < n; i++) {
    const [num, str] = readLine().trim().split(" ");
    const numInt = parseInt(num, 10);

    let s = i < n / 2 ? "-" : str;

    if (!order.has(numInt)) {
      order.set(numInt, []);
    }
    order.get(numInt).push(s);

    frequencies[numInt] += 1;
  }

  // Print the result
  for (let i = 0; i < frequencies.length; i++) {
    const queue = order.get(i);
    if (queue) {
      for (let j = 0; j < frequencies[i]; j++) {
        output.push(queue.shift());
      }
    }
  }

  console.log(output.join(" "));
}
