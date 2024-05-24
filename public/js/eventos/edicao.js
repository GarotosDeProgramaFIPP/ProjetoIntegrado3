document.addEventListener("DOMContentLoaded", function () {
  const evenId = window.location.href.split("/").pop();

  $("input, select").on("focus", function () {
    $(this).css("border-color", "#dee2e6");
    $("p", $(this).parent()).remove();
  });

  fetch(`/eventos/${evenId}`, {
    method: "get",
  })
    .then((r) => r.json())
    .then((r) => {
      let { nome, data, statusId } = r.data;
      const formatedData = new Date(data).toISOString().split("T")[0];
      $("#eventoNome").val(nome);
      $("#eventoData").val(formatedData);
      $("#eventoStatusId").val(statusId);
    });

  $("#evento-form").on("submit", function (e) {
    e.preventDefault();
    $("p.text-danger").remove();
    const nome = $("#eventoNome").val();
    const data = $("#eventoData").val();
    const statusId = $("#eventoStatusId").val();

    const body = {
      nome,
      data,
      statusId,
    };

    if (validaFormulario(nome, data, statusId)) {
      fetch(`/eventos/${evenId}`, {
        method: "put",
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
  let inputsComErro = [];

  if (!nome) {
    inputsComErro.push({
      selector: "#eventoNome",
      errorMessage: "Campo obrigatório",
    });
  }
  if (!validaData(data)) {
    inputsComErro.push({
      selector: "#eventoData",
      errorMessage: data
        ? "A data selecionada deve ser maior que a atual"
        : "Campo obrigatório",
    });
  }
  if (statusId === "0") {
    inputsComErro.push({
      selector: "#eventoStatusId",
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

const validaData = (data) => {
  if (!data) return false;

  const dataSplited = data.split("-");
  const { year, month, day } = {
    year: parseInt(dataSplited[0], 10),
    month: parseInt(dataSplited[1], 10),
    day: parseInt(dataSplited[2], 10),
  };
  const dataAtual = new Date();
  dataAtual.setHours(0, 0, 0, 0);
  const dataInput = new Date(year, month - 1, day, 0, 0, 0, 0);

  return dataInput >= dataAtual;
};
