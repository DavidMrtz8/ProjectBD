<?php

require_once "../conexion.php";

$conexion = new Conexion();
if ($_SERVER["REQUEST_METHOD"] === "POST") {
  // Intentar decodificar los datos JSON recibidos
  $requestData = json_decode(file_get_contents("php://input"));

  if ($requestData !== null) {
    if (isset($requestData->procedimiento)) {
      $nombreProcedimiento = $requestData->procedimiento;

      if ($nombreProcedimiento === "spInsertarCliente") {
        $nombreCliente = $requestData->nombreCliente;
        $apellidoCliente = $requestData->apellidoCliente;
        $direccionCliente = $requestData->direccionCliente;
        $correoCliente = $requestData->correoCliente;
        $telefonoCliente = $requestData->telefonoCliente;

        $resultado = $conexion->ejecutarProcedimientoAlmacenado($nombreProcedimiento, [$nombreCliente, $apellidoCliente, $direccionCliente, $correoCliente, $telefonoCliente]);
      }

      if ($nombreProcedimiento === "spActualizarCliente") {
        $clienteID = $requestData->clienteID;
        $nombreCliente = $requestData->nombreCliente;
        $apellidoCliente = $requestData->apellidoCliente;
        $direccionCliente = $requestData->direccionCliente;
        $correoCliente = $requestData->correoCliente;
        $telefonoCliente = $requestData->telefonoCliente;

        $resultado = $conexion->ejecutarProcedimientoAlmacenado($nombreProcedimiento, [$clienteID, $nombreCliente, $apellidoCliente, $direccionCliente, $correoCliente, $telefonoCliente]);
      }
    }
  } else {
    $nombreProcedimiento = $_POST['procedimiento'];

    if (isset($_GET['getDataCliente']) && $_GET['getDataCliente'] === 'true') {
      $sql = "select * from vClientes";
      $result = $conexion->query($sql);

      // Almacena los datos en un array
      $data = array();
      while ($row = sqlsrv_fetch_array($result, SQLSRV_FETCH_ASSOC)) {
        $data[] = $row;
      }

      // Convierte los datos a formato JSON
      $jsonData = json_encode($data);

      // Devuelve los datos JSON
      echo $jsonData;
    }

    if ($nombreProcedimiento === "spEliminarCliente") {
      $id = $_POST['id'];
      $resultado = $conexion->ejecutarProcedimientoAlmacenado($nombreProcedimiento, [$id]);

      if ($resultado) {
        $response = array('success' => true, 'message' => 'Cliente eliminado exitosamente.');
      } else {
        $response = array('success' => false, 'message' => 'Error al eliminar el cliente.');
      }

      // Devolver la respuesta en formato JSON
      header('Content-Type: application/json');
      echo json_encode($response);
    }

    if ($nombreProcedimiento === "spMostrarDatosClientes") {
      $clienteID = $_POST['clienteID'];
      $resultado = $conexion->ejecutarProcedimientosAlmacenado($nombreProcedimiento, [$clienteID]);

      // Obtener los resultados del objeto de declaración
      $data = [];
      while ($row = sqlsrv_fetch_array($resultado, SQLSRV_FETCH_ASSOC)) {
        $data[] = $row;
      }

      // Convertir los resultados a formato JSON
      $resultadoJSON = json_encode($data);

      // Establecer encabezados para indicar que la respuesta es en formato JSON
      header('Content-Type: application/json');

      // Imprimir el resultado en formato JSON
      echo $resultadoJSON;
    }
  }
}