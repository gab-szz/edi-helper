// @ts-nocheck
window.api.ping().then((res) => console.log(res));

// Aguarda o documento HTML ser totalmente carregado
document.addEventListener("DOMContentLoaded", () => {
  const submitButton = document.querySelector(".submit-button");

  submitButton.addEventListener("click", () => {
    importarArquivosEDI();
  });
});

function importarArquivosEDI() {
  console.log("Importando arquivos EDI...");

  const caminho = document.querySelector(".src-file-input").value;

  if (caminho) {
    console.log("Diretório definido:", caminho);
  } else {
    alert("Nenhum diretório definido.");
  }

  window.api
    .importarArquivos(caminho)
    .then((resultado) => {
      console.log("Resultado da importação:", resultado);

      const tabelaArquivos = document.getElementById("table-data");

      resultado.forEach((element) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${element}</td>
        `;
        tabelaArquivos.appendChild(row);
      });
    })
    .catch((erro) => {
      console.error("Erro ao importar arquivos EDI:", erro);
      alert("Erro ao importar arquivos EDI: " + erro);
    });
}
