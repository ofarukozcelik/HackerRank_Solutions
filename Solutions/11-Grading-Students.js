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
 * Complete the 'gradingStudents' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts INTEGER_ARRAY grades as parameter.
 */

function gradingStudents(grades) {
  // Write your code here
  const multiples5 = new Set(
    Array(100 / 5)
      .fill(0)
      .map((_, i) => (i + 1) * 5)
  );

  grades = grades.map((grade) => {
    if (grade < 38) {
      return grade;
    }

    if (grade % 5 === 0) {
      return grade;
    }

    for (var i = 1; i <= 2; i++) {
      if (multiples5.has(grade + i)) {
        return grade + i;
      }
    }

    return grade;
  });

  return grades;
}

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const gradesCount = parseInt(readLine().trim(), 10);

  let grades = [];

  for (let i = 0; i < gradesCount; i++) {
    const gradesItem = parseInt(readLine().trim(), 10);
    grades.push(gradesItem);
  }

  const result = gradingStudents(grades);

  ws.write(result.join("\n") + "\n");

  ws.end();
}
