document.addEventListener("DOMContentLoaded", function () {
  function fetchRelatorios() {
    fetch("relatorios/all", {
      method: "get",
    })
      .then((r) => r.json())
      .then((r) => {
        if (r.ok && r.data.length) {
          $("#loading-row").hide();
          $("#table-relatorios-body").empty();
          r.data.forEach((relatorio) => {
            $("#table-relatorios-body").append(`
            <tr>
              <td class="text-start">${relatorio.tipo}</td>
              <td class="text-start">${new Date(
                relatorio.dataEmissao
              ).toLocaleDateString("pt-BR", { timeZone: "UTC" })}</td>
              <td>
                <div class='d-flex justify-content-between'>
                  <span>${relatorio.filtros.replaceAll("&", " | ")}</span>
                  <span>
                  <button id="button-re-request" class="btn btn-primary" onclick="reRequest('${
                    relatorio.filtros
                  }', '${relatorio.tipo}')">
                    Emitir novamente
                  </button>
                  </span>
                </div>
              </td>
            </tr>
          `);
          });
        } else {
          $("#loading-row > td").text("Nenhum relatório encontrado");
        }
      });
  }

  $(this, "#button-re-request").on("click", fetchRelatorios);

  fetchRelatorios();

  fetch("relatorios/tipos", { method: "get" })
    .then((r) => r.json())
    .then((r) => {
      if (r.ok && r.data.length) {
        r.data.forEach((tipo) => {
          $("#relatorioTipoSelect").append(`
          <option value=${tipo.id}>${tipo.nome}</option>
        `);
        });
      }
    });

  fetch("eventos/all", { method: "get" })
    .then((r) => r.json())
    .then((r) => {
      if (r.ok && r.data.length) {
        r.data.forEach((evento) => {
          $("#filtroAlocamento").append(`
        <option value=${evento.id}>Alocados em ${evento.nome}</option>
      `);
        });
      }
    });

  fetch("eventos/possible-status", { method: "get" })
    .then((r) => r.json())
    .then((r) => {
      if (r.ok && r.data.length) {
        r.data.forEach((status) => {
          $("#filtroStatus").append(`
        <option value=${status.eventoStatusId}> ${status.eventoStatusDescricao}</option>
      `);
        });
      }
    });

  $("#relatorioTipoSelect").on("change", function () {
    const tipoId = $(this).val();
    if (tipoId === "1") {
      showEventFilters();
      return;
    }
    showPatrimonyFilters();
  });

  function showPatrimonyFilters() {
    $("#report-event-filters").removeClass("d-block");
    $("#report-event-filters").addClass("d-none");

    $("#report-patrimony-filters").removeClass("d-none");
    $("#report-patrimony-filters").addClass("d-block");
  }
  function showEventFilters() {
    $("#report-patrimony-filters").removeClass("d-block");
    $("#report-patrimony-filters").addClass("d-none");

    $("#report-event-filters").removeClass("d-none");
    $("#report-event-filters").addClass("d-block");
  }

  $("#button-emitir").on("click", function () {
    const relatorioTipoElement = $("#relatorioTipoSelect");
    const relatorioTipo = relatorioTipoElement.val();
    let filtros = "";

    if (relatorioTipo === "0") {
      relatorioTipoElement.css("border-color", "red");
      relatorioTipoElement
        .parent()
        .append(`<p class="text-danger">Campo obrigatório</p>`);
      return;
    }

    if (relatorioTipo === "1") {
      const dataDe = $("#filtroDataDe").val();
      const dataAte = $("#filtroDataAte").val();
      const status = $("#filtroStatus").val();

      filtros = new URLSearchParams({
        tipo: relatorioTipo,
        dataDe,
        dataAte,
        status,
      });
    } else {
      const alocamento = $("#filtroAlocamento").val();

      filtros = new URLSearchParams({
        tipo: relatorioTipo,
        alocamento,
      });
    }

    window.open("/relatorios/request?" + filtros, "_blank");

    fetchRelatorios();
  });

  $("#relatorioTipoSelect").on("focus", function () {
    $(this).css("border-color", "#dee2e6");
    $("p", $(this).parent()).remove();
  });
});

function reRequest(filtros, tipo) {
  window.open(
    `/relatorios/request?${filtros}&tipo=${tipo === "Eventos" ? "1" : "2"}`,
    "_blank"
  );
}
