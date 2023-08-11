function LlenarDetalles(){
    const tableBody = document.querySelector(".tbody-facdetalles");
    const formData = new FormData();

    const urlParams = new URLSearchParams(window.location.search);
    const facturaID = urlParams.get("facturaID");

    formData.append("facturaID", facturaID);
    formData.append("procedimiento", "spFacuraDetalles");
    // Realizar la solicitud a PHP mediante Fetch API
    fetch("./php/server/facturacion/apis_facturacion.php", {
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
        console.log(data)
        tableBody.innerHTML = `
            <tr>
                <td>${data[0].Paquete}</td>
                <td>${data[0].TotalPaquetesPreciosISV} Lps</td>
                <td>${data[0].TotalPaquetesPrecios} Lps</td>
            </tr>
            <tr>
                <td>Horas extra (${data[0].HoraExtra})</td>
                <td>0 Lps</td>
                <td>${data[0].HoraExtraValor} Lps</td>
            </tr>
            <tr data-toggle="collapse" data-target="#productosUsados" aria-expanded="false" aria-controls="productosUsados">
                <td>Productos usados</td>
                <td>${data[0].totalArticulosISV} Lps</td>
                <td>${data[0].TotalArticulos} Lps</td>
            </tr>
            <tr>
                <td colspan="1"></td>
                <td>SubTotal:</td>
                <td>${data[0].TotalPaquetesPrecios+data[0].HoraExtraValor+data[0].TotalArticulos} Lps</td>
                </tr>
            <tr>
                <td colspan="1"></td>
                <td>ISV:</td>
                <td>${data[0].TotalPaquetesPreciosISV+data[0].totalArticulosISV} Lps</td>
            </tr>
            <tr>
                <td colspan="1"  class="bg-warning-subtle"></td>
                <td class="bg-warning-subtle">Total:</td>
                <td class="bg-warning-subtle">${data[0].Total} Lps</td>
            </tr>
        `;
    })
    .catch(error => {
        console.error("Fetch error:", error);
    });
}


document.addEventListener("DOMContentLoaded", () => {
    LlenarDetalles()
});