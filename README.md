# Electron Base App

Aplicação base criada com [Electron.js](https://www.electronjs.org/) para desktop, com foco em simplicidade, segurança e organização. Ideal como ponto de partida para novos projetos.

---

## 🚀 Funcionalidades

- Estrutura mínima e bem definida

---

## 📁 Estrutura

- `main.js`: Cria a janela e responde a eventos IPC
- `preload.js`: Expõe APIs seguras para o renderer
- `renderer.js`: Lado cliente, executa chamadas para o backend
- `index.html`: Interface base
- `globals.d.ts`: Tipagem para a API do `window`

---

## 🛠️ Como rodar

```bash
git clone https://github.com/gab-szz/electron-base-app.git
cd electron-base-app/app
npm install
npm run dev
```

---

## 📚 Referências

- [Electron Documentation](https://www.electronjs.org/docs)
- [Electron Security Guide](https://www.electronjs.org/docs/latest/tutorial/security)

---

## 👤 Autor

Gabriel Santos — [@gab-szz](https://github.com/gab-szz)

---

> Simples, segura e direta. Use esta base como fundação para seus projetos Electron.
