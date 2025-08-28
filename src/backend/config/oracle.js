import { env } from "./env.js";
import oracledb from "oracledb";

oracledb.initOracleClient({ libDir: env.ORACLE_DIR });
oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

export async function conectar() {
  return await oracledb.getConnection({
    user: env.USUARIO_BD,
    password: env.SENHA_BD,
    connectionString: `${env.HOST_BD}:${env.PORTA_BD}/${env.NOME_BD}`,
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
