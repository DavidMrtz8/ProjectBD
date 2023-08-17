function cargarComboBoxServicios() {
  const comboBox = document.querySelector(".combo-opcion-servicio");
  const formData = new FormData();
  formData.append("procedimiento", "vista");

  fetch(
    "./php/server/Compra-Servicios/apis_compra-servicios.php?getComboDataServicios=true",
    {
      method: "POST",
      body: formData,
    }
  )
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Error en la petición AJAX");
      }
    })
    .then(data => {
      // console.log(data);
      // Agregar las opciones al combo box
      for (let i = 0; i < data.length; i++) {
        const option = document.createElement("option");
        option.value = data[i].ID_servicio;
        option.text = data[i].Nombre;
        comboBox.add(option);
      }
    })
    .catch(error => {
      console.error("Error:", error);
    });
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
  const searchInput = document.getElementById("searchCliente");

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

function enviarFormularioNuevoPaquete() {
  const cliente = document.querySelector(".combo-cliente").value;
  const servicio = document.querySelector(".combo-opcion-servicio").value;
  const tecnico = document.querySelector(".combo-tecnico-asignar").value;

  const requestData = {
    procedimiento: "spInsertarCompraServicio",
    clienteID: cliente,
    servicioID: servicio,
    tecnicoID: tecnico,
  };

  // Verificar si las opciones están seleccionadas
  // const areaEspecializacion = formData.get("area-especializacion");
  // const horario = formData.get("horario");
  // if (areaEspecializacion === "Selecione una opcion" || horario === "Selecione una opcion") {
  //   return;
  // }

  // Realizar la solicitud a PHP mediante fetch
  fetch("./php/server/Compra-Servicios/apis_compra-servicios.php", {
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
      LlenarTablaCompraServicios();
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

function LlenarTablaCompraServicios() {
  const tableBody = document.querySelector(".tbody-estado-CompraServicios");
  const formData = new FormData();

  formData.append("procedimiento", "vista");

  // Realizar la solicitud a PHP mediante Fetch API
  fetch(
    "./php/server/Compra-Servicios/apis_compra-servicios.php?getDataEstadoCompraServicios=true",
    {
      method: "POST",
      body: formData,
    }
  )
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then(data => {
      tableBody.innerHTML = "";
      data.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td class="py-3">${item.CompraServicioID}</td>
          <td class="py-3">${item.Cliente}</td>
          <td class="py-3">${item.Servicio}</td>
          <td class="py-3">${item.Precio}</td>
          <td class="py-3">
            <span class="bg-warning-subtle text-emphasis-warning rounded px-1">${item.Estado}</span>
          </td>
          <td class="py-3">
            <a href="#" class="btn btn-warning btn-sm editar-btn" data-id="${item.CompraServicioID}"><i class='bx bx-edit'></i></a>
            <button class="btn btn-danger btn-sm eliminar-btn" data-id="${item.CompraServicioID}" onclick="EliminarCompraServicio(${item.CompraServicioID})">
              <i class="bx bx-eraser"></i>
            </button>
          </td>
      `;
        tableBody.appendChild(row);
      });

      const editButtons = document.querySelectorAll(".editar-btn");
      editButtons.forEach(editButton => {
        editButton.addEventListener("click", event => {
          event.preventDefault();
          const CompraServicioID = editButton.getAttribute("data-id");
          window.location.href = `./compraServicioEdits.php?CompraServicioID=${CompraServicioID}`;
        });
      });
    })
    .catch(error => {
      console.error("Fetch error:", error);
    });
}

function EliminarCompraServicio(compraServicioID) {
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
      formData.append("procedimiento", "spEliminarCompraServicio");
      formData.append("id", compraServicioID);

      // Realizar la solicitud a PHP mediante Fetch en lugar de AJAX
      fetch("./php/server/Compra-Servicios/apis_compra-servicios.php", {
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
              "La compra del servicio ha sido eliminada.",
              "success"
            ).then(() => {
              // Actualizar la página o realizar las acciones necesarias
              location.reload();
            });
          } else {
            Swal.fire(
              "Error",
              "No se pudo eliminar la compra del servicio.",
              "error"
            );
          }
        })
        .catch(error => {
          console.error("Fetch error:", error);
        });
    }
  });
}

function llenarDatosExtras() {
  const formData = new FormData();
  formData.append("procedimiento", "spDatosServicios");
  const ts = document.getElementById("tservicios");
  const tc = document.getElementById("tcompras");

  // Realizar la solicitud a PHP mediante Fetch API
  fetch("./php/server/compra-servicios/apis_compra-servicios.php", {
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
      ts.innerHTML = data[0].ServiciosRealizados;
      tc.innerHTML = data[0].TotalVentas + " Lps";
    })
    .catch(error => {
      console.error("Fetch error:", error);
    });
}

document.addEventListener("DOMContentLoaded", () => {
  cargarComboBoxServicios();
  cargarComboBoxTecnico();
  cargarComboBoxCliente();
  llenarDatosExtras();
  LlenarTablaCompraServicios();
  const searchInput = document.getElementById("searchCliente");
  searchInput.addEventListener("input", cargarComboBoxCliente);
});

document
  .getElementById("enviar-formulario-CompraServicios")
  .addEventListener("click", () => {
    enviarFormularioNuevoPaquete();
  });
