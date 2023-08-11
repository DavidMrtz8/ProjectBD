const modal = new bootstrap.Modal(
  document.querySelector(".editarClientesModal")
);
function LlenarTablaClientes() {
  const tableBody = document.querySelector(".tbody-clientes");
  const formData = new FormData();
  formData.append("procedimiento", "vista");

  // Realizar la petición Fetch para obtener los datos del combo box
  fetch("./php/server/Clientes/apis_clientes.php?getDataCliente=true", {
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
      tableBody.innerHTML = "";
      data.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
        <td class="py-3">${item.ID_cliente}</td>
        <td class="py-3">${item.Nombre}</td>
        <td class="py-3">${item.CorreoElectronico}</td>
        <td class="py-3">${item.Telefono}</td>
        <td class="py-3">
          <button class="btn btn-warning btn-sm btn-editar" data-id=${item.ID_cliente} onclick="abrirModal(${item.ID_cliente})"><i class="bx bx-edit"></i></button>
          <button class="btn btn-danger btn-sm eliminar-btn" data-id=${item.ID_cliente} onclick="EliminarCliente(${item.ID_cliente})"><i class="bx bx-eraser"></i></button>
        </td>
      `;
        tableBody.appendChild(row);
      });
    })
    .catch(error => {
      console.error("Fetch error:", error);
    });
}

function abrirModal(clienteID) {
  modal.show();
  CargarDatosClienteEditar(clienteID);
  document
    .getElementById("ingresar-cliente")
    .setAttribute("data-tipo", "editar");

  document
    .getElementById("ingresar-cliente")
    .setAttribute("data-id", clienteID);
}

function CargarDatosClienteEditar(clienteID) {
  const nombreCliente = document.getElementById("nombreCliente");
  const apellidoCliente = document.getElementById("apellidoCliente");
  const direccionCliente = document.getElementById("direccionCliente");
  const correoCliente = document.getElementById("correoCliente");
  const telefonoCliente = document.getElementById("telefonoCliente");

  const formData = new FormData();
  formData.append("procedimiento", "spMostrarDatosClientes");
  formData.append("clienteID", clienteID);

  fetch("./php/server/Clientes/apis_clientes.php", {
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
      nombreCliente.value = data[0].Nombre;
      apellidoCliente.value = data[0].Apellido;
      direccionCliente.value = data[0].Direccion;
      correoCliente.value = data[0].CorreoElectronico;
      telefonoCliente.value = data[0].Telefono;
    })
    .catch(error => {
      console.error("Fetch error:", error);
    });
}

function EliminarCliente(idCliente) {
  console.log("estoy entrando");
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
      formData.append("procedimiento", "spEliminarCliente");
      formData.append("id", idCliente);

      // Realizar la solicitud a PHP mediante Fetch en lugar de AJAX
      fetch("./php/server/Clientes/apis_clientes.php", {
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
              "El cliente ha sido eliminado.",
              "success"
            ).then(() => {
              // Actualizar la página o realizar las acciones necesarias
              location.reload();
            });
          } else {
            Swal.fire("Error", "No se pudo eliminar el cliente.", "error");
          }
        })
        .catch(error => {
          console.error("Fetch error:", error);
        });
    }
  });
}

function enviarFormularioClientes(procedimiento, clienteID) {
  const nombreCliente = document.getElementById("nombreCliente").value;
  const apellidoCliente = document.getElementById("apellidoCliente").value;
  const direccionCliente = document.getElementById("direccionCliente").value;
  const correoCliente = document.getElementById("correoCliente").value;
  const telefonoCliente = document.getElementById("telefonoCliente").value;

  const requestData = {
    procedimiento,
    clienteID,
    nombreCliente,
    apellidoCliente,
    direccionCliente,
    correoCliente,
    telefonoCliente,
  };

  fetch("./php/server/Clientes/apis_clientes.php", {
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
      LlenarTablaClientes();
      LimpiarClientes();
      // Mostrar notificación SweetAlert de éxito
      Swal.fire({
        icon: "success",
        title: "Datos ingresados correctamente",
        showConfirmButton: false,
        timer: 1500, // Tiempo en milisegundos
      });
    })
    .catch(error => {
      console.error("Fetch error:", error);
    });
}

function LimpiarClientes() {
  const nombreCliente = document.getElementById("nombreCliente");
  const apellidoCliente = document.getElementById("apellidoCliente");
  const direccionCliente = document.getElementById("direccionCliente");
  const correoCliente = document.getElementById("correoCliente");
  const telefonoCliente = document.getElementById("telefonoCliente");

  nombreCliente.value = "";
  apellidoCliente.value = "";
  direccionCliente.value = "";
  correoCliente.value = "";
  telefonoCliente.value = "";
}

document.addEventListener("DOMContentLoaded", () => {
  LlenarTablaClientes();
});

document.getElementById("ingresar-cliente").addEventListener("click", () => {
  const tipoAccion = document
    .getElementById("ingresar-cliente")
    .getAttribute("data-tipo");

  console.log(tipoAccion);
  if (tipoAccion === "editar") {
    const clienteID = document
      .getElementById("ingresar-cliente")
      .getAttribute("data-id");
    enviarFormularioClientes("spActualizarCliente", clienteID);
  } else {
    const clienteID = 0;
    enviarFormularioClientes("spInsertarCliente", clienteID);
  }
});

modal._element.addEventListener("hidden.bs.modal", function () {
  document.getElementById("ingresar-cliente").removeAttribute("data-tipo");
  document.getElementById("ingresar-cliente").removeAttribute("data-id");
  LimpiarClientes();
});
