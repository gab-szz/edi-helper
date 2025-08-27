import fs from "fs/promises"; // Use a versão com promises
import { Buffer } from "buffer"; // É uma classe global, mas é boa prática importar para clareza

// 8 27 - pedido comprador
// 28 47 - data hora do pedido

export async function extrairDadosEDI(caminho, arquivos) {
  // 1. Cria um array de promessas
  const promessasDeLeitura = arquivos.map(async (arquivo) => {
    const caminhoCompleto = `${caminho}\\${arquivo}`;
    let fileHandle;

    try {
      fileHandle = await fs.open(caminhoCompleto, "r");
      const bufferNumpedcli = Buffer.alloc(20);
      const bufferDataHora = Buffer.alloc(9);

      // Lê os dados do arquivo
      await fileHandle.read(bufferNumpedcli, 0, bufferNumpedcli.length, 7);
      await fileHandle.read(bufferDataHora, 0, bufferDataHora.length, 47);

      const numpedcliExtraido = bufferNumpedcli.toString("utf8").trim();
      const datahoraExtraida = bufferDataHora.toString("utf8").trim();

      // Retorna o objeto com os dados para cada promessa
      return {
        arquivo: arquivo,
        numpedcli: numpedcliExtraido,
        datahora: datahoraExtraida,
      };
    } catch (error) {
      console.error(`Erro ao processar ${arquivo}:`, error);
      return null; // Retorna null em caso de erro
    } finally {
      if (fileHandle) {
        await fileHandle.close();
      }
    }
  });

  // 2. Aguarda todas as promessas serem concluídas em paralelo
  const resultados = await Promise.all(promessasDeLeitura);

  // Filtra os resultados para remover possíveis erros (nulls)
  const listaDePedidos = resultados.filter(Boolean);

  console.log("Processamento concluído.");
  return listaDePedidos;
}

//   let fileHandle;
//   fileHandle = await fs.open("{caminho}", "r");

//   // Aloca um buffer de 20 bytes (para a posição 8 a 27)
//   const buffer = Buffer.alloc(20);

//   // Lê os 20 bytes a partir da posição 7 do arquivo
//   // (índice 7 corresponde ao 8º caractere)
//   await fileHandle.read(buffer, 0, buffer.length, 7);

//   if (fileHandle) {
//     await fileHandle.close();
//   }

//   return buffer.toString("utf8").trim();
