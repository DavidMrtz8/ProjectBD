function LlenarDetalles(){
    const tableBody = document.querySelector(".tbody-facdetalles");
    const formData = new FormData();

    const clnombre = document.getElementById('clNombre')
    const cldireccion = document.getElementById('clDireccion')

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
        clnombre.innerHTML = data[0].Cliente;
        cldireccion.innerHTML = data[0].Direccion;
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

function LlenarDetallesServicios(){
    const tableBody = document.querySelector(".tbody-facdetalles");
    const formData = new FormData();

    const clnombre = document.getElementById('clNombre')
    const cldireccion = document.getElementById('clDireccion')

    const urlParams = new URLSearchParams(window.location.search);
    const compraID = urlParams.get("compraID");

    formData.append("compraID", compraID);
    formData.append("procedimiento", "spMostrarFunServicioDetallesFactura");
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
        clnombre.innerHTML = data[0].Cliente;
        cldireccion.innerHTML = data[0].Direccion;
        tableBody.innerHTML = `
            <tr>
                <td>${data[0].Servicio}</td>
                <td>${data[0].PrecioServicioISV} Lps</td>
                <td>${data[0].PrecioServicio} Lps</td>
            </tr>
            <tr data-toggle="collapse" data-target="#productosUsados" aria-expanded="false" aria-controls="productosUsados">
                <td>Productos usados</td>
                <td>${data[0].TotalArticulosISV} Lps</td>
                <td>${data[0].TotalArticulos} Lps</td>
            </tr>
            <tr>
                <td colspan="1"></td>
                <td>SubTotal:</td>
                <td>${data[0].PrecioServicio+data[0].TotalArticulos} Lps</td>
                </tr>
            <tr>
                <td colspan="1"></td>
                <td>ISV:</td>
                <td>${data[0].PrecioServicioISV+data[0].TotalArticulosISV} Lps</td>
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
    const urlParams = new URLSearchParams(window.location.search);

    // Obtener los valores de los parámetros
    const facturaID = urlParams.get("facturaID");
    const compraID = urlParams.get("compraID");

    // Verificar y realizar acciones basadas en los parámetros
    if (facturaID !== null) {
        LlenarDetalles();
    } else if (compraID !== null) {
        LlenarDetallesServicios()
    } else {
        // No se encontraron parámetros válidos en la URL
        console.log("No se encontraron parámetros válidos en la URL.");
    }
});