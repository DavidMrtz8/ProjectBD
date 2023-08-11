<div class="container">
  <?php
  include('header.php');
  ?>
  <div class="row mt-3">
    <div class="col-12 p-2">
      <div class="col bg-white rounded p-4 overflow-auto table-scroll" style="height: 83vh;max-height: 83vh; ">
        <div class="container">
          <div class="row mt-3">
            <div class="col-6">
              <span class="fw-bold fs-4">Clientes</span>
            </div>
            <div class="col-3">
              <div class="input-group mb-3">
                <button class="btn d-flex w-100 gap-2 align-items-center justify-content-center" data-bs-toggle="modal"
                  data-bs-target="#exampleModal">
                  <i class='bx bx-message-square-add'></i>
                  <span class="subtitle-contratos">Nuevo cliente</span>
                </button>
              </div>
            </div>
            <div class="col-3">
              <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Recipient's username"
                  aria-label="Recipient's username" aria-describedby="button-addon2">
                <button class="btn btn-outline-secondary" type="button" id="button-addon2">
                  <i class='bx bx-search'></i>
                </button>
              </div>
            </div>
          </div>
          <div class="row mt-3">
            <!-- Tabla de clientes -->
            <div class="col overflow-auto table-scroll" style="height: 65vh;max-height: 70vh;">
              <table class="table table-sm table-hover bordered table-clientes">
                <thead class="thead-dark">
                  <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Correo electrónico</th>
                    <th>Teléfono</th>
                    <th>Accion</th>
                  </tr>
                </thead>
                <tbody class="tbody-clientes">
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


<div class="modal fade editarClientesModal" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
  aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Creacion - Nuevo Cliente</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="mb-3 row">
          <div class="col">
            <label for="nombreCliente" class="form-label">Nombre</label>
            <input type="text" class="form-control form-control-sm" id="nombreCliente" placeholder="Pedro">
          </div>
          <div class="col">
            <label for="apellidoCliente" class="form-label">Apellido</label>
            <input type="text" class="form-control form-control-sm" id="apellidoCliente" placeholder="Perez">
          </div>
        </div>
        <div class="mb-3">
          <label for="direccionCliente" class="form-label">Direccion</label>
          <textarea class="form-control form-control-sm" id="direccionCliente" rows="2"></textarea>
        </div>
        <div class="mb-3">
          <label for="correoCliente" class="form-label">Correo Electronico</label>
          <input type="email" class="form-control form-control-sm" id="correoCliente" placeholder="name@example.com">
        </div>
        <div class="mb-3">
          <label for="telefonoCliente" class="form-label">Telefono</label>
          <input type="text" class="form-control form-control-sm" id="telefonoCliente" placeholder="9355-5555">
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        <button type="submit" class="btn btn-primary" id="ingresar-cliente">Finalizar</button>
      </div>
    </div>
  </div>
</div>