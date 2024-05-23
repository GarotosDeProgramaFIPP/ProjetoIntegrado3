document.addEventListener("DOMContentLoaded", function () {
  $("#login-button").on("click", function () {
    console.log("chamou");

    let email = $("#email-input").val();
    let senha = $("#senha-input").val();
    let tipo = $('input[name="tipo-radio"]:checked').val();

    console.log({ email, senha, tipo });

    const payload = { email, senha, tipo };

    if (validaCampos(email, senha, tipo)) {
      fetch("/login", {
        method: "post",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      })
        .then((r) => r.json())
        .then((r) => {
          if (r.ok) {
            window.location.href = "/";
          }
        });
    }
  });
});

function validaCampos(email, senha, tipo) {
  return email && senha && tipo;
}
