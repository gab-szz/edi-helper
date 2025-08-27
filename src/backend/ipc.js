import { ipcMain } from "electron";
import fs from "node:fs";

export function registerIpcHandlers() {
  ipcMain.handle("importar-arquivos", async (event, caminho) => {
    console.log("Importando arquivos EDI de:", caminho);

    try {
      const arquivos = await fs.promises.readdir(caminho);
      console.log("Arquivos encontrados:", arquivos);

      const arquivosEDI = arquivos.filter((arquivo) =>
        arquivo.endsWith(".txt")
      );
      console.log("Arquivos EDI encontrados:", arquivosEDI);
      return arquivosEDI;
    } catch (error) {
      console.error("Erro ao importar arquivos EDI:", error);
      throw new Error("Erro ao importar arquivos EDI.");
    }
  });
  // Outros handlers podem ser adicionados aqui
  ipcMain.handle("ping", () => "pong, pong");
}
