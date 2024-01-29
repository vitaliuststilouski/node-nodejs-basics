import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { rename as fsRename } from "node:fs/promises";
import { access, constants } from 'node:fs/promises';

const getPath = (url, ...path) =>
    join(dirname(fileURLToPath(url)), ...path);

const fileTXT = getPath(
    import.meta.url,
    "files",
    "wrongFilename.txt"
);
const fileMD = getPath(
    import.meta.url,
    "files",
    "properFilename.md"
);

const isTrue = async (path) => {
    try {
        await access(path, constants.R_OK | constants.W_OK);
        return true;
    } catch {
        return false;
    }
}

const rename = async () => {

    // Write your code here
    const isTrueFileTXT = await isTrue(fileTXT);
    const isTrueFileMD = await isTrue(fileMD);

    try {
        if (isTrueFileTXT && !isTrueFileMD) {
            await fsRename(fileTXT, fileMD);
        } else {
            throw new Error('FS operation failed');
        }
    } catch (error) {
        console.log(error);
    }
};

await rename();
