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
 * Complete the 'timeConversion' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts STRING s as parameter.
 */

function timeConversion(s) {
  // Write your code here
  let s_arr = s.split(":");
  if (s.slice(-2, s.length) === "PM" && s.slice(0, 2) != "12") {
    let arr = s.split(":");
    arr[0] = String(Number(arr[0]) + 12);
    return arr.join(":").slice(0, -2);
  } else if (s.slice(-2, s.length) === "AM" && s_arr[0] == "12") {
    s_arr[0] = "00";
    return s_arr.join(":").slice(0, -2);
  } else {
    return s.slice(0, -2);
  }
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const s = readLine();

  const result = timeConversion(s);

  ws.write(result + "\n");

  ws.end();
}
