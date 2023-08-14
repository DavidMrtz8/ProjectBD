<?php
// Incluir el archivo con la clase de conexión a la base de datos (por ejemplo, "conexion.php")
require_once "../conexion.php";


$conexion = new Conexion();

$nombreProcedimiento = $_POST['procedimiento'];

if (isset($_GET['getDataFacturacion']) && $_GET['getDataFacturacion'] === 'true') {
  $sql = "select * from vFactura";
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

if ($nombreProcedimiento === "spFacuraDetalles") {
  $facturaID = $_POST['facturaID'];
  $resultado = $conexion->ejecutarProcedimientosAlmacenado($nombreProcedimiento, [$facturaID]);

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

if ($nombreProcedimiento === "spMostrarFunServicioDetallesFactura") {
  $compraID = $_POST['compraID'];
  $resultado = $conexion->ejecutarProcedimientosAlmacenado($nombreProcedimiento, [$compraID]);

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


if ($nombreProcedimiento === "spMostrarServiciosFacturas") {
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

?>