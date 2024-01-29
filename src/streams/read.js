import { createReadStream } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const getPath = (url, ...path) =>
    join(dirname(fileURLToPath(url)), ...path);

const getFilePath = getPath(import.meta.url, "files", "fileToRead.txt");

const read = async (file) => {
    const createdStream = createReadStream(file);
    createdStream.on("data", (chunk) => process.stdout.write(chunk));
};

await read(getFilePath);
