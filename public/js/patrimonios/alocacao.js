document.addEventListener("DOMContentLoaded", function () {
  $("select").on("focus", function () {
    $(this).css("border-color", "#dee2e6");
    $("p", $(this).parent()).remove();
  });

  $("#patrimonio-form").on("submit", function (e) {
    e.preventDefault();
    $("p.text-danger").remove();
    const patrimonio = $("#patrimonioSelect").val();
    const evento = $("#eventoSelect").val();

    const body = {
      patrimonio,
      evento,
    };

    if (validaFormulario(patrimonio, evento)) {
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

  const validaFormulario = (patrimonio, evento) => {
    let inputsComErro = [];

    if (patrimonio === "0") {
      inputsComErro.push({
        selector: "#patrimonioSelect",
        errorMessage: "Campo obrigatório",
      });
    }

    if (evento === "0") {
      inputsComErro.push({
        selector: "#eventoSelect",
        errorMessage: "Campo obrigatório",
      });
    }

    if (inputsComErro.length) {
      inputsComErro.forEach((input) => {
        let inputElement = $(input.selector);
        inputElement.css("border-color", "red");
        inputElement
          .parent()
          .append(`<p class="text-danger">${input.errorMessage}</p>`);
      });
      return false;
    }
    return true;
  };
});
