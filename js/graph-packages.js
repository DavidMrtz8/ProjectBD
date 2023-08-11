const datos = {
    activo: 25,
    cancelado: 15,
    finalizado: 60
};

// Colores para cada segmento del gráfico
const colores = ['#858AE3', '#613DC1', '#4E148C'];

// Obtén el elemento canvas
const canvas = document.getElementById('graph-packages');

// Crea el gráfico de donut
const miGraficoDonut = new Chart(canvas, {
    type: 'doughnut',
    data: {
        labels: ['Activo', 'Cancelado', 'Finalizado'],
        datasets: [{
            data: [datos.activo, datos.cancelado, datos.finalizado],
            backgroundColor: colores
        }]
    },
    options: {
        cutout: '65%', // Porcentaje del agujero interior (ajustar según prefieras)
        plugins: {
            legend: {
                display: false // Oculta las leyendas
            }
        }
    }
});