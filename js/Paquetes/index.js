function enviarFormularioNuevoPaquete() {
  const cliente = document.querySelector(".combo-cliente").value;
  const paquete = document.querySelector(".combo-opcion-paquete").value;
  const tecnico = document.querySelector(".combo-tecnico-asignar").value;
  const fechaInicio = document.querySelector(".fecha-inicio").value;
  const fechaFinal = document.querySelector(".fecha-final").value;

  const requestData = {
    procedimiento: "spInsertarContratoPaquete",
    clienteID: cliente,
    paqueteID: paquete,
    tecnicoID: tecnico,
    fechaInicio,
    fechaFinal,
  };

  // Verificar si las opciones están seleccionadas
  // const areaEspecializacion = formData.get("area-especializacion");
  // const horario = formData.get("horario");
  // if (areaEspecializacion === "Selecione una opcion" || horario === "Selecione una opcion") {
  //   return;
  // }

  // Realizar la solicitud a PHP mediante fetch
  fetch("./php/server/Paquetes/apis_paquetes.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestData),
  })
    .then(response => {
      if (response.ok) {
        return response.text();
      } else {
        throw new Error("Error en la solicitud");
      }
    })
    .then(responseText => {
      LlenarTablaEstadoPaquetes();
      // La respuesta desde PHP (opcional)
      Swal.fire({
        icon: "success",
        title: "Datos insertados correctamente",
        showConfirmButton: false,
        timer: 1500, // Tiempo en milisegundos
      });
    })
    .catch(error => {
      console.error("Error:", error);
    });
}

function cargarComboBoxPaquete() {
  const comboBox = document.querySelector(".combo-opcion-paquete");
  const formData = new FormData();
  formData.append("procedimiento", "vista");
  // Realizar la petición AJAX para obtener los datos del combo box
  const xhrComboData = new XMLHttpRequest();
  xhrComboData.onreadystatechange = function () {
    //console.log("Respuesta del servidor:", xhrComboData.responseText);
    if (xhrComboData.readyState === 4 && xhrComboData.status === 200) {
      //console.log(this.responseText);
      const data = JSON.parse(xhrComboData.responseText);

      // Agregar las opciones al combo box
      for (let i = 0; i < data.length; i++) {
        const option = document.createElement("option");
        option.value = data[i].PaqueteID; // Valor del option será el ID del producto
        option.text = data[i].Nombre; // Texto visible será el nombre del producto
        comboBox.add(option);
      }
    }
  };
  xhrComboData.open(
    "POST",
    "./php/server/Paquetes/apis_paquetes.php?getComboDataPaquete=true",
    true
  );
  xhrComboData.send(formData);
}

function cargarComboBoxTecnico() {
  const comboBox = document.querySelector(".combo-tecnico-asignar");
  const formData = new FormData();
  formData.append("procedimiento", "vista");
  // Realizar la petición AJAX para obtener los datos del combo box
  const xhrComboData = new XMLHttpRequest();
  xhrComboData.onreadystatechange = function () {
    //console.log("Respuesta del servidor:", xhrComboData.responseText);
    if (xhrComboData.readyState === 4 && xhrComboData.status === 200) {
      //console.log(this.responseText);
      const data = JSON.parse(xhrComboData.responseText);

      // Agregar las opciones al combo box
      for (let i = 0; i < data.length; i++) {
        const option = document.createElement("option");
        option.value = data[i].ID_tecnico; // Valor del option será el ID del producto
        option.text = data[i].Nombre; // Texto visible será el nombre del producto
        comboBox.add(option);
      }
    }
  };
  xhrComboData.open(
    "POST",
    "./php/server/Paquetes/apis_paquetes.php?getComboDataTecnico=true",
    true
  );
  xhrComboData.send(formData);
}

function cargarComboBoxCliente() {
  const comboBox = document.querySelector(".combo-cliente");
  const searchInput = document.getElementById("searchCliente"); // Obtener el elemento de búsqueda

  const requestData = {
    procedimiento: "vista",
  };

  fetch("./php/server/Paquetes/apis_paquetes.php?getComboDataCliente=true", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestData),
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Error en la solicitud");
      }
    })
    .then(data => {
      // Limpiar opciones anteriores del combo box
      comboBox.innerHTML = "";

      // Filtrar los datos según la búsqueda
      const searchTerm = searchInput.value.toLowerCase();
      const filteredData = data.filter(item =>
        item.Nombre.toLowerCase().includes(searchTerm)
      );

      // Agregar las opciones filtradas al combo box
      for (let i = 0; i < filteredData.length; i++) {
        const option = document.createElement("option");
        option.value = filteredData[i].ID_cliente;
        option.text = filteredData[i].Nombre;
        comboBox.add(option);
      }
    })
    .catch(error => {
      console.error("Error:", error);
    });
}

