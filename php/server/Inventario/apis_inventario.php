<?php

require_once "../conexion.php";

$conexion = new Conexion();
if ($_SERVER["REQUEST_METHOD"] === "POST") {
  // Intentar decodificar los datos JSON recibidos
  $requestData = json_decode(file_get_contents("php://input"));

  if ($requestData !== null) {
    if (isset($requestData->procedimiento)) {
      $nombreProcedimiento = $requestData->procedimiento;

      if ($nombreProcedimiento === "spInsertarNuevoArticulo") {
        $nombreArticulo = $requestData->nombreArticulo;
        $tipoArticulo = $requestData->tipoArticulo;
        $precio = $requestData->precio;
        $existencia = $requestData->existencia;

        $resultado = $conexion->ejecutarProcedimientoAlmacenado($nombreProcedimiento, [$nombreArticulo, $tipoArticulo, $existencia, $precio]);
      }

      if ($nombreProcedimiento === "spArtualizarArticulo") {
        $articuloID = $requestData->articuloID;
        $nombreArticulo = $requestData->nombreArticulo;
        $tipoArticulo = $requestData->tipoArticulo;
        $precio = $requestData->precio;
        $existencia = $requestData->existencia;

        $resultado = $conexion->ejecutarProcedimientoAlmacenado($nombreProcedimiento, [$articuloID, $nombreArticulo, $tipoArticulo, $existencia, $precio]);

      }
    }
  } else {
    $nombreProcedimiento = $_POST['procedimiento'];

    if (isset($_GET['getDataInventario']) && $_GET['getDataInventario'] === 'true') {
      $sql = "select * from vDataInventario";
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

    if ($nombreProcedimiento === "spEliminarArticuloInventario") {
      $id = $_POST['id'];
      $resultado = $conexion->ejecutarProcedimientoAlmacenado($nombreProcedimiento, [$id]);

      if ($resultado) {
        $response = array('success' => true, 'message' => 'Articulo eliminado exitosamente.');
      } else {
        $response = array('success' => false, 'message' => 'Error al eliminar el articulo.');
      }

      // Devolver la respuesta en formato JSON
      header('Content-Type: application/json');
      echo json_encode($response);
    }

    if ($nombreProcedimiento === "spMostrarDatosArticulo") {
      $articuloID = $_POST['articuloID'];
      $resultado = $conexion->ejecutarProcedimientosAlmacenado($nombreProcedimiento, [$articuloID]);

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

    if (isset($_GET['getComboDataTipoArticulo']) && $_GET['getComboDataTipoArticulo'] === 'true') {
      $sql = "select * from vComboTipoArticulo";
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
  }
}