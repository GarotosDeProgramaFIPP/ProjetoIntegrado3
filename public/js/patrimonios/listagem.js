let selectedIdToDelete = null;

document.addEventListener("DOMContentLoaded", function () {
  fetch("patrimonios/all", {
    method: "get",
  })
    .then((r) => r.json())
    .then((r) => {
      if (r.ok && r.data.length) {
        $("#loading-row").hide();
        r.data.forEach((patrimonio) => {
          $("#table-patrimonios-body").append(`
            <tr>
              <td class="text-start">
                <span>${patrimonio.nome}</span>
              </td>
              <td>
                <div class='d-flex justify-content-between'>
                  <span>${
                    patrimonio.alocado ? patrimonio.alocado : "Não alocado"
                  }</span>
                  <span>
                    <a href="/patrimonios/editar/${
                      patrimonio.id
                    }" class="btn btn-primary" style="font-size: 12px"><i class="fas fa-pen"></i></a>
                    <button class="btn btn-primary" onclick="openDeleteModal(${
                      patrimonio.id
                    })" style="font-size: 12px; background-color: red; border-color:red">
                      <i class="fas fa-trash"></i>
                    </button>
                  </span>
                </div>
              </td>
            </tr>
          `);
        });
      } else {
        $("#loading-row > td").text("Nenhum patrimonio encontrado");
      }
    });

  $("#confirm-delete-btn").on("click", function () {
    deletePatrimonio(selectedIdToDelete);
  });

  $(".close-modal").on("click", function () {
    $("#deleteWarning").modal("hide");
  });
});

function openDeleteModal(id) {
  selectedIdToDelete = id;
  $("#deleteWarning").modal("show");
}

function deletePatrimonio() {
  fetch(`patrimonios/${selectedIdToDelete}`, {
    method: "delete",
  })
    .then((r) => r.json())
    .then((r) => {
      alert(r.message);
      if (r.ok) {
        window.location.reload();
      }
    });
}
