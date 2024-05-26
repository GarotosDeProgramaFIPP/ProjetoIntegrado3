document.addEventListener("DOMContentLoaded", function () {
  fetch("relatorios/all", {
    method: "get",
  })
    .then((r) => r.json())
    .then((r) => {
      if (r.ok && r.data.length) {
        $("#loading-row").hide();
        r.data.forEach((relatorio) => {
          $("#table-relatorios-body").append(`
            <tr>
              <td class="text-start">${relatorio.tipo}</td>
              <td class="text-start">${new Date(
                relatorio.dataEmissao
              ).toLocaleDateString("pt-BR", { timeZone: "UTC" })}</td>
              <td>
                <div class='d-flex justify-content-between'>
                  <span>${relatorio.filtros}</span>
                </div>
              </td>
            </tr>
          `);
        });
      } else {
        $("#loading-row > td").text("Nenhum relatório encontrado");
      }
    });
});
