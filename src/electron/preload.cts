import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electron", {
    subscribeStatistics: (callback) => {
        ipcRenderer.on("statistics", (_, stats) => {
            callback(stats);
        });
    },
    getStaticData: () => ipcRenderer.invoke("getStaticData"),
} satisfies Window["electron"]);
