function cargarComboBoxPaquete() {
  const comboBox = document.querySelector(".combo-opcion-paquete");
  const formData = new FormData();
  formData.append("procedimiento", "vista");

  // Realizar la petición utilizando fetch
  fetch("./php/server/Paquetes/apis_paquetes.php?getComboDataPaquete=true", {
    method: "POST",
    body: formData,
  })
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
        option.value = data[i].PaqueteID; // Valor del option será el ID del producto
        option.text = data[i].Nombre; // Texto visible será el nombre del producto
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

  // Realizar la petición utilizando fetch
  fetch("./php/server/Paquetes/apis_paquetes.php?getComboDataTecnico=true", {
    method: "POST",
    body: formData,
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Error en la petición AJAX");
      }
    })
    .then(data => {
      // Agregar las opciones al combo box
      data.forEach(item => {
        const option = document.createElement("option");
        option.value = item.ID_tecnico;
        option.text = item.Nombre;
        comboBox.add(option);
      });
    })
    .catch(error => {
      console.error("Error:", error);
    });
}

function cargarComboBoxEstado() {
  const comboBox = document.querySelector(".combo-estado-contrato");
  const formData = new FormData();
  formData.append("procedimiento", "vista");

  // Realizar la petición utilizando fetch
  fetch(
    "./php/server/Paquetes/apis_paquetes.php?getComboDataEstadoContrato=true",
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
      // Agregar las opciones al combo box
      data.forEach(item => {
        const option = document.createElement("option");
        option.value = item.EstadoID;
        option.text = item.Nombre;
        comboBox.add(option);
      });
    })
    .catch(error => {
      console.error("Error:", error);
    });
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

function cargarComboBoxArticulos() {
  const comboBox = document.querySelector(".combo-articulo");
  const formData = new FormData();
  formData.append("procedimiento", "vista");

  // Realizar la petición utilizando fetch
  fetch("./php/server/Paquetes/apis_paquetes.php?getComboDataArticulo=true", {
    method: "POST",
    body: formData,
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Error en la petición AJAX");
      }
    })
    .then(data => {
      // Agregar las opciones al combo box
      data.forEach(item => {
        const option = document.createElement("option");
        option.value = item.ArticuloID;
        option.text = item.Nombre;
        comboBox.add(option);
      });
    })
    .catch(error => {
      console.error("Error:", error);
    });
}

function CargarDatosInicioContratos() {
  const nombreCliente = document.querySelector(".cliente-contrato");
  const comboCliente = document.querySelector(".combo-cliente");
  const paquete = document.querySelector(".combo-opcion-paquete");
  const tecnico = document.querySelector(".combo-tecnico-asignar");
  const fechaInicio = document.querySelector(".fecha-inicio");
  const fechaFinal = document.querySelector(".fecha-final");
  const estado = document.querySelector(".combo-estado-contrato");

  const urlParams = new URLSearchParams(window.location.search);
  const contratoID = urlParams.get("contratoID");

  const formData = new FormData();
  formData.append("procedimiento", "spMostrarContratoDetalles");
  formData.append("contratoID", contratoID);

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
      nombreCliente.value = data[0].Cliente;
      comboCliente.value = data[0].clienteID;
      paquete.value = data[0].Contrato;
      tecnico.value = data[0].tecnico;
      const fechaInicioFormat = data[0].FechaInicio;
      const fechaFinalFormat = data[0].FechaFinal;
      fechaInicio.value = fechaInicioFormat.date.split(" ")[0];
      fechaFinal.value = fechaFinalFormat.date.split(" ")[0];
      estado.value = data[0].Estado;
    })
    .catch(error => {
      console.error("Fetch error:", error);
    });
}

function LimpiarFormArticulos() {
  const articulo = document.querySelector(".combo-articulo");
  const cantidad = document.querySelector(".cantidadArticulo");

  articulo.value = "Selecione una opcion";
  cantidad.value = null;
}

function EnviarFormularioArticulos() {
  const articulo = document.querySelector(".combo-articulo").value;
  const cantidad = document.querySelector(".cantidadArticulo").value;
  const urlParams = new URLSearchParams(window.location.search);
  const contratoID = urlParams.get("contratoID");

  const requestData = {
    procedimiento: "spActualizarContratosDetalles",
    contratoID,
    articuloID: articulo,
    cantidad,
  };

  // Realizar la solicitud a PHP mediante fetch
  fetch("./php/server/Paquetes/apis_paquetes.php", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestData),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.text(); // Si se espera una respuesta de texto
    })
    .then(responseText => {
      // Mostrar mensajes de error o éxito según la respuesta del servidor
      if (
        responseText.includes("El articuloID ya existe en la base de datos.")
      ) {
        // Mostrar mensaje de SweetAlert con un icono de información
        Swal.fire({
          icon: "info",
          title: "Información",
          text: "El articulo ya existe en el paquete.",
        });
      } else if (responseText.includes("Actualización exitosa")) {
        Swal.fire({
          icon: "success",
          title: "Información",
          text: "Servicio agregado al paquete.",
        });
        LimpiarFormArticulos();
        LlenarTablaArticulos();
      }
    })
    .catch(error => {
      console.error("Fetch error:", error);
    });
}

