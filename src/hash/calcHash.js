import { createReadStream } from "node:fs";
import { createHash } from "node:crypto";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const getPath = (url, ...path) =>
    join(dirname(fileURLToPath(url)), ...path);

const getFilePath = getPath(
    import.meta.url,
    "files",
    "fileToCalculateHashFor.txt"
);

const calculateHash = async () => {
    const createdHash = createHash('sha256');
    const fileName =  createReadStream(getFilePath);
    fileName.on("data", (data) => createdHash.update(data));
    fileName.on("end", () => {
        const hex = createdHash.digest("hex");
        console.log(hex);
    });
};

await calculateHash();
