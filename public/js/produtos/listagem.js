document.addEventListener("DOMContentLoaded", function () {
  fetch("produtos/all", {
    method: "get",
  })
    .then((r) => r.json())
    .then((r) => {
      if (r.ok && r.data.length) {
        $("#loading-row").hide();
        r.data.forEach((produto) => {
          $("#table-products-body").append(`
            <tr>
              <td>${produto.nome}</td>
              <td>R$ ${produto.valor}</td>
              <td>
                <div class='d-flex justify-content-between'>
                  <span>${produto.origemId}</span>
                  <span>Ações</span>
                </div>
              </td>
            </tr>
          `);
        });
      } else {
        $("#loading-row").text("Nenhum produto encontrado");
      }
    });
});
