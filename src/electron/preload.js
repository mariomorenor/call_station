const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("ipcRenderer", {
  get: async (key) => {
    return await ipcRenderer.invoke("getData", {key});
  },
});

contextBridge.exposeInMainWorld("dialog",{
  Show: async (type,title,message,buttons)=>{
    return await ipcRenderer.invoke("showDialog",{type,title,message,buttons})
  }
})
