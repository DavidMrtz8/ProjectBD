let dataContratoID = 0;

function cargarDatosTecnicos() {
  const nombre = document.querySelector(".nombreTecnico");
  const apellido = document.querySelector(".apellidoTecnico");
  const especializacion = document.querySelector(".cmbEspecializacionTecnico");
  const salario = document.querySelector(".salarioTecnico");
  const horario = document.querySelector(".horario-tecnico");
  const contratacion = document.querySelector(".contratacionTecnico");
  const nacimiento = document.querySelector(".nacimientoTecnico");

  const urlParams = new URLSearchParams(window.location.search);
  const tecnicoID = urlParams.get("tecnicoID");

  const formData = new FormData();
  formData.append("procedimiento", "spMostrarTecnicos");
  formData.append("tecnicoID", tecnicoID);

  fetch("./php/server/tecnicos/apis_tecnicos.php", {
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
      nombre.value = data[0].Nombre;
      apellido.value = data[0].Apellido;
      salario.value = data[0].Salario;
      especializacion.value = data[0].AreaEspecializacionID;
      horario.value = data[0].HorarioID;
      const x = data[0].Fecha_de_contratacion;
      const y = data[0].Fecha_de_nacimiento;
      contratacion.value = x.date.split(" ")[0];
      nacimiento.value = y.date.split(" ")[0];
    })
    .catch(error => {
      console.error("Fetch error:", error);
    });
}

function cargarComboBox() {
  const comboBox = document.querySelector(".combo-area-e");
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
        option.value = data[i].AreaEspecializacionID; // Valor del option será el ID del producto
        option.text = data[i].Nombre; // Texto visible será el nombre del producto
        comboBox.add(option);
      }
    }
  };
  xhrComboData.open(
    "POST",
    "./php/server/Tecnicos/apis_tecnicos.php?getComboData=true",
    true
  );
  xhrComboData.send(formData);
}

function cargarComboBoxHorario() {
  const comboBox = document.querySelector(".combo-horario");
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
        option.value = data[i].HorarioID; // Valor del option será el ID del producto
        option.text = data[i].horario; // Texto visible será el nombre del producto
        comboBox.add(option);
      }
    }
  };
  xhrComboData.open(
    "POST",
    "./php/server/Tecnicos/apis_tecnicos.php?getComboDataHorario=true",
    true
  );
  xhrComboData.send(formData);
}

function enviarFormularioActualizarTecnico() {
  const nombre = document.querySelector(".nombreTecnico").value;
  const apellido = document.querySelector(".apellidoTecnico").value;
  const especializacion = document.querySelector(
    ".cmbEspecializacionTecnico"
  ).value;
  const salario = document.querySelector(".salarioTecnico").value;
  const horario = document.querySelector(".horario-tecnico").value;
  const contratacion = document.querySelector(".contratacionTecnico").value;
  const nacimiento = document.querySelector(".nacimientoTecnico").value;

  const urlParams = new URLSearchParams(window.location.search);
  const tecnicoID = urlParams.get("tecnicoID");

  const requestData = {
    procedimiento: "spActualizarTecnico",
    tecnicoID: tecnicoID,
    nombre: nombre,
    apellido: apellido,
    area: especializacion,
    salario: salario,
    horario: horario,
    fechacon: contratacion,
    fechanac: nacimiento,
  };

  fetch("./php/server/Tecnicos/apis_tecnicos.php", {
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
      console.log(responseText);
      Swal.fire({
        icon: "success",
        title: "Datos modificados correctamente",
        showConfirmButton: false,
        timer: 1500, // Tiempo en milisegundos
      });
    })
    .catch(error => {
      console.error("Error:", error);
    });
}

function llenarContratos() {
  const tableBody = document.querySelector(".contratosSee");
  const formData = new FormData();
  const urlParams = new URLSearchParams(window.location.search);
  const tecnicoID = urlParams.get("tecnicoID");

  formData.append("tecnicoID", tecnicoID);
  formData.append("procedimiento", "spMostrarContratosXTecnicos");

  // Realizar la solicitud a PHP mediante Fetch API
  fetch("./php/server/tecnicos/apis_tecnicos.php", {
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
      console.log(data[0]);
      data.forEach(item => {
        tableBody.innerHTML += `
            <div class="card col-4 p-2">
              <span class="d-block mb-3 fs-6 fw-semibold">
                  Contrato: #${item.ContratoID} - ${item.Estado}
              </span>
              <span class="d-block fs-6 mt-2">
                  ${item.Paquete}
              </span>
              <span class="d-block fs-6 mb-2">
                  Cliente: ${item.Cliente}
              </span>
              <button class="w-100 mt-2 btn btn-light"  data-bs-toggle="modal" data-bs-target="#visitaModal" onclick="abriModal(${item.ContratoID}, ${tecnicoID})">Visita</button>
            </div>
          `;
      });
    })
    .catch(error => {
      console.error("Fetch error:", error);
    });
}

