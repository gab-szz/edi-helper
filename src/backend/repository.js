import { conectar, desconectar } from "./config/oracle.js";

export async function buscarNumeroPedidoEDI(numeroPedido, arquivo) {
  const connection = await conectar();
  try {
    const result = await connection.execute(
      `SELECT numped FROM pcpedc WHERE numpedcli = :numpedcli and (obs1 like '%PEDIDO RECEBIDO VIA MERCADOR%' or obs2 like :arquivo)`,
      { numpedcli: numeroPedido, arquivo: `%${arquivo}%.txt` },
      // @ts-ignore
      { outFormat: connection.OUT_FORMAT_OBJECT }
    );

    console.log("Resultado da consulta:", result);

    return result.rows && result.rows.length > 0 ? result.rows[0] : null;
  } catch (error) {
    console.error("Erro ao buscar número do pedido EDI:", error);
    throw error;
  } finally {
    desconectar(connection);
  }
}
