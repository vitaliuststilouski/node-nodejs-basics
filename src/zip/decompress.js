import { createGunzip } from "node:zlib";
import { createReadStream, createWriteStream } from "node:fs";
import { pipeline } from "node:stream/promises";
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
const GZ_FILE = getPath(import.meta.url, "files", "archive.gz");

const decompress = async (inputFile, outputFile) => {
    const isExistFile = await isTrue(inputFile);

    if (!isExistFile) {
        throw new Error('FS operation failed');
    }

    const streamOrigin = createReadStream(inputFile);
    const streamWrite = createWriteStream(outputFile);
    const streamGunZip = createGunzip();

    await pipeline(streamOrigin, streamGunZip, streamWrite);
};

await decompress(GZ_FILE, INPUT_FILE);
