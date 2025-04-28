import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import { getPreloadPath } from "./pathResolver.js";
import { getStaticData, pollResource } from "./resourceManagement.js";
import { ipcMainHandle, isDev } from "./util.js";

type test = string;

app.on("ready", () => {
    const mainWindow = new BrowserWindow({
        webPreferences: {
            preload: getPreloadPath(),
        },
    });
    if (isDev()) {
        mainWindow.loadURL("http://localhost:5123");
    } else {
        mainWindow.loadFile(path.join(app.getAppPath(), "/dist-react/index.html"));
    }

    pollResource(mainWindow);
    ipcMainHandle("getStaticData", () => {
        return getStaticData();
    });
});
