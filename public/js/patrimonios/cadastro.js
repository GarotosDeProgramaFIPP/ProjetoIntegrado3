document.addEventListener("DOMContentLoaded", function () {
  $("#patrimonio-form").on("submit", function (e) {
    e.preventDefault();
    const nome = $("#patrimonioNome").val();

    const body = {
      nome,
    };

    if (validaFormulario(nome)) {
      fetch("/patrimonios", {
        method: "post",
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
