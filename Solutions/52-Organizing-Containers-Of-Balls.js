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
 * Complete the 'organizingContainers' function below.
 *
 * The function is expected to return a STRING.
 * The function accepts 2D_INTEGER_ARRAY container as parameter.
 */

function organizingContainers(container) {
    let result = true;

    let { row, col } = container.reduce(
        (target, items, index) => {
            items.reduce((itemTarget, item, subIndex) => {
                target["row"][index] += item;
                target["col"][subIndex] += item;

                return itemTarget;
            }, []);

            return target;
        },
        {
            row: new Array(container.length).fill(0),
            col: new Array(container.length).fill(0)
        }
    );

    row.sort();
    col.sort();

    for (let value of Array.from(
        { length: container.length },
        (value, index) => index
    )) {
        if (row[value] !== col[value]) {
            result = false;
            break;
        }
    }

    return result ? "Possible" : "Impossible";
}

function main() {
    const ws = fs.createWriteStream(process.env.OUTPUT_PATH);

    const q = parseInt(readLine().trim(), 10);

    for (let qItr = 0; qItr < q; qItr++) {
        const n = parseInt(readLine().trim(), 10);

        let container = Array(n);

        for (let i = 0; i < n; i++) {
            container[i] = readLine().replace(/\s+$/g, '').split(' ').map(containerTemp => parseInt(containerTemp, 10));
        }

        const result = organizingContainers(container);

        ws.write(result + '\n');
    }

    ws.end();
}
