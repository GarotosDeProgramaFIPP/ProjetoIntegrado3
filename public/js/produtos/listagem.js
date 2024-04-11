let selectedIdToDelete = null;

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
              <td class="text-start">${produto.nome}</td>
              <td class="text-start">R$ ${produto.valor}</td>
              <td>
                <div class='d-flex justify-content-between'>
                  <span>${produto.origemId}</span>
                  <span>
                    <a href="/produtos/editar/${produto.id}" class="btn btn-primary" style="font-size: 12px"><i class="fas fa-pen"></i></a>
                    <button class="btn btn-primary" onclick="selectIdToDelete(${produto.id})" data-toggle="modal" data-target="#deleteWarning" style="font-size: 12px; background-color: red; border-color:red">
                      <i class="fas fa-trash"></i>
                    </button>
                  </span>
                </div>
              </td>
            </tr>
          `);
        });
      } else {
        $("#loading-row > td").text("Nenhum produto encontrado");
      }
    });
});

const selectIdToDelete = (id) => {
  selectIdToDelete = id;
};

const deleteProduto = () => {
  fetch(`produtos/${selectedIdToDelete}`, {
    method: "delete",
  });
};
