import { ipcMain } from "electron";
import fs from "node:fs";
import { env } from "./env.js";

export function registerIpcHandlers() {
  ipcMain.handle("importar-arquivos", async (_event, caminho) => {
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
  ipcMain.handle("caminho-edi", () => env.CAMINHO_EDI);
}
