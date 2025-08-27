import fs from "fs";

// 8 27 - pedido comprador
// 28 47 - data hora do pedido

export async function processarArquivoEDI(caminho, arquivos) {
  console.log(`Processando arquivos EDI no caminho: ${caminho}`);

  for (const arquivo of arquivos) {
    console.log(`Processando arquivo: ${arquivo}`);

    const streamData = fs.createReadStream(`${caminho}/${arquivo}`, {
      start: 0,
      end: 7,
      encoding: "utf8",
    });
  }
}

// // Função que extrai dados específicos do arquivo.
// // Ela será chamada pelo handler do IPC.
// async function extrairDadosEDI(caminhoCompleto) {
//   let fileHandle;
//   try {
//     fileHandle = await fs.open(caminhoCompleto, "r");
//     const buffer = Buffer.alloc(8);
//     await fileHandle.read(buffer, 0, buffer.length, 0);
//     return buffer.toString("utf8").trim();
//   } catch (error) {
//     console.error(`Erro ao extrair dados de ${caminhoCompleto}:`, error);
//     return null;
//   } finally {
//     if (fileHandle) {
//       await fileHandle.close();
//     }
//   }
// }
