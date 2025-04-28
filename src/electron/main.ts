import { app, BrowserWindow, ipcMain, Tray } from "electron";
import path from "path";
import { getAssetPath, getPreloadPath, getUIPath } from "./pathResolver.js";
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
        mainWindow.loadFile(getUIPath());
    }

    pollResource(mainWindow);
    ipcMainHandle("getStaticData", () => {
        return getStaticData();
    });

    new Tray(path.join(getAssetPath(), "trayIcon.png"));
});
