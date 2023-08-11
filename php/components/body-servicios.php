<div class="container">
  <?php
  include('header.php');
  ?>
  <div class="row mt-2">
    <div class="col-6 p-2">
      <div class="container header bg-white rounded p-2 shadow-sm">
        <!-- Menus -->
        <div class="row border-bottom pb-2 m-1">
          <div class="col-8 px-3 d-flex align-items-center fw-semibold">
            <span class="">Gestion de paquete</span>
          </div>
          <div class="col-4 d-flex justify-content-end px-3">
            <button class="btn d-flex gap-2 align-items-center agregar-paquete" data-bs-toggle="modal"
              data-bs-target="#paquetesModal">
              <i class='bx bx-message-square-add'></i>
              <span class="subtitle-contratos">Nuevo paquete</span>
            </button>
          </div>
        </div>
        <div class="row mt-3 pb-2 m-1">
          <div class="col-6 border-end px-3">
            <span class="fw-light">
              Total paquetes
            </span>
          </div>
          <div class="col-6 text-center">
            <span class="fw-light">
              8
            </span>
          </div>
        </div>
        <div class="row mt-3 pb-2 m-1">
          <div class="col-6 border-end px-3">
            <span class="fw-light">
              Contratos hechos
            </span>
          </div>
          <div class="col-6 text-center">
            <span class="fw-light">
              12
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="col-6 p-2">
      <div class="container header bg-white rounded p-2 shadow-sm">
        <!-- Menus -->
        <div class="row border-bottom pb-2 m-1">
          <div class="col-8 px-3 d-flex align-items-center fw-semibold">
            <span class="">Gestion de paquete</span>
          </div>
          <div class="col-4 d-flex justify-content-end px-3">
            <button class="btn d-flex gap-2 align-items-center" data-bs-toggle="modal" data-bs-target="#serviciosModal">
              <i class='bx bx-message-square-add'></i>
              <span class="subtitle-contratos">Nuevo servicio</span>
            </button>
          </div>
        </div>
        <div class="row mt-3 pb-2 m-1">
          <div class="col-6 border-end px-3">
            <span class="fw-light">
              Total servicios
            </span>
          </div>
          <div class="col-6 text-center">
            <span class="fw-light">
              8
            </span>
          </div>
        </div>
        <div class="row mt-3 pb-2 m-1">
          <div class="col-6 border-end px-3">
            <span class="fw-light">
              Compra de servicio
            </span>
          </div>
          <div class="col-6 text-center">
            <span class="fw-light">
              12
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row mt-2">
    <div class="col-6 p-2">
      <div class="container header bg-white rounded p-3 shadow-sm">
        <!-- Tablas -->
        <div class="container">
          <div class="row mb-3">
            <div class="col-4 d-flex align-items-center">
              <span class="fw-semibold">
                Gestion
              </span>
            </div>
            <div class="col-8 d-flex">
              <div class="input-group input-group-sm">
                <input type="text" class="form-control" aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-sm">
                <button type="button" class="btn btn-secondary">
                  <i class='bx bx-search'></i>
                </button>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12 overflow-auto table-scroll" style="height: 47vh;">
              <table class="table table-hover bordered">
                <thead class="table-light">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Servicios</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Accion</th>
                  </tr>
                </thead>
                <tbody class="tbody-paquetes">
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-6 p-2">
      <div class="container header bg-white rounded p-3 shadow-sm">
        <!-- Tablas -->
        <div class="container">
          <div class="row mb-3">
            <div class="col-4 d-flex align-items-center">
              <span class="fw-semibold">
                Gestion
              </span>
            </div>
            <div class="col-8 d-flex">
              <div class="input-group input-group-sm">
                <input type="text" class="form-control" aria-label="Sizing example input"
                  aria-describedby="inputGroup-sizing-sm">
                <button type="button" class="btn btn-secondary">
                  <i class='bx bx-search'></i>
                </button>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12 overflow-auto table-scroll" style="height: 47vh;">
              <table class="table table-hover bordered table-servicios">
                <thead class="table-light">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Precio</th>
                    <th scope="col">Accion</th>
                  </tr>
                </thead>
                <tbody class="tbody-servicios">
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<form id="form-Nuevo-Paquete">

  <div class="modal fade" id="paquetesModal" tabindex="-1" aria-labelledby="paquetesModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Creacion - Nuevo paquete</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Nombre del paquete</label>
            <input type="text" class="form-control form-control-sm name-paquete" name="name-paquete"
              id="exampleFormControlInput1" placeholder="Eje. paquete basico">
          </div>
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Servicio inicial</label>
            <select class="form-select form-select-sm combo-servicio-inicial" name="servicio-i"
              aria-label=".form-select-sm example">
              <option selected>Selecione una opcion</option>
            </select>
          </div>
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Precio inicial</label>
            <input type="text" class="form-control form-control-sm precio-inicial-paquete" name="precio-i"
              id="exampleFormControlInput1" placeholder="Precio del servicio inicial" readonly>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
          <button type="submit" class="btn btn-primary">Finalizar</button>
        </div>
      </div>
    </div>
  </div>
</form>

<form id="form-Nuevo-Servicio">
  <input type="hidden" name="formulario_servicio" value="1">
  <div class="modal fade" id="serviciosModal" tabindex="-1" aria-labelledby="serviciosModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Creacion - Nuevo Servicio</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Nombre</label>
            <input type="text" class="form-control form-control-sm servicio-nombre" name="nombre"
              id="exampleFormControlInput1" placeholder="Perez">
          </div>
          <div class="mb-3">
            <label for="exampleFormControlTextarea1" class="form-label">Descripcion</label>
            <textarea class="form-control descripcion-servicio" id="exampleFormControlTextarea1" name="descripcion"
              rows="3"></textarea>
          </div>
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Precio</label>
            <input type="number" class="form-control form-control-sm servicio-precio" name="precio"
              id="exampleFormControlInput1" placeholder="1200 Lps">
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
          <button type="submit" class="btn btn-primary">Finalizar</button>
        </div>
      </div>
    </div>
  </div>
</form>