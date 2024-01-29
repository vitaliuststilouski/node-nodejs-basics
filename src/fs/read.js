import { readFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const getPath = (url, ...path) =>
    join(dirname(fileURLToPath(url)), ...path);

const getFilePath = getPath(import.meta.url, "files", "fileToRead.txt");

const read = async () => {
    // Write your code here
    try {
        const readTXT = await readFile(
            getFilePath,
            "utf-8"
        ).catch((error) => {
                throw new Error('FS operation failed');
        });
        console.log(readTXT);
    } catch (error) {
        console.log(error);
    }
};

await read();
