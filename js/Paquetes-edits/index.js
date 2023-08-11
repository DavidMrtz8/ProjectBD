function cargarComboBox() {
  const comboBox = document.querySelector(".combo-servicios");
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
    })
    .catch(error => {
      console.error("Fetch error:", error);
    });
}

function LlenarTablaServicios() {
  const tableBody = document.querySelector(".tbody-servicios");
  const formData = new FormData();
  const urlParams = new URLSearchParams(window.location.search);
  const paqueteID = urlParams.get("paqueteID");

  formData.append("paqueteID", paqueteID);
  formData.append("procedimiento", "spMostrarServiciosPaqueteEspecifico");

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
    .then(data => {
      // Limpiar el contenido existente de la tabla
      tableBody.innerHTML = "";

      data.forEach(item => {
        const row = document.createElement("tr");
        row.setAttribute("data-id", item.ID_servicio);
        row.innerHTML = `
          <td class="py-3">${item.ID_servicio}</td>
          <td class="py-3">${item.Nombre}</td>
          <td class="py-3">${item.Precio}</td>
          <td class="py-3">
            <button class="btn btn-danger btn-sm eliminar-btn" data-id="${item.ID_servicio}" onclick="EliminarServicioPaquete(${item.ID_servicio})">
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

function enviarFormularioServicios() {
  const formData = new FormData();
  const comboBoxServicios = document.querySelector(".combo-servicios");
  const urlParams = new URLSearchParams(window.location.search);
  const paqueteID = urlParams.get("paqueteID");
  const servicioID = comboBoxServicios.value;

  // Agregar otros campos o datos si es necesario
  formData.append("procedimiento", "spActualizarTablaPaquetesDetalles");
  formData.append("paqueteID", paqueteID);
  formData.append("servicio", servicioID);

  // Realizar la solicitud a PHP mediante Fetch API
  fetch("./php/server/Paquetes-edits/apis_paquetes-edits.php", {
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
      // Mostrar mensajes de error o éxito según la respuesta del servidor
      if (responseText.includes("El servicioID ya existe")) {
        // Mostrar mensaje de SweetAlert con un icono de información
        Swal.fire({
          icon: "info",
          title: "Información",
          text: "El servicio ya existe en el paquete.",
        });
      } else if (responseText.includes("Actualización exitosa")) {
        Swal.fire({
          icon: "success",
          title: "Información",
          text: "Servicio agregado al paquete.",
        });
        LlenarTablaServicios(); // Actualiza la tabla de servicios si es exitoso
        cargarDatosPaquete();
      }
    })
    .catch(error => {
      console.error("Fetch error:", error);
    });
}

function enviarFormularioPaquetes(procedimiento) {
  const nombrePaquete = document.querySelector(".nombre-paquete").value;
  const horasEstablecidas = document.querySelector(".horasEstablecidas").value;
  const precioTotal = document.querySelector(".precioTotal").value;
  const urlParams = new URLSearchParams(window.location.search);
  const paqueteID = urlParams.get("paqueteID");

  const requestData = {
    procedimiento: procedimiento,
    paqueteID: paqueteID,
    nombrePaquete: nombrePaquete,
    horasEstablecidas: horasEstablecidas,
    precioTotal: precioTotal,
  };

  fetch("./php/server/Paquetes-edits/apis_paquetes-edits.php", {
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
      return response.text(); // Si se espera una respuesta de texto
    })
    .then(responseText => {
      // Mostrar notificación SweetAlert de éxito
      Swal.fire({
        icon: "success",
        title: "Datos actualizados correctamente",
        showConfirmButton: false,
        timer: 1500, // Tiempo en milisegundos
      });
    })
    .catch(error => {
      console.error("Fetch error:", error);
    });
}

function ReestablecerCombo() {
  const comboBox = document.querySelector(".combo-servicios");

  comboBox.value = "Selecione una opcion";
}

function EliminarServicioPaquete(ID_servicio) {
  const urlParams = new URLSearchParams(window.location.search);
  const paqueteID = urlParams.get("paqueteID");
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
        procedimiento: "spEliminarServicioPaquete",
        id: ID_servicio,
        paqueteID,
      };

      // Realizar la solicitud a PHP mediante Fetch API
      fetch("./php/server/Paquetes-edits/apis_paquetes-edits.php", {
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

function cargarDatosPaquete() {
  const nombrePaquete = document.querySelector(".nombre-paquete");
  const horasEstablecidas = document.querySelector(".horasEstablecidas");
  const precioFinal = document.querySelector(".precioTotal");

  const urlParams = new URLSearchParams(window.location.search);
  const paqueteID = urlParams.get("paqueteID");

  const formData = new FormData();
  formData.append("procedimiento", "spMostrarDatosPaquetes");
  formData.append("paqueteID", paqueteID);

  // Realizar la petición Fetch para obtener los datos del combo box
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
    .then(data => {
      // Agregar las opciones al combo box
      nombrePaquete.value = data[0].Nombre;
      data[0].Horas === null
        ? (horasEstablecidas.value = 0)
        : (horasEstablecidas.value = data[0].Horas);
      precioFinal.value = data[0].Precio;
    })
    .catch(error => {
      console.error("Fetch error:", error);
    });
}

// Manejar el evento de envío para cada formulario
document.getElementById("form-agregar-servicio").onsubmit = function (event) {
  event.preventDefault();
  enviarFormularioServicios();
  ReestablecerCombo();
};

document.getElementById("enviar-form").addEventListener("click", () => {
  enviarFormularioPaquetes("spActualizarDatosPaquete");
  //LimpiarFormPaquetes();
});

document.addEventListener("DOMContentLoaded", () => {
  cargarComboBox();
  LlenarTablaServicios();
  cargarDatosPaquete();
});
