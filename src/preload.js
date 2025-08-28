const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("api", {
  ping: () => ipcRenderer.invoke("ping"),
  caminhoEdi: () => ipcRenderer.invoke("caminho-edi"),
  importarArquivos: (caminho, incluirBak) =>
    ipcRenderer.invoke("importar-arquivos", caminho, incluirBak),
});
