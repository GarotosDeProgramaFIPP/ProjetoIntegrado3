document.addEventListener("DOMContentLoaded", function () {
  const prodId = window.location.href.split("/").pop();

  fetch(`/produtos/${prodId}`, {
    method: "get",
  })
    .then((r) => r.json())
    .then((r) => {
      let { nome, valor, origemId } = r.data;
      $("#produtoNome").val(nome);
      $("#produtoValor").val(valor);
      $("#produtoOrigem").val(origemId);
    });

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
      fetch(`/produtos/${prodId}`, {
        method: "put",
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
