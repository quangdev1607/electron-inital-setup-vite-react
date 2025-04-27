import { contextBridge } from "electron";

contextBridge.exposeInMainWorld("electron", {
    subscribeStatistics: (callback: (statistics: any) => void) => callback({}),
    getStaticData: () => console.log("static"),
});
