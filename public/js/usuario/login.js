document.addEventListener("DOMContentLoaded", function () {
  $("input").on("focus", function () {
    $(this).css("border-color", "#dee2e6");
    $("#error-message").css("display", "none");
  });

  $("#login-button").on("click", function () {
    let email = $("#email-input").val();
    let senha = $("#senha-input").val();
    let tipo = $('input[name="tipo-radio"]:checked').val();

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
          } else {
            $("#error-message").css("display", "flex");
            $("#error-message").text(r.message);
          }
        });
    }
  });
});

function validaCampos(email, senha, tipo) {
  let inputsComErro = [];
  if (!email || !(email.includes("@") && email.includes("."))) {
    inputsComErro.push("#email-input");
  }
  if (!senha) {
    inputsComErro.push("#senha-input");
  }

  if (inputsComErro.length) {
    inputsComErro.forEach((input) => {
      $(input).css("border-color", "red");
    });
    $("#error-message").css("display", "flex");
    $("#error-message").text("Preencha os campos corretamente!");
    return false;
  }
  return true;
}
