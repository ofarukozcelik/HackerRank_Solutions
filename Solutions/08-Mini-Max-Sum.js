"use strict";

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
 * Complete the 'miniMaxSum' function below.
 *
 * The function accepts INTEGER_ARRAY arr as parameter.
 */

function miniMaxSum(arr) {
  // Write your code here
  arr.sort();
  const length = arr.length;
  let minSum = 0;
  let maxSum = 0;
  for (let i = 1; i < length; i++) {
    minSum += arr[i];
  }
  for (let i = 0; i < length - 1; i++) {
    maxSum += arr[i];
  }
  console.log(maxSum, minSum);
}

function main() {
  const arr = readLine()
    .replace(/\s+$/g, "")
    .split(" ")
    .map((arrTemp) => parseInt(arrTemp, 10));

  miniMaxSum(arr);
}
