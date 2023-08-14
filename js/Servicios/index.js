function LlenarTablaServicios() {
  const tableBody = document.querySelector(".tbody-servicios");
  const formData = new FormData();
  formData.append("procedimiento", "vista");

  // Realizar la solicitud a PHP mediante Fetch API
  fetch("./php/server/Servicios/apis_servicios.php?getComboData=true", {
    method: "POST",
    body: formData,
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(data => {
      data.forEach(item => {
        // Verificar si ya existe una fila con el mismo ID de servicio
        const existingRow = tableBody.querySelector(
          `tr[data-id="${item.ID_servicio}"]`
        );

        if (existingRow) {
          // Actualizar la fila existente
          existingRow.innerHTML = `
          <td class="py-3">${item.ID_servicio}</td>
          <td class="py-3">${item.Nombre}</td>
          <td class="py-3">${item.Precio}</td>
          <td class="py-3">
            <button class="btn btn-warning btn-sm">
              <i class="bx bx-edit"></i>
            </button>
            <button class="btn btn-danger btn-sm eliminar-btn" data-id=${item.ID_servicio}>
              <i class="bx bx-eraser"></i>
            </button>
          </td>
        `;
        } else {
          // Crear una nueva fila
          const row = document.createElement("tr");
          row.setAttribute("data-id", item.ID_servicio);
          row.innerHTML = `
          <td class="py-3">${item.ID_servicio}</td>
          <td class="py-3">${item.Nombre}</td>
          <td class="py-3">${item.Precio}</td>
          <td class="py-3">
            <button class="btn btn-warning btn-sm">
              <i class="bx bx-edit"></i>
            </button>
            <button class="btn btn-danger btn-sm eliminar-btn" data-id=${item.ID_servicio}>
              <i class="bx bx-eraser"></i>
            </button>
          </td>
        `;
          tableBody.appendChild(row);
        }
      });
    })
    .catch(error => {
      console.error("Fetch error:", error);
    });
}

function LlenarTablaPaquetes() {
  const tableBody = document.querySelector(".tbody-paquetes");
  const formData = new FormData();
  formData.append("procedimiento", "vista");

  fetch("./php/server/Servicios/apis_servicios.php?getDataTablePaquetes=true", {
    method: "POST",
    body: formData,
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(data => {
      data.forEach(item => {
        const existingRow = tableBody.querySelector(
          `tr[data-id="${item.PaqueteID}"]`
        );

        if (existingRow) {
          // Actualizar la fila existente
          existingRow.innerHTML = `
          <td class="py-3">${item.PaqueteID}</td>
          <td class="py-3">${item.Nombre}</td>
          <td class="py-3">${item.Servicios}</td>
          <td class="py-3">${item.Precio}</td>
          <td class="py-3">
            <a href="./paquetes-edits.php" class="btn btn-warning btn-sm" data-id=${item.PaqueteID}>
                <i class='bx bx-edit'></i>
            </a>
            <button class="btn btn-danger btn-sm eliminar-btn" data-id=${item.PaqueteID}>
              <i class="bx bx-eraser"></i>
            </button>
          </td>
        `;
        } else {
          const row = document.createElement("tr");
          row.setAttribute("data-id", item.PaqueteID);
          row.innerHTML = `
            <td class="py-3">${item.PaqueteID}</td>
            <td class="py-3">${item.Nombre}</td>
            <td class="py-3">${item.Servicios}</td>
            <td class="py-3">${item.Precio}</td>
            <td class="py-3">
              <a href="#" class="btn btn-warning btn-sm editar-btn" data-id="${item.PaqueteID}">
                <i class='bx bx-edit'></i>
              </a>
              <button class="btn btn-danger btn-sm eliminar-btn" data-id="${item.PaqueteID}">
                <i class="bx bx-eraser"></i>
              </button>
            </td>
          `;

          tableBody.appendChild(row);
        }
      });

      // Agregar manejador de eventos a los botones de editar
      const editButtons = document.querySelectorAll(".editar-btn");
      editButtons.forEach(editButton => {
        editButton.addEventListener("click", event => {
          event.preventDefault();
          const paqueteID = editButton.getAttribute("data-id");
          window.location.href = `./paquetes-edits.php?paqueteID=${paqueteID}`;
        });
      });
    })
    .catch(error => {
      console.error("Fetch error:", error);
    });
}

function enviarFormulario(formularioId, procedimiento) {
  const formulario = document.getElementById(formularioId);
  const formData = new FormData(formulario);

  // Agregar otros campos o datos si es necesario
  formData.append("procedimiento", procedimiento);

  // Realizar la solicitud a PHP mediante Fetch API
  fetch("./php/server/Servicios/apis_servicios.php", {
    method: "POST",
    body: formData,
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.text(); // Si se espera una respuesta de texto
    })
    .then(responseText => {
      if (formularioId == "form-Nuevo-Servicio") {
        LlenarTablaServicios();
        CargarDatosTotales();
      } else if (formularioId == "form-Nuevo-Paquete") {
        LlenarTablaPaquetes();
        CargarDatosTotales();
      }
    })
    .catch(error => {
      console.error("Fetch error:", error);
    });
}

// Manejar el evento de envío para cada formulario
document.getElementById("form-Nuevo-Servicio").onsubmit = function (event) {
  event.preventDefault();
  enviarFormulario("form-Nuevo-Servicio", "spInsertarNuevoServicio");
  LimpiarFormServicios();
};

document.getElementById("form-Nuevo-Paquete").onsubmit = function (event) {
  event.preventDefault();
  enviarFormulario("form-Nuevo-Paquete", "spInsertarPaquete");
  LimpiarFormPaquetes();
};

function LimpiarFormServicios() {
  const nombre = document.querySelector(".servicio-nombre");
  const descripcion = document.querySelector(".descripcion-servicio");
  const precio = document.querySelector(".servicio-precio");

  nombre.value = "";
  descripcion.value = "";
  precio.value = "";
}

function LimpiarFormPaquetes() {
  const nombre = document.querySelector(".name-paquete");
  const servicioInicial = document.querySelector(".combo-servicio-inicial");
  const precio = document.querySelector(".precio-inicial-paquete");

  nombre.value = "";
  servicioInicial.value = "Selecione una opcion";
  precio.value = "";
}

function cargarComboBox() {
  const comboBox = document.querySelector(".combo-servicio-inicial");
  const precioInicial = document.querySelector(".precio-inicial-paquete");
  const formData = new FormData();
  formData.append("procedimiento", "vista");

  // Realizar la petición Fetch para obtener los datos del combo box
  fetch("./php/server/Servicios/apis_servicios.php?getComboData=true", {
    method: "POST",
    body: formData,
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(data => {
      // Agregar las opciones al combo box
      data.forEach(item => {
        const option = document.createElement("option");
        option.value = item.ID_servicio; // Valor del option será el ID del producto
        option.text = item.Nombre; // Texto visible será el nombre del producto
        comboBox.add(option);
      });

      comboBox.addEventListener("change", function () {
        const selectedValue = comboBox.value;
        if (selectedValue > 0) {
          precioInicial.value = data[selectedValue - 1].Precio;
        } else {
          precioInicial.value = "";
        }
      });
    })
    .catch(error => {
      console.error("Fetch error:", error);
    });
}

function EliminarServicio() {
  const tableContainer = document.querySelector(".tbody-servicios");

  tableContainer.addEventListener("click", event => {
    // Verificar si el botón eliminar fue clickeado
    if (event.target.classList.contains("eliminar-btn")) {
      const button = event.target;
      const ID_servicio = button.getAttribute("data-id");

      Swal.fire({
        title: "¿Estás seguro?",
        text: "Esta acción no se puede deshacer",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      }).then(result => {
        if (result.isConfirmed) {
          const formData = new FormData();
          formData.append("procedimiento", "spEliminarServicio");
          formData.append("id", ID_servicio);

          // Realizar la solicitud a PHP mediante Fetch API
          fetch("./php/server/Servicios/apis_servicios.php", {
            method: "POST",
            body: formData,
          })
            .then(response => {
              if (!response.ok) {
                throw new Error("Network response was not ok");
              }
              return response.json();
            })
            .then(response => {
              if (response.success) {
                Swal.fire(
                  "¡Eliminado!",
                  "El servicio ha sido eliminado.",
                  "success"
                ).then(() => {
                  // Actualizar la página o realizar las acciones necesarias
                  location.reload();
                });
              } else {
                Swal.fire("Error", "No se pudo eliminar el servicio.", "error");
              }
            })
            .catch(error => {
              console.error("Fetch error:", error);
            });
        }
      });
    }
  });
}

function EliminarPaquete() {
  const tableContainer = document.querySelector(".tbody-paquetes");

  tableContainer.addEventListener("click", event => {
    // Verificar si el botón eliminar fue clickeado
    if (event.target.classList.contains("eliminar-btn")) {
      const button = event.target;
      const ID_servicio = button.getAttribute("data-id");

      Swal.fire({
        title: "¿Estás seguro?",
        text: "Esta acción no se puede deshacer",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
      }).then(result => {
        if (result.isConfirmed) {
          const formData = new FormData();
          formData.append("procedimiento", "spEliminarPaquete");
          formData.append("id", ID_servicio);

          // Realizar la solicitud a PHP mediante Fetch API
          fetch("./php/server/Servicios/apis_servicios.php", {
            method: "POST",
            body: formData,
          })
            .then(response => {
              if (!response.ok) {
                throw new Error("Network response was not ok");
              }
              return response.json();
            })
            .then(response => {
              if (response.success) {
                Swal.fire(
                  "¡Eliminado!",
                  "El paquete ha sido eliminado.",
                  "success"
                ).then(() => {
                  // Actualizar la página o realizar las acciones necesarias
                  location.reload();
                });
              } else {
                Swal.fire("Error", "No se pudo eliminar el paquete.", "error");
              }
            })
            .catch(error => {
              console.error("Fetch error:", error);
            });
        }
      });
    }
  });
}

function CargarDatosTotales() {
  const totalPaquetes = document.querySelector(".total-paquetes");
  const contratosHechos = document.querySelector(".contratos-hechos");
  const totalServicios = document.querySelector(".total-servicios");
  const compraServicios = document.querySelector(".compra-servicios");

  const formData = new FormData();
  formData.append("procedimiento", "spMostrarTotalesPaquetes");

  fetch("./php/server/Paquetes/apis_paquetes.php", {
    method: "POST",
    body: formData,
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
      totalPaquetes.innerHTML = data[0].TotalPaquetes;
      contratosHechos.innerHTML = data[0].TotalContratos;
      totalServicios.innerHTML = data[0].TotalServicios;
      compraServicios.innerHTML = data[0].TotalCompraServicios;
    })
    .catch(error => {
      console.error("Fetch error:", error);
    });
}

document.addEventListener("DOMContentLoaded", () => {
  cargarComboBox();
  LlenarTablaServicios();
  LlenarTablaPaquetes();
  EliminarServicio();
  EliminarPaquete();
  CargarDatosTotales();
});
