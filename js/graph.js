const productos = [
  "Total Articulos vendidos",
  "Total Contratos vendidos",
  "Total Servicios vendidos",
  "Ingresos",
];
const ventas = [];

function getDataGraphic() {
  const formData = new FormData();
  formData.append("procedimiento", "spDatosGrafica");
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
      ventas.push(data[0].TotalArticulosVendidos);
      ventas.push(data[0].ContratosVendidos);
      ventas.push(data[0].ArticulosVendidos);
      ventas.push(data[0].Ingresos);
      // Crear el gráfico después de obtener y procesar los datos
      createChart();
    })
    .catch(error => {
      console.error("Fetch error:", error);
    });
}

function createChart() {
  const ctx = document.getElementById("miGrafico").getContext("2d");
  const miGrafico = new Chart(ctx, {
    type: "bar",
    data: {
      labels: productos,
      datasets: [
        {
          data: ventas,
          backgroundColor: [
            "rgb(105, 108, 255, 0.6)",
            "rgb(105, 108, 255, 0.6)",
            "rgb(105, 108, 255, 0.6)",
            "rgb(105, 108, 255, 0.6)",
          ],
          borderColor: [
            "rgb(105, 108, 255)",
            "rgb(105, 108, 255)",
            "rgb(105, 108, 255)",
            "rgb(105, 108, 255)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        x: {
          grid: {
            display: false,
          },
        },
        y: {
          ticks: {
            display: false,
          },
          grid: {
            display: false,
          },
          beginAtZero: true,
          display: false,
        },
      },
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  });
}

getDataGraphic();
