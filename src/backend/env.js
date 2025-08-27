import "dotenv/config";
import z from "zod";

const envSchema = z.object({
  CAMINHO_EDI: z.string().min(5).max(100),
  HOST_ORACLE: z.string().min(5).max(100),
  PORTA_ORACLE: z.string().min(5).max(100),
  NOME_ORACLE: z.string().min(5).max(100),
  ORACLE_DIR: z.string().min(5).max(150),
  USUARIO_ORACLE: z.string().min(5).max(100),
  SENHA_ORACLE: z.string().min(5).max(100),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error("Variáveis de ambiente inválidas:", _env.error.format());
  throw new Error("Variáveis de Ambiente inválidas");
}

export const env = _env.data;
