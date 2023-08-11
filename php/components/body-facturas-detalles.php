<div class="container">
  <?php
  include('header.php');
  ?>
  <div class="row mt-2">
    <div class="col-12 p-2">
      <div class="container header bg-white rounded p-2 shadow-sm">
        <div class="row">
          <div class="col-8 px-5 py-4">
            <span class="fw-semibold fs-5">SAO-APP</span>
          </div>
          <div class="col-4 px-5 py-4">
            <span class="px-4 fw-semibold text-warning">Estado: Pendiente</span>
            <button class="btn btn-success px-4">Pagar</button>
          </div>
        </div>
        <div class="row mt-2">
          <div class="col-8 px-5">
            <span class="fs-6 fw-semibold">Factura #4</span>
            <div class="row">
              <div class="col d-flex flex-column">
                <span>Fecha de emision: 12 de agosto</span>
                <span>Factura para: Cliente</span>
                <span>Colocar direcion del cliente</span>
              </div>
              <div class="col d-flex flex-column">
                <span>Fecha de vencimiento: 12 de agosto</span>
                <span>Factura para: SAO INC</span>
                <span>Colocar direcion fiticia de la empresa</span>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="col px-5 mt-4">
            <table class="table table-hover">
              <thead>
                <tr>
                  <th>Descripcion</th>
                  <th>ISV</th>
                  <th>Precio</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Paquete basico</td>
                  <td>199 Lps</td>
                  <td>1300 Lps</td>
                </tr>
                <tr>
                  <td>Horas extra</td>
                  <td>199 Lps</td>
                  <td>1300 Lps</td>
                </tr>
                <tr data-toggle="collapse" data-target="#productosUsados" aria-expanded="false" aria-controls="productosUsados">
                  <td>Productos usados</td>
                  <td>120Lps</td>
                  <td>1200Lps</td>
                </tr>
                <tr id="productosUsados" class="collapse">
                  <td colspan="3">
                    <table class="table table-borderless">
                      <thead>
                        <tr>
                          <td scope="col" class="text-center">Articulo</td>
                          <td scope="col" class="text-center">Cantidad</td>
                          <td scope="col" class="text-center">ISV</td>
                          <td scope="col" class="text-center">Costo unitario</td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td class="text-center">Ram</td>
                          <td class="text-center">2</td>
                          <td class="text-center">15</td>
                          <td class="text-center">100</td>
                        </tr>
                        <tr>
                          <td class="text-center">Ram</td>
                          <td class="text-center">2</td>
                          <td class="text-center">15</td>
                          <td class="text-center">100</td>
                        </tr>
                      </tbody>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td colspan="1"></td>
                  <td>SubTotal:</td>
                  <td>1200 Lps</td>
                </tr>
                <tr>
                  <td colspan="1"></td>
                  <td>ISV:</td>
                  <td>120 Lps</td>
                </tr>
                <tr>
                  <td colspan="1"  class="bg-warning-subtle"></td>
                  <td class="bg-warning-subtle">Total:</td>
                  <td class="bg-warning-subtle">1320 Lps</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="row mt-3">
          <div class="col p-1">
            <div class="header col-12 bg-white rounded py-1 px-3 d-flex justify-content-center align-items-center">
              <footer class="footer text-center py-2">
                  <span>&copy; 2023 - Todos los derechos reservados foraneos team</span>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<script>
    document.querySelector('[data-target="#productosUsados"]').addEventListener('click', function () {
        document.querySelector('#productosUsados').classList.toggle('show');
    });
</script>