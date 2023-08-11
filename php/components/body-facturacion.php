<div class="container">
  <?php
      include('header.php');
  ?>
  <div class="row mt-2">
    <div class="col-6 p-2">
      <div class="container header bg-white rounded p-2 shadow-sm">
        <div class="row">
          <div class="col-6 d-flex justify-content-center align-items-center flex-column border-end">
            <h6 class="fs-5">
              <i class='bx bx-credit-card-front'></i>
            </h6>
            <span class="fw-bold mb-1">14</span>
            <span class="subtitle-contratos">Facturaciones</span>
          </div>
          <div class="col-6 d-flex justify-content-center align-items-center flex-column border-end">
            <h6 class="fs-5">
              <i class='bx bxs-user-check'></i>
            </h6>
            <span class="fw-bold mb-1">25</span>
            <span class="subtitle-contratos">Total clientes</span>
          </div>
        </div>
      </div>
    </div>
    <div class="col-6 p-2">
      <div class="container header bg-white rounded p-2 shadow-sm">
        <div class="row">
          <div class="col-6 d-flex justify-content-center align-items-center flex-column border-end">
            <h6 class="fs-5">
              <i class='bx bx-credit-card-front'></i>
            </h6>
            <span class="fw-bold mb-1">14</span>
            <span class="subtitle-contratos">Facturaciones</span>
          </div>
          <div class="col-6 d-flex justify-content-center align-items-center flex-column border-end">
            <h6 class="fs-5">
              <i class='bx bxs-user-check'></i>
            </h6>
            <span class="fw-bold mb-1">25</span>
            <span class="subtitle-contratos">Total clientes</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row mt-2">
    <div class="col-6 p-2">
      <div class="container header bg-white rounded p-2 shadow-sm">
        <div class="row px-4 pt-4 pb-2">
          <div class="col">
            <span class="fw-semibold">Facturacion de paquetes</span>
          </div>
          <div class="col">
            <div class="input-group input-group-sm">
              <input type="text" class="form-control" aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-sm">
              <button type="button" class="btn btn-secondary">
                <i class='bx bx-search'></i>
              </button>
            </div>
          </div>
        </div>
        <div class="row p-4">
          <div class="col overflow-auto table-scroll" style="height: 50vh">
            <table class="table table-hover bordered">
              <thead class="table-light">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Cliente</th>
                  <th scope="col">Contrato</th>
                  <th scope="col">Estado</th>
                  <th scope="col" class="text-center">Accion</th>
                </tr>
              </thead>
              <tbody class="tbody-facturas">
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class="col-6 p-2">
      <div class="container header bg-white rounded p-2 shadow-sm">
        <div class="row px-4 pt-4 pb-2">
          <div class="col">
            <span class="fw-semibold">Facturacion de servicios</span>
          </div>
          <div class="col">
            <div class="input-group input-group-sm">
              <input type="text" class="form-control" aria-label="Sizing example input"
                aria-describedby="inputGroup-sizing-sm">
              <button type="button" class="btn btn-secondary">
                <i class='bx bx-search'></i>
              </button>
            </div>
          </div>
        </div>
        <div class="row p-4">
          <div class="col overflow-auto table-scroll" style="height: 50vh">
            <table class="table table-hover bordered">
              <thead class="table-light">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Cliente</th>
                  <th scope="col">Contrato</th>
                  <th scope="col">Estado</th>
                  <th scope="col" class="text-center">Accion</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="py-3">1</td>
                  <td class="py-3">Ebay</td>
                  <td class="py-3">Paquete basico</td>
                  <td class="py-3">
                    <span class="bg-success-subtle text-emphasis-success rounded px-1">Finalizado</span>
                  </td>
                  <td class="py-3 text-center">
                    <a href="./facturas-detalles.php" class="btn btn-warning btn-sm"><i class='bx bx-send'></i></a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

  </div>
</div>