function llenarServicios() {
  const tableBody = document.querySelector(".serviciosSee");
  const formData = new FormData();
  const urlParams = new URLSearchParams(window.location.search);
  const tecnicoID = urlParams.get("tecnicoID");

  formData.append("tecnicoID", tecnicoID);
  formData.append("procedimiento", "spMostrarServiciosXTecnicos");

  // Realizar la solicitud a PHP mediante Fetch API
  fetch("./php/server/tecnicos/apis_tecnicos.php", {
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
      console.log(data[0]);
      data.forEach(item => {
        tableBody.innerHTML += `
            <div class="card col-4 p-2">
              <span class="d-block mb-3 fs-6 fw-semibold">
                  Servicio: #${item.CompraServicioID} - ${item.Estado}
              </span>
              <span class="d-block fs-6 mt-2">
                  ${item.Servicio}
              </span>
              <span class="d-block fs-6 mb-2">
                  Cliente: ${item.Cliente}
              </span>
            </div>
          `;
      });
    })
    .catch(error => {
      console.error("Fetch error:", error);
    });
}

function abriModal(id, tecnicoID) {
  const tableBody = document.querySelector(".tbody-visita");
  const formData = new FormData();
  dataContratoID = id;

  formData.append("contratoID", id);
  formData.append("tecnicoID", tecnicoID);
  formData.append("procedimiento", "spMostrarVisitaXtecnicoContrato");

  // Realizar la solicitud a PHP mediante Fetch API
  fetch("./php/server/tecnicos/apis_tecnicos.php", {
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
      console.log(data);
      data.forEach(item => {
        const row = document.createElement("tr");
        row.setAttribute("data-id", item.ContratoID);
        row.innerHTML = `
          <td class="py-3">${item.ContratoID}</td>
          <td class="py-3">${formatearFechaHora(item.Fecha)}</td>
          <td class="py-3">${item.Horas}</td>
        `;
        tableBody.appendChild(row);
      });
    })
    .catch(error => {
      console.error("Fetch error:", error);
    });
}

function formatearFechaHora(fechaHoraObj) {
  const fecha = new Date(fechaHoraObj.date);
  return fecha.toLocaleString("es-ES", { timeZone: fechaHoraObj.timezone });
}

function enviarFormularioVisitas() {
  const formData = new FormData();
  const fecha = document.querySelector(".fechaVisita").value;
  const horas = document.querySelector(".horasVisita").value;

  const urlParams = new URLSearchParams(window.location.search);
  const tecnicoID = urlParams.get("tecnicoID");

  // Agregar otros campos o datos si es necesario
  formData.append("procedimiento", "spInsertarVisita");
  formData.append("ContratoID", dataContratoID);
  formData.append("TecnicoID", tecnicoID);
  formData.append("Fecha", fecha);
  formData.append("Horas", horas);

  // Realizar la solicitud a PHP mediante Fetch API
  fetch("./php/server/tecnicos/apis_tecnicos.php", {
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
      abriModal(dataContratoID, tecnicoID);
      document.querySelector(".fechaVisita").value = "";
      document.querySelector(".horasVisita").vale = "0";
    })
    .catch(error => {
      console.error("Fetch error:", error);
    });
}

document.getElementById("btnagregar").onclick = function (event) {
  event.preventDefault();
  console.log("Funciona");
  enviarFormularioVisitas();
};

document.addEventListener("DOMContentLoaded", () => {
  cargarComboBox();
  cargarComboBoxHorario();
  cargarDatosTecnicos();
  llenarContratos();
  llenarServicios();
});

document
  .querySelector(".btn-actualizar-tecnico")
  .addEventListener("click", () => {
    enviarFormularioActualizarTecnico();
  });
