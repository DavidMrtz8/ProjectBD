<div class="container">
    <?php
        include('header.php');
    ?>
    <div class="row mt-2">
        <div class="col-4 p-2">
            <div class="container header bg-white rounded p-2 shadow-sm">
                <div class="row">
                    <div class="px-5 py-4">
                        <span class="fs-5 fw-semibold">Perfil</span>
                        <hr>
                        <div class="d-flex justify-content-center">
                            <img src="./img/avatar.svg" alt="profile" style="width:30%">
                        </div>
                        <hr>
                            <div class="mb-3 d-flex gap-2">
                                <div class="col">
                                    <label for="exampleInputEmail1" class="form-label">Nombre</label>
                                    <input type="text" class="form-control form-control-sm nombreTecnico" id="exampleInputEmail1" aria-describedby="emailHelp">
                                </div>
                                <div class="col">
                                    <label for="exampleInputEmail1" class="form-label">Apellido</label>
                                    <input type="text" class="form-control form-control-sm apellidoTecnico" id="exampleInputEmail1" aria-describedby="emailHelp">
                                </div>
                            </div>
                            <div class="mb-3">
                            </div>
                            <div class="mb-3 d-flex gap-2">
                                <div class="col">
                                    <label for="exampleInputPassword1" class="form-label">Especialidad</label>
                                    <select class="form-select form-select-sm cmbEspecializacionTecnico combo-area-e" aria-label="Default select example">
                                        <option selected>Selecione una opcion</option>
                                    </select>    
                                </div>
                                <div class="col">
                                    <label for="exampleFormControlInput1" class="form-label">Horario</label>
                                    <select class="form-select form-select-sm combo-horario horario-tecnico "
                                        aria-label=".form-select-sm example" name="horario">
                                        <option selected>Selecione una opcion</option>
                                    </select>
                                </div>
                            </div>
                            <div class="mb-3 row">
                                <div class="col-6">
                                    <label for="exampleInputEmail1" class="form-label">Contratacion:</label>
                                    <input type="date" class="form-control form-control-sm contratacionTecnico" id="exampleInputEmail1" aria-describedby="emailHelp">
                                </div>
                                <div class="col-6">
                                    <label for="exampleInputEmail1" class="form-label">Nacio:</label>
                                    <input type="date" class="form-control form-control-sm nacimientoTecnico" id="exampleInputEmail1" aria-describedby="emailHelp2">
                                </div>
                            </div>
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Salario</label>
                                <input type="number" class="form-control form-control-sm salarioTecnico" id="exampleInputEmail1" aria-describedby="emailHelp">
                            </div>
                            <button type="submit" class="btn btn-primary w-100 btn-actualizar-tecnico">Guardar</button>
        
                    </div>
                </div>
            </div>
        </div>
        <div class="col-8 p-2">
            <div class="container header bg-white rounded p-4 shadow-sm" style="height:41vh">
                <span class="fs-6 fw-semibold">Contratos</span>
                <hr>
                <div class="w-100 bg-light d-flex gap-2 p-3 rey rounded overflow-x-auto contratosSee" style="height: 28vh">
                    <!-- Aqui se llena -->
                </div>
            </div>
            <div class="mt-3 container header bg-white rounded p-4 shadow-sm" style="height:40.5vh">
                <span class="fs-6 fw-semibold">Servicios</span>
                <hr>
                <div class="w-100 bg-light d-flex gap-2 p-3 rey rounded overflow-x-auto" style="height: 28vh">
                    <!-- Aqui se llena los servicios -->
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Aqui es donde pasa la magia -->

<div class="modal fade" id="visitaModal" tabindex="-1" aria-labelledby="visitaModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="visitaModalLabel">Detalles de la Visita</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="mb-3 row">
                    <div class="col">
                        <label for="exampleInputEmail1" class="form-label">Fecha de visita:</label>
                        <input type="date" class="form-control form-control-sm fechaVisita" id="exampleInputEmail1" aria-describedby="emailHelp">
                    </div>
                    <div class="col">
                        <label for="exampleInputEmail1" class="form-label">Horas a visitar</label>
                        <input type="number" class="form-control form-control-sm horasVisita" id="exampleInputEmail1" aria-describedby="emailHelp">
                    </div>
                </div>
                <div class="mb-3">
                    <button class="btn btn-light w-100" id="btnagregar">Agregar</button>
                </div>
                <div class="mb-3 overflow-auto table-scroll" style="height: 10rem">
                    <table class="table table-sm table-hover bordered table-clientes">
                        <thead class="thead-dark">
                            <tr>
                                <th>ContratoID</th>
                                <th>Fecha</th>
                                <th>Horas</th>
                            </tr>
                        </thead>
                        <tbody class="tbody-visita">
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            </div>
        </div>
    </div>
</div>
