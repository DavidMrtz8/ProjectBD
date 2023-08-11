const modal = new bootstrap.Modal(
  document.querySelector(".editarArticulosModal")
);

function cargarComboBoxTipoArticulo() {
  const comboBox = document.querySelector(".combo-tipo-articulo");
  const formData = new FormData();
  formData.append("procedimiento", "vista");

  // Realizar la petición Fetch para obtener los datos del combo box
  fetch(
    "./php/server/Inventario/apis_inventario.php?getComboDataTipoArticulo=true",
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
      // Agregar las opciones al combo box
      data.forEach(item => {
        const option = document.createElement("option");
        option.value = item.tipoID; // Valor del option será el ID del producto
        option.text = item.Nombre; // Texto visible será el nombre del producto
        comboBox.add(option);
      });
    })
    .catch(error => {
      console.error("Fetch error:", error);
    });
}

function CargarDatosArticuloEditar(articuloID) {
  const nombreArticulo = document.getElementById("nombreArticulo");
  const tipoArticulo = document.querySelector(".combo-tipo-articulo");
  const precio = document.getElementById("precioArticulo");
  const existencia = document.getElementById("existencia");

  const formData = new FormData();
  formData.append("procedimiento", "spMostrarDatosArticulo");
  formData.append("articuloID", articuloID);

  fetch("./php/server/Inventario/apis_inventario.php", {
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
      nombreArticulo.value = data[0].Nombre;
      tipoArticulo.value = data[0].TipoID;
      precio.value = data[0].Precio;
      existencia.value = data[0].Existencia;
    })
    .catch(error => {
      console.error("Fetch error:", error);
    });
}

function LlenarTablaInventario() {
  const tableBody = document.querySelector(".tbody-inventario");
  const formData = new FormData();
  formData.append("procedimiento", "vista");

  // Realizar la petición Fetch para obtener los datos del combo box
  fetch("./php/server/Inventario/apis_inventario.php?getDataInventario=true", {
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
        <td class="py-3">${item.ArticuloID}</td>
        <td class="py-3">${item.Nombre}</td>
        <td class="py-3">${item.Tipo}</td>
        <td class="py-3">${item.Existencia}</td>
        <td class="py-3">
          <button class="btn btn-warning btn-sm btn-editar" data-id=${item.ArticuloID} onclick="abrirModal(${item.ArticuloID})"><i class="bx bx-edit"></i></button>
          <button class="btn btn-danger btn-sm eliminar-btn" data-id=${item.ArticuloID} onclick="EliminarArticuloInventario(${item.ArticuloID})"><i class="bx bx-eraser"></i></button>
        </td>
      `;
        tableBody.appendChild(row);
      });
    })
    .catch(error => {
      console.error("Fetch error:", error);
    });
}

function EliminarArticuloInventario(articuloID) {
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
      formData.append("procedimiento", "spEliminarArticuloInventario");
      formData.append("id", articuloID);

      // Realizar la solicitud a PHP mediante Fetch en lugar de AJAX
      fetch("./php/server/Inventario/apis_inventario.php", {
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

function enviarFormularioArticuloNuevo(procedimiento, articuloID) {
  const nombreArticulo = document.getElementById("nombreArticulo").value;
  const tipoArticulo = document.querySelector(".combo-tipo-articulo").value;
  const precio = document.getElementById("precioArticulo").value;
  const existencia = document.getElementById("existencia").value;

  const requestData = {
    procedimiento,
    articuloID,
    nombreArticulo,
    tipoArticulo,
    precio,
    existencia,
  };

  fetch("./php/server/Inventario/apis_inventario.php", {
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
      LlenarTablaInventario();
      LimpiarArticulos();
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

function abrirModal(articuloID) {
  modal.show();
  CargarDatosArticuloEditar(articuloID);
  document
    .getElementById("enviar-formulario-articulo-nuevo")
    .setAttribute("data-tipo", "editar");

  document
    .getElementById("enviar-formulario-articulo-nuevo")
    .setAttribute("data-id", articuloID);
}

function LimpiarArticulos() {
  const nombreArticulo = document.getElementById("nombreArticulo");
  const tipoArticulo = document.querySelector(".combo-tipo-articulo");
  const precio = document.getElementById("precioArticulo");
  const existencia = document.getElementById("existencia");

  nombreArticulo.value = "";
  tipoArticulo.value = "Selecione una opcion";
  precio.value = "";
  existencia.value = "";
}

document.addEventListener("DOMContentLoaded", () => {
  LlenarTablaInventario();
  cargarComboBoxTipoArticulo();
});

document
  .getElementById("enviar-formulario-articulo-nuevo")
  .addEventListener("click", () => {
    const tipoAccion = document
      .getElementById("enviar-formulario-articulo-nuevo")
      .getAttribute("data-tipo");
    console.log(tipoAccion);
    if (tipoAccion === "editar") {
      const articuloID = document
        .getElementById("enviar-formulario-articulo-nuevo")
        .getAttribute("data-id");
      enviarFormularioArticuloNuevo("spArtualizarArticulo", articuloID);
    } else {
      const articuloID = 0;
      enviarFormularioArticuloNuevo("spInsertarNuevoArticulo", articuloID);
    }
  });

modal._element.addEventListener("hidden.bs.modal", function () {
  document
    .getElementById("enviar-formulario-articulo-nuevo")
    .removeAttribute("data-tipo");
  document
    .getElementById("enviar-formulario-articulo-nuevo")
    .removeAttribute("data-id");
  LimpiarArticulos();
});
