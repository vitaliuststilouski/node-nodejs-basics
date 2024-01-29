import { unlink } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

export const getPath = (url, ...path) =>
    join(dirname(fileURLToPath(url)), ...path);

const getFilePath = getPath(import.meta.url, "files", "fileToRemove.txt");

const remove = async () => {
    try {
        await unlink(getFilePath)
    } catch (error) {
        throw new Error('FS operation failed')
    }
};

await remove();
