import { createWriteStream } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const getPath = (url, ...path) =>
    join(dirname(fileURLToPath(url)), ...path);

const getFilePath = getPath(import.meta.url, "files", "fileToWrite.txt");

const write = async (fileType) => {
    const streamOrigin = createWriteStream(fileType);
    process.stdin.on("data", (chunk) => streamOrigin.write(chunk));
};

await write(getFilePath);
