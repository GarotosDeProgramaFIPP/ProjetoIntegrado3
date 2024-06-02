document.addEventListener("DOMContentLoaded", function () {
  $("input").on("focus", function () {
    $(this).css("border-color", "#dee2e6");
    $("#error-message").css("display", "none");
  });

  $("#cadastrar-button").on("click", function () {
    let nome = $("#nome-input").val();
    let email = $("#email-input").val();
    let senha = $("#senha-input").val();
    let telefone = $("#telefone-input").val();
    let endereco = $("#endereco-input").val();
    let documento = $("#documento-input").val();
    let tipo = $('input[name="tipo-radio"]:checked').val();

    if (validaCampos(nome, email, senha, telefone, endereco, documento, tipo)) {
      const payload = {
        nome,
        email,
        senha,
        telefone,
        endereco,
        documento,
        administrador: true,
        voluntario: true,
        tipo,
      };

      fetch("/cadastro", {
        method: "post",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload),
      })
        .then((r) => r.json())
        .then((r) => {
          if (r.ok) {
            alert(r.message);
            window.location.href = "/login";
          } else {
            $("#error-message").css("display", "flex");
            $("#error-message").text(r.message);
          }
        });
    }
  });
});

function validaCampos(nome, email, senha, telefone, endereco, documento, tipo) {
  let inputsComErro = [];
  if (!nome) {
    inputsComErro.push("#nome-input");
  }
  if (!email || !(email.includes("@") && email.includes("."))) {
    inputsComErro.push("#email-input");
  }
  if (!senha) {
    inputsComErro.push("#senha-input");
  }
  if (!telefone) {
    inputsComErro.push("#telefone-input");
  }
  if (!endereco) {
    inputsComErro.push("#endereco-input");
  }
  if (!documento) {
    inputsComErro.push("#documento-input");
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
