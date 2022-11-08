const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("ipcRenderer", {
  get: async (key) => {
    return await ipcRenderer.invoke("getData", {key});
  },
});
