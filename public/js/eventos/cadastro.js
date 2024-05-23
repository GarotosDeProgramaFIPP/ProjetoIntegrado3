document.addEventListener("DOMContentLoaded", function () {
  $("#evento-form").on("submit", function (e) {
    e.preventDefault();
    const nome = $("#eventoNome").val();
    const data = $("#eventoData").val();
    const statusId = $("#eventoStatusId").val();

    const body = {
      nome,
      data,
      statusId,
    };

    if (validaFormulario(nome, data, statusId)) {
      fetch("/eventos", {
        method: "post",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      }).then((r) =>
        r.json().then((r) => {
          alert(r.message);
          if (r.ok) {
            window.location.href = "/eventos";
          }
        })
      );
    }
  });
});

const validaFormulario = (nome, data, statusId) => {
  return nome && data && statusId;
};
