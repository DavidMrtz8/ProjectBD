<div class="container">
  <?php
  include('header.php');
  ?>
  <div class="row mt-3">
    <div class="col-12 p-2">
      <div class="col bg-white rounded p-4 overflow-auto table-scroll">
        <div class="container">
          <div class="row mt-3">
            <div class="col-6">
              <span class="fw-bold fs-4">Inventario</span>
            </div>
            <div class="col-6">
              <div class="input-group mb-3">
                <button class="btn d-flex w-100 gap-2 align-items-center justify-content-center agregar-paquete"
                  data-bs-toggle="modal" data-bs-target="#exampleModal">
                  <i class='bx bx-message-square-add'></i>
                  <span class="subtitle-contratos">Nuevo articulo</span>
                </button>
              </div>
            </div>
            <div class="col-3">
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
                    <th>Tipo</th>
                    <th>Existencia</th>
                    <th>Accion</th>
                  </tr>
                </thead>
                <tbody class="tbody-inventario">
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>


<div class="modal fade editarArticulosModal" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel"
  aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Creacion - Nuevo articulo</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="mb-3">
          <label for="nombreArticulo" class="form-label">Nombre del Articulo</label>
          <input type="text" class="form-control form-control-sm" id="nombreArticulo" placeholder="Ej. Memoria RAM">
        </div>
        <div class="mb-3">
          <label for="tipoDeArticulo" class="form-label">Tipo de articulo</label>
          <select class="form-select form-select-sm combo-tipo-articulo" aria-label="Small select example">
            <option selected>Selecione una opcion</option>
          </select>
        </div>
        <div class="mb-3">
          <label for="precioArticulo" class="form-label">Precio</label>
          <input type="number" class="form-control form-control-sm" id="precioArticulo" placeholder="0">
        </div>
        <div class="mb-3">
          <label for="existencia" class="form-label">Existencia</label>
          <input type="number" class="form-control form-control-sm" id="existencia" placeholder="0">
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        <button type="submit" class="btn btn-primary" id="enviar-formulario-articulo-nuevo">Finalizar</button>
      </div>
    </div>
  </div>
</div>