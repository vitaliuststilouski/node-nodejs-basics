import { sep, dirname } from "node:path";
import { release, version } from "node:os";
import { createServer } from "node:http";

import fileA from "./files/a.json" assert { type: "json" };
import fileB from "./files/b.json" assert { type: "json" };
import "./files/c.js";

const random = Math.random();

let unknownObject;

if (random > 0.5) {
    unknownObject = fileA;
} else {
    unknownObject = fileB;
}

console.log(`Release ${release()}`);
console.log(`Version ${version()}`);
console.log(`Path segment separator is "${sep}"`);

console.log(`Path to current file is ${import.meta.url}`);
console.log(
    `Path to current directory is ${dirname(new URL(import.meta.url).pathname)}`
);

const myServer = createServer((_, res) => {
    res.end("Request accepted");
});

const PORT = 3000;

console.log(unknownObject);

myServer.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
    console.log("To terminate it, use Ctrl+C combination");
});

export { unknownObject, myServer };
