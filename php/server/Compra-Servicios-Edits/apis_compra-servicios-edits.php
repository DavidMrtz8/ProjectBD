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

      if ($nombreProcedimiento === "spActualizarCompraServicio") {
        $CompraServicioID = $requestData->CompraServicioID;
        $clienteID = $requestData->clienteID;
        $servicioID = $requestData->servicioID;
        $tecnicoID = $requestData->tecnicoID;
        $estadoID = $requestData->estadoID;

        $resultado = $conexion->ejecutarProcedimientoAlmacenado($nombreProcedimiento, [$CompraServicioID, $clienteID, $servicioID, $tecnicoID, $estadoID]);
      }

      if ($nombreProcedimiento === "spActualizarArticulosCompraServicios") {
        $CompraServicioID = $requestData->CompraServicioID;
        $articuloID = $requestData->articuloID;
        $cantidad = $requestData->cantidad;

        // Verificar si el servicioID ya existe en la base de datos
        $stmt = $conexion->ejecutarProcedimientosAlmacenado("spVerificarExistenciaArticuloCompraServicio", [$articuloID, $CompraServicioID]);
        $result = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC);

        if ($result["Result"] === 1) {
          echo "El articuloID ya existe en la base de datos.";
        } else {
          // El servicioID no existe, proceder con la actualización
          $resultado = $conexion->ejecutarProcedimientoAlmacenado($nombreProcedimiento, [$CompraServicioID, $articuloID, $cantidad]);
          echo "Actualización exitosa.";
        }
      }

      if ($nombreProcedimiento === "spEliminarArticuloCompraServicios") {
        $ArticuloID = $requestData->id;
        $CompraServicioID = $requestData->CompraServicioID;

        $resultado = $conexion->ejecutarProcedimientoAlmacenado($nombreProcedimiento, [$ArticuloID, $CompraServicioID]);

        if ($resultado) {
          $response = array('success' => true, 'message' => 'Articulo eliminado exitosamente.');
        } else {
          $response = array('success' => false, 'message' => 'Error al eliminar el articulo.');
        }

        header("Content-Type: application/json");
        echo json_encode($response);
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
    if (isset($_GET['getComboDataArticulos']) && $_GET['getComboDataArticulos'] === 'true') {
      $sql = "select * from vComboArticulos";
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

    if (isset($_GET['getComboDataEstadoCompraServicio']) && $_GET['getComboDataEstadoCompraServicio'] === 'true') {
      $sql = "select * from vComboEstadoCompraServicios";
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

    if (isset($_GET['getComboDataEstadoCompraArticulo']) && $_GET['getComboDataEstadoCompraArticulo'] === 'true') {
      $sql = "select * from vComboArticulos";
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

    if ($nombreProcedimiento === "spMostrarDatosCompraServicio") {
      $CompraServicioID = $_POST['CompraServicioID'];
      $resultado = $conexion->ejecutarProcedimientosAlmacenado($nombreProcedimiento, [$CompraServicioID]);

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

    if ($nombreProcedimiento === "spMostrarCompraServiciosArticulos") {
      $CompraServicioID = $_POST['CompraServicioID'];
      $resultado = $conexion->ejecutarProcedimientosAlmacenado($nombreProcedimiento, [$CompraServicioID]);

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
} else {
  echo "Método de solicitud no válido.";
}