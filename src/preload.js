const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  ping: () => ipcRenderer.invoke("ping"),
  importarArquivos: (caminho) =>
    ipcRenderer.invoke("importar-arquivos", caminho),
});
