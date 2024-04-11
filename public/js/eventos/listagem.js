let selectedIdToDelete = null;

document.addEventListener("DOMContentLoaded", function () {
  fetch("eventos/all", {
    method: "get",
  })
    .then((r) => r.json())
    .then((r) => {
      if (r.ok && r.data.length) {
        $("#loading-row").hide();
        r.data.forEach((evento) => {
          $("#table-eventos-body").append(`
            <tr>
              <td class="text-start">${evento.nome}</td>
              <td class="text-start">${new Date(evento.data).toLocaleDateString(
                "pt-BR",
                { timeZone: "UTC" }
              )}</td>
              <td class="text-start">${evento.statusId}</td>
              <td>
                <div class='d-flex justify-content-between'>
                  <span>${evento.usuarioId}</span>
                  <span>
                    <a href="/eventos/editar/${
                      evento.id
                    }" class="btn btn-primary" style="font-size: 12px"><i class="fas fa-pen"></i></a>
                    <button class="btn btn-primary" onclick="openDeleteModal(${
                      evento.id
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
        $("#loading-row > td").text("Nenhum evento encontrado");
      }
    });

  $("#confirm-delete-btn").on("click", function () {
    deleteEvento(selectedIdToDelete);
  });

  $(".close-modal").on("click", function () {
    $("#deleteWarning").modal("hide");
  });
});

function openDeleteModal(id) {
  selectedIdToDelete = id;
  $("#deleteWarning").modal("show");
}

function deleteEvento() {
  fetch(`eventos/${selectedIdToDelete}`, {
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
