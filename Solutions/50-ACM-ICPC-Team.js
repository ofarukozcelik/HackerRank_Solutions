'use strict';

const fs = require('fs');

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', function (inputStdin) {
    inputString += inputStdin;
});

process.stdin.on('end', function () {
    inputString = inputString.split('\n');

    main();
});

function readLine() {
    return inputString[currentLine++];
}

/*
 * Complete the 'acmTeam' function below.
 *
 * The function is expected to return an INTEGER_ARRAY.
 * The function accepts STRING_ARRAY topic as parameter.
 */

function acmTeam(topic) {
    let results = [];
    let range = topic.length - 1;

    for (let i of Array.from({ length: range }, (value, index) => index)) {
        results.push(
            ...Array.from(
                { length: range - i },
                (value, index) => index + 1 + i
            ).reduce((target, compare) => {
                target.push(
                    [...topic[i]].reduce((target, item, valueIndex) => {
                        (!!+item || !!+topic[compare][valueIndex]) && target++;

                        return target;
                    }, 0)
                );

                return target;
            }, [])
        );
    }

    return results
        .sort()
        .reverse()
        .reduce(
            (target, item, index) => {
                !index && (target[0] = item);

                target[0] == item && target[1]++;

                return target;
            },
            [0, 0]
        );
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const firstMultipleInput = readLine().replace(/\s+$/g, '').split(' ');

    const n = parseInt(firstMultipleInput[0], 10);

    const m = parseInt(firstMultipleInput[1], 10);

    let topic = [];

    for (let i = 0; i < n; i++) {
        const topicItem = readLine();
        topic.push(topicItem);
    }

    const result = acmTeam(topic);

    ws.write(result.join('\n') + '\n');

    ws.end();
}
