document.addEventListener("DOMContentLoaded", function () {
  const patriId = window.location.href.split("/").pop();

  fetch(`/patrimonios/${patriId}`, {
    method: "get",
  })
    .then((r) => r.json())
    .then((r) => {
      let { nome, alocado } = r.data;
      console.log({ nome, alocado });
      $("#patrimonioNome").val(nome);
    });

  $("#patrimonio-form").on("submit", function (e) {
    e.preventDefault();
    const nome = $("#patrimonioNome").val();

    const body = {
      nome,
    };

    if (validaFormulario(nome)) {
      fetch(`/patrimonios/${patriId}`, {
        method: "put",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((r) =>
        r.json().then((r) => {
          alert(r.message);
          if (r.ok) {
            window.location.href = "/patrimonios";
          }
        })
      );
    }
  });
});

const validaFormulario = (nome) => {
  return Boolean(nome);
};
