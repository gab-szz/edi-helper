import { app, BrowserWindow, ipcMain } from "electron";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { registerIpcHandlers } from "./backend/ipc.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Mantenha a referência da janela principal para que ela não seja coletada
let win;
const fixedWidth = 500;
const fixedHeight = 500;

// Criação da janela principal
const createWindow = () => {
  win = new BrowserWindow({
    width: fixedWidth,
    minWidth: fixedWidth,
    maxWidth: fixedWidth,
    height: fixedHeight,
    minHeight: fixedHeight,
    maxHeight: fixedHeight,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
    },
  });

  // win.setMenu(null);
  win.loadFile(path.join(__dirname, "view/index.html"));
};

// Quando o app estiver pronto
app.whenReady().then(() => {
  createWindow();
  registerIpcHandlers();
});

// Reabre a janela se todas estiverem fechadas (macOS)
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Fecha o app quando todas as janelas forem fechadas (exceto no macOS)
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// --- SOLUÇÃO DE RELOAD OTIMIZADA ---
// Função de debounce para evitar múltiplos recarregamentos rápidos
function debounce(func, timeout = 300) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

// O caminho para a pasta que queremos observar
const pathToWatch = path.join(__dirname, "view");

// A função que vai recarregar a janela
const reloadWindow = debounce(() => {
  console.log(`Recarregando a janela...`);
  if (win) {
    win.reload();
  }
}, 500); // 500ms de atraso para evitar múltiplos reloads

// Observar a pasta do projeto
const watcher = fs.watch(pathToWatch, (eventType, filename) => {
  if (filename) {
    const fileExtension = path.extname(filename).toLowerCase();
    // Recarregamos para qualquer mudança em arquivos .html, .css ou .js no diretório
    if ([".html", ".css", ".js"].includes(fileExtension)) {
      reloadWindow();
    }
  }
});

// Garante que o watcher seja fechado quando o app for fechado
app.on("before-quit", () => {
  watcher.close();
  console.log("Watcher de arquivos fechado.");
});
