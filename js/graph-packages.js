function creategraph(datos) {
  // Colores para cada segmento del gráfico
  const colores = ["#858AE3", "#613DC1", "#4E148C"];

  // Obtén el elemento canvas
  const canvas = document.getElementById("graph-packages");

  // Crea el gráfico de donut
  const miGraficoDonut = new Chart(canvas, {
    type: "doughnut",
    data: {
      labels: ["Activo", "Cancelado", "Finalizado"],
      datasets: [
        {
          data: [datos.Progreso, datos.Cancelados, datos.Finalizados],
          backgroundColor: colores,
        },
      ],
    },
    options: {
      cutout: "65%", // Porcentaje del agujero interior (ajustar según prefieras)
      plugins: {
        legend: {
          display: false, // Oculta las leyendas
        },
      },
    },
  });
}

function creactedatagraph() {
  const paquetesFinalizados = document.querySelector(".paquetesFinalizados");
  const paquetesEnProgreso = document.querySelector(".paquetesEnProgreso");
  const paquetesCancelados = document.querySelector(".paquetesCancelados");

  const formData = new FormData();
  formData.append("procedimiento", "spEstadoDeContratosCuantitativos");
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
      paquetesFinalizados.innerHTML = data[0].Finalizados;
      paquetesEnProgreso.innerHTML = data[0].Progreso;
      paquetesCancelados.innerHTML = data[0].Cancelados;
      creategraph(data[0]);
    })
    .catch(error => {
      console.error("Fetch error:", error);
    });
}

document.addEventListener("DOMContentLoaded", () => {
  creactedatagraph();
});
