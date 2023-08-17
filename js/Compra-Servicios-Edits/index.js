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

function cargarComboBoxEstadoCompra() {
  const comboBox = document.querySelector(".combo-estado-CompraServicio");
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
        option.value = data[i].EstadoID; // Valor del option será el ID del producto
        option.text = data[i].Nombre; // Texto visible será el nombre del producto
        comboBox.add(option);
      }
    }
  };
  xhrComboData.open(
    "POST",
    "./php/server/Compra-Servicios-Edits/apis_compra-servicios-edits.php?getComboDataEstadoCompraServicio=true",
    true
  );
  xhrComboData.send(formData);
}

function cargarComboBoxCompraArticulo() {
  const comboBox = document.querySelector(".combo-articulo");
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
        option.value = data[i].ArticuloID; // Valor del option será el ID del producto
        option.text = data[i].Nombre; // Texto visible será el nombre del producto
        comboBox.add(option);
      }
    }
  };
  xhrComboData.open(
    "POST",
    "./php/server/Compra-Servicios-Edits/apis_compra-servicios-edits.php?getComboDataEstadoCompraArticulo=true",
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

function cargarDatosCompraServicios() {
  const clienteInput = document.getElementById("searchCliente");
  const cliente = document.querySelector(".combo-cliente");
  const servicio = document.querySelector(".combo-opcion-servicio");
  const tecnico = document.querySelector(".combo-tecnico-asignar");
  const estado = document.querySelector(".combo-estado-CompraServicio");

  const urlParams = new URLSearchParams(window.location.search);
  const CompraServicioID = urlParams.get("CompraServicioID");

  const formData = new FormData();
  formData.append("procedimiento", "spMostrarDatosCompraServicio");
  formData.append("CompraServicioID", CompraServicioID);

  // Realizar la petición Fetch para obtener los datos del combo box
  fetch("./php/server/Compra-Servicios-Edits/apis_compra-servicios-edits.php", {
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
      clienteInput.value = data[0].Nombre;
      cliente.value = data[0].ClienteID;
      servicio.value = data[0].ServicioID;
      tecnico.value = data[0].TecnicoID;
      estado.value = data[0].EstadoID;
    })
    .catch(error => {
      console.error("Fetch error:", error);
    });
}

function enviarFormularioActualizarCompraServicios() {
  const clienteID = document.querySelector(".combo-cliente").value;
  const servicioID = document.querySelector(".combo-opcion-servicio").value;
  const tecnicoID = document.querySelector(".combo-tecnico-asignar").value;
  const estadoID = document.querySelector(".combo-estado-CompraServicio").value;
  const urlParams = new URLSearchParams(window.location.search);
  const CompraServicioID = urlParams.get("CompraServicioID");

  const requestData = {
    procedimiento: "spActualizarCompraServicio",
    clienteID,
    servicioID,
    tecnicoID,
    estadoID,
    CompraServicioID,
  };

  fetch("./php/server/Compra-Servicios-Edits/apis_compra-servicios-edits.php", {
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

function EnviarFormularioArticulos() {
  const articulo = document.querySelector(".combo-articulo").value;
  const cantidad = document.querySelector(".cantidadArticulo").value;
  const urlParams = new URLSearchParams(window.location.search);
  const CompraServicioID = urlParams.get("CompraServicioID");

  const requestData = {
    procedimiento: "spActualizarArticulosCompraServicios",
    CompraServicioID,
    articuloID: articulo,
    cantidad,
  };

  // Realizar la solicitud a PHP mediante fetch
  fetch("./php/server/Compra-Servicios-Edits/apis_compra-servicios-edits.php", {
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
      console.log(responseText);
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
        //LimpiarFormArticulos();
        LlenarTablaArticulos();
      }
    })
    .catch(error => {
      console.error("Fetch error:", error);
    });
}

function LlenarTablaArticulos() {
  const tableBody = document.querySelector(".tbody-articulos-detalles");
  const formData = new FormData();
  const urlParams = new URLSearchParams(window.location.search);
  const CompraServicioID = urlParams.get("CompraServicioID");

  formData.append("CompraServicioID", CompraServicioID);
  formData.append("procedimiento", "spMostrarCompraServiciosArticulos");

  // Realizar la solicitud a PHP mediante Fetch API
  fetch("./php/server/Compra-Servicios-Edits/apis_compra-servicios-edits.php", {
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
      tableBody.innerHTML = "";

      data.forEach(item => {
        const row = document.createElement("tr");
        row.setAttribute("data-id", item.ArticuloID);
        row.innerHTML = `
          <td class="py-3">${item.ArticuloID}</td>
          <td class="py-3">${item.Articulo}</td>
          <td class="py-3">${item.Cantidad}</td>
          <td class="py-3">${item.Precio}</td>
          <td class="py-3">${item.Total}</td>
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

function EliminarArticulo(ArticuloID) {
  const urlParams = new URLSearchParams(window.location.search);
  const CompraServicioID = urlParams.get("CompraServicioID");
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
        procedimiento: "spEliminarArticuloCompraServicios",
        id: ArticuloID,
        CompraServicioID,
      };

      // Realizar la solicitud a PHP mediante Fetch API
      fetch(
        "./php/server/Compra-Servicios-Edits/apis_compra-servicios-edits.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json", // Indicar el tipo de contenido como JSON
          },
          body: JSON.stringify(requestData), // Convertir el objeto a JSON
        }
      )
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

document.addEventListener("DOMContentLoaded", () => {
  cargarComboBoxServicios();
  cargarComboBoxTecnico();
  cargarComboBoxCliente();
  cargarComboBoxEstadoCompra();
  cargarDatosCompraServicios();
  cargarComboBoxCompraArticulo();
  LlenarTablaArticulos();
  const searchInput = document.getElementById("searchCliente");
  searchInput.addEventListener("input", cargarComboBoxCliente);
});

document
  .querySelector(".btn-actualizar-CompraServicio")
  .addEventListener("click", () => {
    enviarFormularioActualizarCompraServicios();
  });

document
  .querySelector(".enviar-form-CompraArticulo")
  .addEventListener("click", () => {
    EnviarFormularioArticulos();
  });
