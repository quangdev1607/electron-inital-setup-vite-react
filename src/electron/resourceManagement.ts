import fs from "fs";
import os from "os";
import osUtils from "os-utils";

const POLLING_INTERVAL = 1000;

export function pollResource() {
    setInterval(async () => {
        const cpuUsage = await getCpuUsage();
        const ramUsage = getRamUsage();
        const storageData = getStorageData();
        console.log({ cpuUsage, ramUsage, storageUsage: storageData });
    }, POLLING_INTERVAL);
}

export function getStaticData() {
    const totalStorage = getStorageData().total;
    const cpuModel = os.cpus()[0].model;
    const totalMemoryGB = Math.floor(osUtils.totalmem() / 1024);

    return {
        totalStorage,
        cpuModel,
        totalMemoryGB,
    };
}

function getCpuUsage() {
    return new Promise((resolve) => {
        osUtils.cpuUsage(resolve);
    });
}

function getRamUsage() {
    return 1 - osUtils.freememPercentage();
}

function getStorageData() {
    const stats = fs.statfsSync(process.platform === "win32" ? "C://" : "/");
    const totalBytes = stats.bsize * stats.blocks;
    const freeBytes = stats.bsize * stats.bfree;
    const usedBytes = totalBytes - freeBytes;

    const totalGB = totalBytes / 1_000_000_000;
    const usedGB = usedBytes / 1_000_000_000;
    const usagePercent = (usedBytes / totalBytes) * 100;

    return {
        total: totalGB.toFixed(2),
        used: usedGB.toFixed(2),
        usage: usagePercent.toFixed(1),
    };
}
