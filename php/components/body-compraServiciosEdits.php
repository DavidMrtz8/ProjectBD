<div class="container">
  <?php
  include('header.php');
  ?>
  <div class="row mt-2">
    <div class="col-12 p-2">
      <div class="container header bg-white rounded p-2 shadow-sm">
        <div class="row">
          <div class="col-12 d-flex justify-content-end px-4">
            <button class="btn d-flex gap-2 align-items-center" data-bs-toggle="modal" data-bs-target="#articulosModal">
              <i class='bx bx-message-square-add'></i>
              <span class="subtitle-contratos">Nuevo paquete</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row mt-2">
    <div class="col-6 p-2">
      <div class="container header bg-white rounded p-4 shadow-sm" style="height: 75vh">
        <div class="row">
          <div class="col border-bottom pb-3">
            <span class="fw-semibold">Modificar paquete</span>
          </div>
        </div>
        <div class="row pt-3">
          <div class="mb-2">
            <label for="exampleFormControlInput1" class="form-label">Cliente</label>
            <div class="d-flex gap-1 mb-2">
              <input type="text" class="form-control form-control-sm cliente-paquete" id="searchCliente"
                placeholder="Juan Perez" name="cliente">
              <button class="btn btn-secondary btn-sm "><i class='bx bx-message-square-add'></i></button>
            </div>
            <div class="d-flex gap-1 mb-2">
              <select class="form-select form-select-sm combo-cliente" aria-label=".form-select-sm example"
                name="combo-cliente">
                <option selected>Selecione una opcion</option>
              </select>
              <button class="btn btn-secondary btn-sm "><i class='bx bx-book-bookmark'></i></i></button>
            </div>
          </div>
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Servicio</label>
            <select class="form-select form-select-sm combo-opcion-servicio" aria-label=".form-select-sm example"
              name="paquete">
              <option selected>Selecione una opcion</option>
            </select>
          </div>
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Tecnico a asignar</label>
            <select class="form-select form-select-sm combo-tecnico-asignar" aria-label=".form-select-sm example"
              name="tecnico">
              <option selected>Selecione una opcion</option>
            </select>
          </div>

          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Estado del servicio</label>
            <select class="form-select form-select-sm combo-estado-CompraServicio" aria-label=".form-select-sm example">
              <option selected>Selecione una opcion</option>
            </select>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <button type="button" class="btn btn-secondary w-100" data-bs-dismiss="modal">Cancelar</button>
          </div>
          <div class="col">
            <button type="submit" class="btn btn-primary w-100 btn-actualizar-CompraServicio">Guardar</button>
          </div>
        </div>
      </div>
    </div>
    <div class="col-6 p-2">
      <div class="container header bg-white rounded p-4 shadow-sm" style="height: 75vh">
        <div class="row">
          <div class="col border-bottom pb-3">
            <span class="fw-semibold">Gestion de articulos usados</span>
          </div>
        </div>
        <div class="row mt-3">
          <div class="col overflow-auto table-scroll" style="height: 62vh">
            <table class="table table-hover table-borderless">
              <thead class="table-light">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Articulo</th>
                  <th scope="col">Cantidad</th>
                  <th scope="col">Precio</th>
                  <th scope="col">Accion</th>
                </tr>
              </thead>
              <tbody class="tbody-articulos-detalles">
                <tr>
                  <td class="py-3">1</td>
                  <td class="py-3">Mouse</td>
                  <td class="py-3">12</td>
                  <td class="py-3">120 Lps</td>
                  <td class="py-3">
                    <a href="./contratosdetalles.php" class="btn btn-warning btn-sm"><i class='bx bx-edit'></i></a>
                    <button class="btn btn-danger btn-sm"><i class='bx bx-eraser'></i></button>
                  </td>
                </tr>
                <tr>
                  <td class="py-3">1</td>
                  <td class="py-3">Mouse</td>
                  <td class="py-3">12</td>
                  <td class="py-3">120 Lps</td>
                  <td class="py-3">
                    <a href="./contratosdetalles.php" class="btn btn-warning btn-sm"><i class='bx bx-edit'></i></a>
                    <button class="btn btn-danger btn-sm"><i class='bx bx-eraser'></i></button>
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

<!-- Form de agregar nuevo articulo -->

<div class="modal fade" id="articulosModal" tabindex="-1" aria-labelledby="articulosModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="exampleModalLabel">Creacion - Nuevo articulo detalle</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">Articulo</label>
          <select class="form-select form-select-sm combo-articulo" aria-label=".form-select-sm example">
            <option selected>Selecione una opcion</option>
          </select>
        </div>
        <div class="mb-3">
          <label for="exampleFormControlInput1" class="form-label">Cantidad</label>
          <input type="number" class="form-control form-control-sm cantidadArticulo" id="exampleFormControlInput1"
            placeholder="0">
        </div>
        <!-- El precio lo sacas de la tabla articulo -->
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
        <button type="submit" class="btn btn-primary enviar-form-CompraArticulo">Finalizar</button>
      </div>
    </div>
  </div>
</div>