function LlenarTablaEstadoPaquetes() {
  const tableBody = document.querySelector(".tbody-estado-paquetes");
  const formData = new FormData();

  formData.append("procedimiento", "vista");

  // Realizar la solicitud a PHP mediante Fetch API
  fetch("./php/server/Paquetes/apis_paquetes.php?getDataEstadoPaquetes=true", {
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
          `tr[data-id="${item.ContratoID}"]`
        );

        if (existingRow) {
          // Actualizar la fila existente
          existingRow.innerHTML = `
          <td class="py-3">${item.ContratoID}</td>
          <td class="py-3">${item.Cliente}</td>
          <td class="py-3">${item.Contrato}</td>
          <td class="py-3">
            <span class="bg-warning-subtle text-emphasis-warning rounded px-1">${item.Estado}</span>
          </td>
          <td class="py-3">
            <a href="#" class="btn btn-warning btn-sm editar-btn" data-id="${item.ContratoID}"><i class='bx bx-edit'></i></a>
            <button class="btn btn-danger btn-sm eliminar-btn" data-id="${item.ContratoID}">
              <i class="bx bx-eraser"></i>
            </button>
          </td>
        `;
        } else {
          const row = document.createElement("tr");
          row.setAttribute("data-id", item.ContratoID);
          row.innerHTML = `
          <td class="py-3">${item.ContratoID}</td>
          <td class="py-3">${item.Cliente}</td>
          <td class="py-3">${item.Contrato}</td>
          <td class="py-3">
            <span class="bg-warning-subtle text-emphasis-warning rounded px-1">${item.Estado}</span>
          </td>
          <td class="py-3">
            <a href="#" class="btn btn-warning btn-sm editar-btn" data-id="${item.ContratoID}"><i class='bx bx-edit'></i></a>
            <button class="btn btn-danger btn-sm eliminar-btn" data-id="${item.ContratoID}">
              <i class="bx bx-eraser"></i>
            </button>
          </td>
          `;

          tableBody.appendChild(row);
        }
      });
      const editButtons = document.querySelectorAll(".editar-btn");
      editButtons.forEach(editButton => {
        editButton.addEventListener("click", event => {
          event.preventDefault();
          const contratoID = editButton.getAttribute("data-id");
          window.location.href = `./contratosdetalles.php?contratoID=${contratoID}`;
        });
      });
    })
    .catch(error => {
      console.error("Fetch error:", error);
    });
}

function EliminarContrato() {
  const tableContainer = document.querySelector(".tbody-estado-paquetes");

  tableContainer.addEventListener("click", event => {
    // Verificar si el botón eliminar fue clickeado
    if (event.target.classList.contains("eliminar-btn")) {
      const button = event.target;
      const contratoID = button.getAttribute("data-id");

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
          formData.append("procedimiento", "spEliminarContratoPaquete");
          formData.append("id", contratoID);

          // Realizar la solicitud a PHP mediante Fetch API
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
            .then(response => {
              if (response.success) {
                Swal.fire(
                  "¡Eliminado!",
                  "El contrato ha sido eliminado.",
                  "success"
                ).then(() => {
                  // Actualizar la página o realizar las acciones necesarias
                  location.reload();
                });
              } else {
                Swal.fire("Error", "No se pudo eliminar el contrato.", "error");
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

function llenarDatosExtras() {
  const formData = new FormData();
  formData.append("procedimiento", "spDatosContratos");
  const tp = document.getElementById('tpaquetes');
  const tv = document.getElementById('tvisitas');

  // Realizar la solicitud a PHP mediante Fetch API
  fetch("./php/server/paquetes/apis_paquetes.php", {
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
      // Limpiar el contenido existente de la tabla
      tp.innerHTML = data[0].TotalPaquetes;
      tv.innerHTML = data[0].TotalVisitas;
    })
    .catch(error => {
      console.error("Fetch error:", error);
    });
}

document.addEventListener("DOMContentLoaded", () => {
  cargarComboBoxTecnico();
  cargarComboBoxPaquete();
  cargarComboBoxCliente();
  llenarDatosExtras();
  LlenarTablaEstadoPaquetes();
  EliminarContrato();
  const searchInput = document.getElementById("searchCliente");
  searchInput.addEventListener("input", cargarComboBoxCliente);
});

document
  .getElementById("enviar-formulario-paquetes")
  .addEventListener("click", () => {
    enviarFormularioNuevoPaquete();
  });
