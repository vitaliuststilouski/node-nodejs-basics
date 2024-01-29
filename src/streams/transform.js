import { Transform } from "node:stream";

const revertSymbols = new Transform({
    transform(chunk, _, callback) {
        callback(null, String(chunk).split("").reverse().join(""));
    },
});

const transform = async () => {
    process.stdin.pipe(revertSymbols).pipe(process.stdout);
};

await transform();
