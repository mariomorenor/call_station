// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");
const isDevelopment = process.env.NODE_ENV === "development" ? true : false;
const {
  default: installExtension,
  VUEJS3_DEVTOOLS,
} = require("electron-devtools-installer");

const Store = require("electron-store");
const store = new Store();

const configuration = store.get("config");
if (!configuration) {
  store.set("config", {
    server: {
      host: "192.168.250.125",
      port: 3000,
    },
    client: {
      user: "Mario Moreno",
      department: "DTI Soporte Técnico",
    },
  });
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  if (isDevelopment) {
    mainWindow.loadURL("http://localhost:5173");
    installExtension(VUEJS3_DEVTOOLS);
    // Open the DevTools.
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(`${path.resolve(__dirname, "dist/index.html")}`);
  }
  return mainWindow;
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  const mainWindow = createWindow();

  app.on("activate", () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });

  ipcMain.handle("getData", async (event, data) => {
    return store.get(data.key);
  });

  ipcMain.handle("showDialog", async (event, data) => {
    return dialog.showMessageBox(mainWindow, {
      type: data.type,
      title: data.title,
      message: data.message,
      buttons: data.buttons,
      noLink: true
    });
  })

});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
