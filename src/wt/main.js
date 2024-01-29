import { Worker } from "worker_threads";
import { cpus } from "os";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const getPath = (url, ...path) =>
    join(dirname(fileURLToPath(url)), ...path)

const worker = getPath(import.meta.url, "", "worker.js");

const workerPromise = (number, workerFilePath) =>
    new Promise((resolve, _) => {
        const worker = new Worker(workerFilePath, {
            workerData: number,
        });

        worker.on("message", (res) => resolve({ status: "success", data: res }));
        worker.on("error", () => resolve({ status: "error", data: null }));
    });

const performCalculations = async () => {
    const data = Array.from({ length: cpus().length }, (_, i) =>
        workerPromise(10 + i, worker)
    );
    const workers = await Promise.all(data);

    console.log(workers);
};

await performCalculations();
