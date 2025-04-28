import { app, BrowserWindow, Menu, Tray } from "electron";
import path from "path";
import { getAssetPath } from "./pathResolver.js";

export function createTray(mainWindow: BrowserWindow) {
    const tray = new Tray(path.join(getAssetPath(), "trayIcon.png"));

    tray.setContextMenu(
        Menu.buildFromTemplate([
            {
                label: "Open",
                click: () => mainWindow.show(),
            },
            {
                label: "Quit the app",
                click: () => app.quit(),
            },
        ])
    );
}
