import "dotenv/config";
import z from "zod";

const envSchema = z.object({
  NODE_ENV: z.string().min(5).max(50),
  CAMINHO_EDI: z.string().min(5).max(100),
  HOST_ORACLE: z.string().min(5).max(100),
  PORTA_ORACLE: z.coerce.number(),
  NOME_ORACLE: z.string().min(2).max(100),
  ORACLE_DIR: z.string().min(5).max(150),
  USUARIO_ORACLE: z.string().min(2).max(100),
  SENHA_ORACLE: z.string().min(5).max(100),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error("Variáveis de ambiente inválidas:", _env.error.format());
  throw new Error("Variáveis de Ambiente inválidas");
} else {
  console.log("Variáveis de ambiente validadas com sucesso.");
}

export const env = _env.data;
