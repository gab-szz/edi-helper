import { ipcMain } from "electron";
import fs from "node:fs";
import { env } from "./config/env.js";
import { extrairDadosEDI } from "./neogrid_edi.js";
import { buscarNumeroPedidoEDI } from "./repository.js";

export function registerIpcHandlers() {
  ipcMain.handle("importar-arquivos", async (_event, caminho, incluirBak) => {
    console.log("Importando arquivos EDI de:", caminho);

    try {
      const arquivos = await fs.promises.readdir(caminho);

      let arquivosEDIExtrair = [];
      const arquivosEDI = arquivos.filter((arquivo) => {
        if (incluirBak) {
          return arquivo.endsWith(".BAK") || arquivo.endsWith(".txt");
        } else {
          return arquivo.endsWith(".txt");
        }
      });

      if (arquivosEDI.length === 0) {
        throw new Error("Nenhum arquivo EDI encontrado.");
      } else if (arquivosEDI.length > 100) {
        console.log("Consulta limitada a 100 elementos.");
        arquivosEDIExtrair = arquivosEDI.slice(0, 100);
      } else {
        arquivosEDIExtrair = arquivosEDI;
      }

      const listaPedidos = await extrairDadosEDI(caminho, arquivosEDIExtrair);

      // 2. Mapeia a lista de pedidos para um array de Promessas de consulta ao banco de dados
      console.log("Iniciando consulta de pedidos EDI...");
      if (listaPedidos.length === 0) {
        throw new Error("Nenhum arquivo encontrado pra consulta.");
      }

      const promessasDeConsulta = listaPedidos.map(async (pedido) => {
        const resultadoConsulta = await buscarNumeroPedidoEDI(
          pedido.numpedcli,
          pedido.arquivo
        );

        // 3. Anexa o numped do banco de dados ao objeto do pedido
        const numpedEncontrado = resultadoConsulta
          ? resultadoConsulta.NUMPED
          : null;

        return {
          ...pedido,
          numped: numpedEncontrado != "null" ? numpedEncontrado : null,
        };
      });

      // 4. Aguarda que todas as promessas de consulta sejam resolvidas em paralelo
      const listaPedidosComNumped = await Promise.all(promessasDeConsulta);

      console.log(
        "Lista de pedidos atualizada com os NUMPEDs:",
        listaPedidosComNumped
      );

      return listaPedidosComNumped;
    } catch (error) {
      console.error("Erro ao importar arquivos EDI:", error);
      throw new Error(error);
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
