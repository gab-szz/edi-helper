// @ts-nocheck
window.api.ping().then((res) => console.log(res));

// Aguarda o documento HTML ser totalmente carregado
document.addEventListener("DOMContentLoaded", () => {
  window.api.caminhoEdi().then((caminho) => {
    document.querySelector(".src-file-input").value = caminho;
  });

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
      const tbody = document.querySelector(".table-body");
      tbody.innerHTML = "";

      resultado.forEach((element) => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${element}</td>
        `;
        tbody.appendChild(row);
      });
    })
    .catch((erro) => {
      console.error("Erro ao importar arquivos EDI:", erro);
      alert("Erro ao importar arquivos EDI: " + erro);
    });
}
