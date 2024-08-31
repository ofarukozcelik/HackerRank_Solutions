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
 * Complete the 'alternate' function below.
 *
 * The function is expected to return an INTEGER.
 * The function accepts STRING s as parameter.
 */

function alternate(s) {
  if (s.length === 1) {
    return 0;
  }

  let uniqueChar = [...new Set(Array.from(s))];
  // console.log("uniqueChar: ", uniqueChar);

  let sArr = Array.from(s);
  // console.log("sArr: ", sArr);

  // let validStrings = [];

  let longest = 0;

  for (var i = 0; i < uniqueChar.length; i++) {
    let el1 = uniqueChar[i];
    // console.log(el1);
    for (var j = 0; j < uniqueChar.length; j++) {
      let el2 = uniqueChar[j];
      // console.log(el2);

      let temp = sArr
        .filter((filteredEl) => {
          return filteredEl === el1 || filteredEl === el2;
        })
        .join("");

      // console.log("temp: ", temp);

      if (temp.indexOf(el1 + el1) === -1 && temp.indexOf(el2 + el2) === -1) {
        // console.log(temp);

        longest = Math.max(longest, temp.length);
      }

      // end of for loop j
    }

    // end of for Loop i
  }


  // console.log(longest);
  return longest;

 
}

let s1 = "beabeefeab";
alternate(s1);

function main() {
  const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

  const l = parseInt(readLine().trim(), 10);

  const s = readLine();

  const result = alternate(s);

  ws.write(result + "\n");

  ws.end();
}
