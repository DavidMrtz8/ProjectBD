<?php

require_once "../conexion.php";

$conexion = new Conexion();
if ($_SERVER["REQUEST_METHOD"] === "POST") {
  // Intentar decodificar los datos JSON recibidos
  $requestData = json_decode(file_get_contents("php://input"));

  if ($requestData !== null) {

  } else {
    $nombreProcedimiento = $_POST['procedimiento'];

    if (isset($_GET['getDataFacturas']) && $_GET['getDataFacturas'] === 'true') {
      $sql = "select * from vUltimasFacturas";
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

    if ($nombreProcedimiento === "spServiciosMasVendido") {
      $resultado = $conexion->ejecutarProcedimientosAlmacenado($nombreProcedimiento);

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

    if ($nombreProcedimiento === "spPaquetesMasVendidos") {
      $resultado = $conexion->ejecutarProcedimientosAlmacenado($nombreProcedimiento);

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

    if ($nombreProcedimiento === "spDatosGrafica") {
      $resultado = $conexion->ejecutarProcedimientosAlmacenado($nombreProcedimiento);

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