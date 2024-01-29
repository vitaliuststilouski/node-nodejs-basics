import { createReadStream, createWriteStream } from "node:fs";
import { pipeline } from "node:stream/promises";
import { createGzip } from "node:zlib";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { access, constants } from "node:fs/promises";

export const isTrue = async (path) => {
    try {
        await access(path, constants.F_OK);
        return true;
    } catch (error) {
        return false;
    }
};

const getPath = (url, ...path) =>
    join(dirname(fileURLToPath(url)), ...path);

const INPUT_FILE = getPath(
    import.meta.url,
    "files",
    "fileToCompress.txt"
);
const getFilePath = getPath(import.meta.url, "files", "archive.gz");

const compress = async (path, zipPath) => {
    console.log(path);
    console.log(zipPath);
    const zipPathCheck = await isTrue(zipPath);
    const pathCheck = await isTrue(path);

    if (!pathCheck || zipPathCheck) {
        throw new Error('FS operation failed');
    }
    console.log('dsds')

    const streamOrigin = createReadStream(path);
    const streamWrite = createWriteStream(zipPath);
    const streamZip = createGzip();

    await pipeline(streamOrigin, streamZip, streamWrite);
};

await compress(INPUT_FILE, getFilePath);
