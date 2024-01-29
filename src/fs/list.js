import { readdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const getPath = (url, ...path) =>
    join(dirname(fileURLToPath(url)), ...path);

const getFilesDirectory = getPath(import.meta.url, "files");

const list = async () => {
    try {
        const files = await readdir(getFilesDirectory).catch((error) => {
                throw new Error(ERROR_MESSAGE);
        });
        console.log(files);
    } catch (error) {
        console.log(error);
    }
};

await list();
