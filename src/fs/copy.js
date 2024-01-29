import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { cp, access, constants } from "node:fs/promises";

const getPath = (url, ...path) =>
    join(dirname(fileURLToPath(url)), ...path);

const isTrue = async (path) => {
    try {
        await access(path, constants.F_OK);
        return true;
    } catch (error) {
        return false;
    }
};

const copy = async () => {
    const FILE_ORIGINAL = getPath(import.meta.url, "files");
    const FILE_COPY = getPath(import.meta.url, "files_copy");

    if (await isTrue(FILE_ORIGINAL) && await isTrue(FILE_COPY)) {
        throw  new Error('FS operation file');
    }

    try{
        await cp('src/fs/files', 'src/fs/files_copy', { recursive: true })

    } catch (err) {
        console.log(err)
    }
};

await copy();
