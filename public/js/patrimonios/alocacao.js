document.addEventListener("DOMContentLoaded", function () {
  $("#patrimonio-form").on("submit", function (e) {
    e.preventDefault();
    const patrimonio = $("#patrimonioSelect").val();
    const evento = $("#eventoSelect").val();

    const body = {
      patrimonio,
      evento,
    };

    if (validaFormulario(nome)) {
      fetch(`/patrimonios/alocar`, {
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

const validaFormulario = (patrimonio, evento) => {
  return patrimonio && evento;
};
