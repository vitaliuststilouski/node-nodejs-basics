import { spawn } from "child_process";

import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const getPath = (url, ...path) =>
    join(dirname(fileURLToPath(url)), ...path)

const getFilePath = getPath(import.meta.url, "files", "script.js");

const spawnChildProcess = async (arr) => {
    // Write your code here
    const childProcess = spawn("node", [getFilePath, ...arr]);
    process.stdin.pipe(childProcess.stdin);
    childProcess.stdout.pipe(process.stdout);
};

// Put your arguments in function call to test this functionality
spawnChildProcess(['a','b','c']);
