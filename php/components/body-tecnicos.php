<div class="container">
  <?php
  include('header.php');
  ?>
  <div class="row mt-2">
    <div class="col-12 p-2">
      <div class="container header bg-white rounded p-2 shadow-sm">
        <div class="row">
          <div class="col-3 d-flex justify-content-center align-items-center flex-column border-end">
            <h6 class="fs-5">
              <i class='bx bx-wrench'></i>
            </h6>
            <span class="fw-bold mb-1 total-tecnicos">14</span>
            <span class="subtitle-contratos">Total tecnicos</span>
          </div>
          <div class="col-3 d-flex justify-content-center align-items-center flex-column border-end">
            <h6 class="fs-5">
              <i class='bx bx-station text-success'></i>
            </h6>
            <span class="fw-bold mb-1 total-tecnicos-libres">14</span>
            <span class="subtitle-contratos">Tenicos libres</span>
          </div>
          <div class="col-3 d-flex justify-content-center align-items-center flex-column border-end">
            <h6 class="fs-5">
              <i class='bx bx-station text-danger'></i>
            </h6>
            <span class="fw-bold mb-1 total-tecnicos-ocupados">25</span>
            <span class="subtitle-contratos">Tecnicos ocupados</span>
          </div>
          <div class="col-3 d-flex justify-content-center align-items-center flex-column">
            <button class="btn d-flex gap-2 align-items-center" data-bs-toggle="modal" data-bs-target="#tecnicosModal">
              <i class='bx bx-message-square-add'></i>
              <span class="subtitle-contratos">Nuevo tecnico</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row mt-2">
    <div class="col-8 p-2">
      <div class="header d-f bg-white rounded p-4 shadow-sm table-scroll overflow-auto">
        <div class="container">
          <div class="row mb-3">
            <div class="col-4">
              <span class="fw-semibold">
                Gestion de tecnicos
              </span>
            </div>
            <div class="col-8 d-flex">

            </div>
          </div>
          <div class="row">
            <div class="col-12 table-scroll overflow-auto" style="height: 54vh;">
              <table class="table table-hover bordered">
                <thead class="table-light">
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Apellido</th>
                    <th scope="col">Estado</th>
                    <th scope="col">Contratos</th>
                    <th scope="col">Servicios</th>
                    <th scope="col">Accion</th>
                  </tr>
                </thead>
                <tbody class="tbody-tecnicos">
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="col-4 p-2">
      <div class="header d-f bg-white rounded p-4 shadow-sm table-scroll overflow-auto" style="height: 67vh;">
        <!-- Ledearboard -->
        <div class="container">
          <div class="row mb-3">
            <div class="col-12">
              <span class="fw-semibold">
                Tecnicos con mas contratos
              </span>
              <hr>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <div class="d-flex gap-2 border border-light-subtle rounded shadow-sm p-1">
                <div class="col-3 d-flex justify-content-center align-items-center">
                  <i class='bx bxs-chevron-right'></i>
                </div>
                <div class="col-5 d-flex justify-content-left align-items-center">
                  <span class="d-block fw-semibold tecnico-uno">
                    San Peter
                  </span>
                </div>
                <div class="col-3 text-center">
                  <span class="fw-semibold contratosT1">3</span>
                  <span class="text-body-tertiary">Contratos</span>
                </div>
              </div>
            </div>
            <div class="col-12 mt-2">
              <div class="d-flex gap-2 border border-light-subtle rounded shadow-sm p-1">
                <div class="col-3 d-flex justify-content-center align-items-center">
                  <i class='bx bxs-chevron-right'></i>
                </div>
                <div class="col-5 d-flex justify-content-left align-items-center">
                  <span class="d-block fw-semibold tecnico-dos">
                    San Peter
                  </span>
                </div>
                <div class="col-3 text-center">
                  <span class="fw-semibold contratosT2">3</span>
                  <span class="text-body-tertiary">Contratos</span>
                </div>
              </div>
            </div>
            <div class="col-12 mt-2">
              <div class="d-flex gap-2 border border-light-subtle rounded shadow-sm p-1">
                <div class="col-3 d-flex justify-content-center align-items-center">
                  <i class='bx bxs-chevron-right'></i>
                </div>
                <div class="col-5 d-flex justify-content-left align-items-center">
                  <span class="d-block fw-semibold tecnico-tres">
                    San Peter
                  </span>
                </div>
                <div class="col-3 text-center">
                  <span class="fw-semibold contratosT3">3</span>
                  <span class="text-body-tertiary">Contratos</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="container mt-4">
          <div class="row mb-3">
            <div class="col-12">
              <span class="fw-semibold">
                Tecnico con mas servicios
              </span>
              <hr>
            </div>
          </div>
          <div class="row">
            <div class="col-12">
              <div class="d-flex gap-2 border border-light-subtle rounded shadow-sm p-2">
                <div class="col-3 d-flex justify-content-center align-items-center">
                  <i class='bx bxs-chevron-right'></i>
                </div>
                <div class="col-5 d-flex justify-content-left align-items-center">
                  <span class="d-block fw-semibold tecnico-cuatro">
                    San Peter
                  </span>
                </div>
                <div class="col-3 text-center">
                  <span class="fw-semibold serviciosT4">12</span>
                  <span class="text-body-tertiary">servicios</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<form id="form-tecnico-nuevo">
  <div class="modal fade" id="tecnicosModal" tabindex="-1" aria-labelledby="tecnivosModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Creacion - Nuevo tecnico</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="mb-3 row">
            <div class="col">
              <label for="exampleFormControlInput1" class="form-label">Nombre</label>
              <input type="text" class="form-control form-control-sm nombre-tecnico" name="nombre-tecnico"
                id="exampleFormControlInput1" placeholder="Juan">
            </div>
            <div class="col">
              <label for="exampleFormControlInput1" class="form-label">Apellido</label>
              <input type="text" class="form-control form-control-sm apellido-tecnico" name="apellido-tecnico"
                id="exampleFormControlInput1" placeholder="Perez">
            </div>
          </div>
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Area de especializacion</label>
            <select class="form-select form-select-sm combo-area-e especializacion-tecnico"
              aria-label=".form-select-sm example" name="area-especializacion">
              <option selected>Selecione una opcion</option>
            </select>
          </div>
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Fecha de nacimiento</label>
            <input type="date" class="form-control form-control-sm fechaNacimiento-tecnico"
              id="exampleFormControlInput1" name="fecha-nacimiento">
          </div>
          <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Fecha de contratacion</label>
            <input type="date" class="form-control form-control-sm fechaContratacion-tecnico"
              id="exampleFormControlInput1" name="fecha-contratacion">
          </div>
          <div class="mb-3 row">
            <div class="col">
              <label for="exampleFormControlInput1" class="form-label">Salario</label>
              <input type="text" class="form-control form-control-sm salario-tecnico" id="exampleFormControlInput1"
                name="salario" placeholder="Ejemplo: 1200 Lps">
            </div>
            <div class="col">
              <!-- Tentativa -->
              <label for="exampleFormControlInput1" class="form-label">Horario</label>
              <select class="form-select form-select-sm combo-horario horario-tecnico"
                aria-label=".form-select-sm example" name="horario">
                <option selected>Selecione una opcion</option>
              </select>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
          <button type="submit" class="btn btn-primary" data-bs-dismiss="modal">Finalizar</button>
        </div>
      </div>
    </div>
  </div>
</form>