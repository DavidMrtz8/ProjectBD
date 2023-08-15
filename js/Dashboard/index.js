function LlenarTablaUltimasFacturas() {
  const tableBody = document.querySelector(".facturasRealizadas");
  const formData = new FormData();
  formData.append("procedimiento", "vista");

  // Realizar la petición Fetch para obtener los datos del combo box
  fetch("./php/server/Dashboard/apis_dashboard.php?getDataFacturas=true", {
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
      data.forEach((item, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
        <th scope="row">${index + 1}</th>
        <td>${item.Paquete}</td>
        <td>${item.Total}</td>
      `;
        tableBody.appendChild(row);
      });
    })
    .catch(error => {
      console.error("Fetch error:", error);
    });
}

function ServicioMasVendido() {
  const servicioMasVendido = document.querySelector(".serviciosMasVendido");
  const formData = new FormData();
  formData.append("procedimiento", "spServiciosMasVendido");

  // Realizar la petición Fetch para obtener los datos del combo box
  fetch("./php/server/Dashboard/apis_dashboard.php", {
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
      servicioMasVendido.innerHTML = data[0].Nombre;
    })
    .catch(error => {
      console.error("Fetch error:", error);
    });
}

function PaqueteMasVendido() {
  const paqueteMasVendido = document.querySelector(".paquetesMasVendido");
  const formData = new FormData();
  formData.append("procedimiento", "spPaquetesMasVendidos");

  // Realizar la petición Fetch para obtener los datos del combo box
  fetch("./php/server/Dashboard/apis_dashboard.php", {
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
      paqueteMasVendido.innerHTML = data[0].Nombre;
    })
    .catch(error => {
      console.error("Fetch error:", error);
    });
}

document.addEventListener("DOMContentLoaded", () => {
  LlenarTablaUltimasFacturas();
  ServicioMasVendido();
  PaqueteMasVendido();
});
