import { ipcMain } from "electron";
import fs from "node:fs";
import { env } from "./env.js";
import { extrairDadosEDI } from "./neogrid_edi.js";

export function registerIpcHandlers() {
  ipcMain.handle("importar-arquivos", async (_event, caminho) => {
    console.log("Importando arquivos EDI de:", caminho);

    try {
      const arquivos = await fs.promises.readdir(caminho);

      const arquivosEDI = arquivos.filter((arquivo) =>
        arquivo.endsWith(".txt")
      );

      const listaPedidos = extrairDadosEDI(caminho, arquivosEDI);

      return listaPedidos;
    } catch (error) {
      console.error("Erro ao importar arquivos EDI:", error);
      throw new Error("Erro ao importar arquivos EDI.");
    }
  });
  // Outros handlers podem ser adicionados aqui
  ipcMain.handle("ping", () => "pong, pong");
  ipcMain.handle("caminho-edi", () => env.CAMINHO_EDI);
}

// import { env } from "./env.js";
// import { ipcMain } from "electron";
// import fs from "fs/promises"; // Use a versão com promises

// // O handler do IPC modificado
// export function registerIpcHandlers() {
//   ipcMain.handle("importar-arquivos", async (_event, caminho) => {
//     console.log("Importando arquivos EDI de:", caminho);

//     try {
//       const arquivos = await fs.readdir(caminho);
//       const arquivosEDI = arquivos.filter((arquivo) =>
//         arquivo.endsWith(".txt")
//       );

//       // 1. Cria um array de Promises para cada operação de leitura
//       const promessasDeLeitura = arquivosEDI.map((arquivo) => {
//         const caminhoCompleto = `${caminho}/${arquivo}`;
//         return extrairDadosEDI(caminhoCompleto).then((dados) => {
//           // Quando a Promise de um arquivo resolve, loga o resultado
//           if (dados) {
//             console.log(`Dados extraídos de ${arquivo}: ${dados}`);
//           }
//         });
//       });

//       // 2. Aguarda que TODAS as Promises sejam concluídas
//       await Promise.all(promessasDeLeitura);

//       console.log("Todas as leituras foram concluídas.");
//       return arquivosEDI;
//     } catch (error) {
//       console.error("Erro ao importar arquivos EDI:", error);
//       throw new Error("Erro ao importar arquivos EDI.");
//     }
//   });

//   // Outros handlers
//   ipcMain.handle("ping", () => "pong, pong");
//   ipcMain.handle("caminho-edi", () => env.CAMINHO_EDI);
// }
