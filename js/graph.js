const productos = ["Producto A", "Producto B", "Producto C", "Producto D", "Producto E", "Producto F"];
const ventas = [120, 80, 160, 50, 60, 80];

// Obtén una referencia al elemento canvas donde dibujaremos el gráfico
const ctx = document.getElementById("miGrafico").getContext("2d");

// Crea el gráfico de barras
const miGrafico = new Chart(ctx, {
  type: "bar", // Tipo de gráfico: barras
  data: {
    labels: productos, // Etiquetas del eje X
    datasets: [
      {
        data: ventas, // Datos de las ventas
        backgroundColor: [
          "rgb(105, 108, 255, 0.6)", 
          "rgb(105, 108, 255, 0.6)", 
          "rgb(105, 108, 255, 0.6)", 
          "rgb(105, 108, 255, 0.6)", 
          "rgb(105, 108, 255, 0.6)",
          "rgb(105, 108, 255, 0.6)"
        ],
        borderColor: [
          "rgb(105, 108, 255)", 
          "rgb(105, 108, 255)", 
          "rgb(105, 108, 255)", 
          "rgb(105, 108, 255)",
          "rgb(105, 108, 255)",
          "rgb(105, 108, 255)" 
        ],
        borderWidth: 1, // Ancho del borde de las barras
      },
    ],
  },
  options: {
    scales: {
      x: {
        grid: {
          display: false, // Ocultar las rayas de la cuadrícula en el eje X
        },
      },
      y: {
        ticks: {
          display: false, // Ocultar las etiquetas del eje Y
        },
        grid: {
          display: false, // Ocultar las rayas de la cuadrícula en el eje Y
        },
        beginAtZero: true, // Comenzar el eje Y desde 0
        display: false, // Ocultar la línea del eje Y
      },
    },
    plugins: {
      legend: {
        display: false, // Ocultar la leyenda
      },
    },
  },
});