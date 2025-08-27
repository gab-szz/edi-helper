import { env } from "./env.js";
import oracledb from "oracledb";

oracledb.initOracleClient({ libDir: env.ORACLE_DIR });
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

export async function conectar() {
  return await oracledb.getConnection({
    user: env.NOME_ORACLE,
    password: env.SENHA_ORACLE,
    connectionString: `${env.HOST_ORACLE}:${env.PORTA_ORACLE}/${env.NOME_ORACLE}`,
  });
}

export async function desconectar(connection) {
  if (connection) {
    try {
      await connection.close();
    } catch (error) {
      console.error("Erro ao fechar a conexão:", error);
    }
  }
}
