document.addEventListener("DOMContentLoaded", function () {
  $("input").on("focus", function () {
    $(this).css("border-color", "#dee2e6");
    $("p", $(this).parent()).remove();
  });

  $("#patrimonio-form").on("submit", function (e) {
    e.preventDefault();
    $("p.text-danger").remove();
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
  if (!Boolean(nome)) {
    let inputElement = $("#patrimonioNome");
    inputElement.css("border-color", "red");
    inputElement
      .parent()
      .append(`<p class="text-danger">Campo obrigatório</p>`);
    return false;
  }
  return true;
};
