document.addEventListener("DOMContentLoaded", function () {
  $("#produto-form").on("submit", function (e) {
    e.preventDefault();
    const nome = $("#produtoNome").val();
    const valor = $("#produtoValor").val();
    const origemId = $("#produtoOrigem").val();
    const body = {
      nome,
      valor,
      origemId,
    };

    if (validaFormulario(nome, valor, origemId)) {
      fetch("/produtos", {
        method: "post",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((r) =>
        r.json().then((r) => {
          alert(r.message);
          if (r.ok) {
            window.location.href = "/produtos";
          }
        })
      );
    }
  });
});

const validaFormulario = (nome, valor, origemId) => {
  return nome && valor && origemId;
};
