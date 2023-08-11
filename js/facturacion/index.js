function LlenarTablaFactura() {
    const tableBody = document.querySelector(".tbody-facturas");
    const formData = new FormData();
    formData.append("procedimiento", "vista");

    // Realizar la petición Fetch para obtener los datos del combo box
    fetch("./php/server/facturacion/apis_facturacion.php?getDataFacturacion=true", {
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
            <td class="py-3">${item.FacturaID}</td>
            <td class="py-3">${item.Cliente}</td>
            <td class="py-3">${item.Paquete}</td>
            <td class="py-3">
                <span class="bg-success-subtle text-emphasis-success rounded px-1">${item.Estado == 0 ? 'Pendiente':'Finalizado'}</span>
            </td>
            <td class="py-3 text-center">
                <a href="./facturas-detalles.php" class="btn btn-warning btn-sm ver-btn" data-id="${item.FacturaID}"><i class='bx bx-send'></i></a>
            </td>
        `;
            tableBody.appendChild(row);
        });
        const editButtons = document.querySelectorAll(".ver-btn");
        editButtons.forEach(editButton => {
            editButton.addEventListener("click", event => {
            event.preventDefault();
            const facturaID = editButton.getAttribute("data-id");
            window.location.href = `./facturas-detalles.php?facturaID=${facturaID}`;
            });
        });
    })
    .catch(error => {
        console.error("Fetch error:", error);
    });
}



document.addEventListener("DOMContentLoaded", () => {
    LlenarTablaFactura();
});