<div class="container">
  <?php
  include('header.php');
  ?>
  <div class="row mt-3">
    <div class="col-8 p-2">
      <div class="col bg-white rounded p-2">
        <div class="card border-0" style="height: 10rem;">
          <div class="row g-0">
            <div class="col-9 col-md-10">
              <div class="card-body px-4">
                <h5 class="card-title">¡Bienvenidos!</h5>
                <p class="card-text">¡Bienvenido al Sistema de Gestión de Paquetes y Venta SAO-APP! Nuestra plataforma
                  ha
                  sido diseñada pensando en simplificar tus operaciones de gestión
                  de paquetes y ventas, brindándote un control total y eficiente sobre cada aspecto de tu negocio.</p>
              </div>
            </div>
            <div class="col-3 col-md-2 d-flex">
              <img src="./img/start.svg" class="img-fluid rounded-end" alt="...">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-2 p-2">
      <div class="col bg-white rounded p-2">
        <div class="card border-0" style="height: 10rem;">
          <div class="row g-0">
            <div class="col-md-12">
              <div class="card-body">
                <h6 class="card-title fs-6 d-flex align-items-center"><i class='bx bx-line-chart me-4'></i>Paquete más
                  vendido
                </h6>
                <p class="card-text paquetesMasVendido mt-4">Body card</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-2 p-2">
      <div class="col bg-white rounded p-2">
        <div class="card border-0" style="height: 10rem;">
          <div class="row g-0">
            <div class="col-md-12">
              <div class="card-body">
                <h6 class="card-title fs-6 d-flex align-items-center"><i class='bx bx-news me-4'></i>Servicio más
                  vendido</h6>
                <p class="card-text serviciosMasVendido mt-4">Body card</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row mt-3">
    <div class="col-8 col-sm-8 col-md-8 p-2">
      <div class="col p-2 bg-white rounded">
        <div class="card border-0">
          <div class="row g-0">
            <div class="col-md-12">
              <div class="card-body">
                <h5 class="card-title">Información general</h5>
                <canvas id="miGrafico" style="max-height: 15rem;"></canvas>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-4 col-sm-4 col-md-4 p-2">
      <div class="col p-2 bg-white rounded overflow-auto table-scroll" style="max-height: 20rem;">
        <div class="card border-0">
          <div class="row g-0">
            <div class="col-md-12">
              <div class="card-body">
                <h5 class="card-title table-scroll">Tabla de últimas facturas</h5>
                <table class="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Factura</th>
                      <th scope="col">Total</th>
                    </tr>
                  </thead>
                  <tbody class="facturasRealizadas">
                    <tr>
                      <th scope="row">1</th>
                      <td>Mark</td>
                      <td>@mdo</td>
                    </tr>
                    <tr>
                      <th scope="row">2</th>
                      <td>Jacob</td>
                      <td>@fat</td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td>Larry</td>
                      <td>@twitter</td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td>Larry</td>
                      <td>@twitter</td>
                    </tr>
                    <tr>
                      <th scope="row">3</th>
                      <td>Larry</td>
                      <td>@twitter</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row mt-3">
    <div class="col p-2">
      <div class="header col-12 bg-white rounded py-2 px-3 d-flex justify-content-center align-items-center">
        <footer class="footer text-center py-2">
          <span>&copy; 2023 - Todos los derechos reservados foraneos</span>
        </footer>
      </div>
    </div>
  </div>
</div>