import { conectar, desconectar } from "./config/oracle";

export async function buscarNumeroPedidoEDI(numeroPedido) {
  const connection = await conectar();
  try {
    const result = await connection.execute(
      `SELECT numped FROM PCFORNEC WHERE numpedcli = :numpedcli`,
      { numpedcli: numeroPedido },
      { outFormat: connection.OUT_FORMAT_OBJECT }
    );

    return result.rows && result.rows.length > 0 ? result.rows[0] : null;
  } catch (error) {
    console.error("Erro ao buscar número do pedido EDI:", error);
    throw error;
  } finally {
    desconectar(connection);
  }
}