function EliminarArticulo(ArticuloID) {
  const urlParams = new URLSearchParams(window.location.search);
  const contratoID = urlParams.get("contratoID");
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
      const requestData = {
        procedimiento: "spEliminarArticuloContratoDetalle",
        id: ArticuloID,
        contratoID,
      };

      // Realizar la solicitud a PHP mediante Fetch API
      fetch("./php/server/Paquetes/apis_paquetes.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Indicar el tipo de contenido como JSON
        },
        body: JSON.stringify(requestData), // Convertir el objeto a JSON
      })
        .then(response => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json(); // Convertir el cuerpo de la respuesta en un objeto JSON
        })
        .then(data => {
          // Ahora puedes trabajar con 'data' como un objeto JSON
          if (data.success) {
            Swal.fire(
              "¡Eliminado!",
              "El articulo ha sido eliminado.",
              "success"
            ).then(() => {
              // Actualizar la página o realizar las acciones necesarias
              location.reload();
            });
          } else {
            Swal.fire("Error", "No se pudo eliminar el articulo.", "error");
          }
        })
        .catch(error => {
          console.error("Fetch error:", error);
        });
    }
  });
}

function LlenarTablaArticulos() {
  const tableBody = document.querySelector(".tbody-articulos-detalles");
  const formData = new FormData();
  const urlParams = new URLSearchParams(window.location.search);
  const contratoID = urlParams.get("contratoID");

  formData.append("contratoID", contratoID);
  formData.append("procedimiento", "spMostrarContratoDetalleArticulos");

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
    .then(data => {
      // Limpiar el contenido existente de la tabla
      tableBody.innerHTML = "";

      data.forEach(item => {
        const row = document.createElement("tr");
        row.setAttribute("data-id", item.ArticuloID);
        row.innerHTML = `
          <td class="py-3">${item.ArticuloID}</td>
          <td class="py-3">${item.Articulo}</td>
          <td class="py-3">${item.Cantidad}</td>
          <td class="py-3">${item.Precio}</td>
          <td class="py-3">
            <button class="btn btn-danger btn-sm eliminar-btn" data-id="${item.ArticuloID}" onclick="EliminarArticulo(${item.ArticuloID})">
              <i class="bx bx-eraser"></i>
            </button>
          </td>
        `;
        tableBody.appendChild(row);
      });
    })
    .catch(error => {
      console.error("Fetch error:", error);
    });
}

function enviarFormularioActualizarContrato() {
  const cliente = document.querySelector(".combo-cliente").value;
  const paquete = document.querySelector(".combo-opcion-paquete").value;
  const tecnico = document.querySelector(".combo-tecnico-asignar").value;
  const fechaInicio = document.querySelector(".fecha-inicio").value;
  const fechaFinal = document.querySelector(".fecha-final").value;
  const estado = document.querySelector(".combo-estado-contrato").value;
  const urlParams = new URLSearchParams(window.location.search);
  const contratoID = urlParams.get("contratoID");

  const requestData = {
    procedimiento: "spActualizarDatosContrato",
    contratoID,
    clienteID: cliente,
    paqueteID: paquete,
    tecnicoID: tecnico,
    fechaInicio,
    fechaFinal,
    estado,
  };

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
      //LlenarTablaEstadoPaquetes();
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

document.addEventListener("DOMContentLoaded", () => {
  cargarComboBoxTecnico();
  cargarComboBoxPaquete();
  cargarComboBoxEstado();
  CargarDatosInicioContratos();
  cargarComboBoxArticulos();
  cargarComboBoxCliente();
  LlenarTablaArticulos();

  // LlenarTablaEstadoPaquetes();
  const searchInput = document.getElementById("searchCliente");
  searchInput.addEventListener("input", cargarComboBoxCliente);
});

document
  .querySelector(".enviar-form-Articulo")
  .addEventListener("click", () => {
    EnviarFormularioArticulos();
  });

document
  .querySelector(".btn-actualizar-contrato")
  .addEventListener("click", () => {
    enviarFormularioActualizarContrato();
  });
