<?php

require_once "../conexion.php";

$conexion = new Conexion();

// Obtener el nombre del procedimiento almacenado a ejecutar
if ($_SERVER["REQUEST_METHOD"] === "POST") {
  // Intentar decodificar los datos JSON recibidos
  $requestData = json_decode(file_get_contents("php://input"));

  if ($requestData !== null) {
    if (isset($requestData->procedimiento)) {
      $nombreProcedimiento = $requestData->procedimiento;

      if ($nombreProcedimiento === "spInsertarCompraServicio") {
        $cliente = $requestData->clienteID;
        $servicio = $requestData->servicioID;
        $tecnico = $requestData->tecnicoID;

        $resultado = $conexion->ejecutarProcedimientoAlmacenado($nombreProcedimiento, [$cliente, $servicio, $tecnico]);
      }
    }
  } else {
    $nombreProcedimiento = $_POST['procedimiento'];

    if (isset($_GET['getComboDataServicios']) && $_GET['getComboDataServicios'] === 'true') {
      $sql = "select * from vServicios";
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

    if (isset($_GET['getDataEstadoCompraServicios']) && $_GET['getDataEstadoCompraServicios'] === 'true') {
      $sql = "select * from vCompraServicios";
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

    if ($nombreProcedimiento === "spEliminarCompraServicio") {
      $id = $_POST['id'];
      $resultado = $conexion->ejecutarProcedimientoAlmacenado($nombreProcedimiento, [$id]);

      if ($resultado) {
        $response = array('success' => true, 'message' => 'Compra servicio eliminada exitosamente.');
      } else {
        $response = array('success' => false, 'message' => 'Error al eliminar la compra de servicio.');
      }

      // Devolver la respuesta en formato JSON
      header('Content-Type: application/json');
      echo json_encode($response);
    }
  }
} else {
  echo "Método de solicitud no válido.";
}