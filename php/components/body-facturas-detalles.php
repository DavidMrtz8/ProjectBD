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
          <div class="col-4 px-5 py-4" id="apartado-estado">
          </div>
        </div>
        <div class="row mt-2">
          <div class="col-12 px-5">
            <span class="fs-6 fw-semibold">Factura #4</span>
            <div class="row">
              <div class="col d-flex flex-column">
                <span>Fecha de emision: 12 de agosto</span>
                <span id="clNombre">Factura para: Cliente</span>
                <span id="clDireccion">Colocar direcion del cliente</span>
              </div>
              <div class="col d-flex flex-column">
                <span>Fecha de vencimiento: 12 de agosto</span>
                <span>Factura para: SAO INC</span>
                <span>Calle Principal, Barrio El Centro
                  San Pedro Sula, Cortés
                  Honduras</span>
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
              <tbody class="tbody-facdetalles">
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