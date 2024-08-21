'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function(inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function() {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the 'repeatedString' function below.
 *
 * The function is expected to return a LONG_INTEGER.
 * The function accepts following parameters:
 *  1. STRING s
 *  2. LONG_INTEGER n
 */

function repeatedString(s,n) {

    if(s.includes('a')) {
  
      const sTotal = Math.floor(n / s.length); // repeated string total 
      const aCount = s.match(/a/g).length; // 'a' character count in s
      let aTotalCount = sTotal * aCount; // total 'a' count of repeated string pattern within number limit
      const remainingChar = n % s.length;  // remaining characters after repeating string within number limit
      
     // if there are remaining characters, add them to the total 'a' count. 
      if(remainingChar !== 0 && s.substr(0,remainingChar).includes('a')) {
          aTotalCount += s.substr(0,remainingChar).match(/a/g).length;
      }
        
      aTotalCount = Math.floor(aTotalCount);
      return aTotalCount;
    } 
    return 0;
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const s = readLine();

    const n = parseInt(readLine().trim(), 10);

    const result = repeatedString(s, n);

    ws.write(result + '\n');

    ws.end();
}
