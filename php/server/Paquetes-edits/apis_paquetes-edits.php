<?php
require_once "../conexion.php";

$conexion = new Conexion();

if ($_SERVER["REQUEST_METHOD"] === "POST") {
  // Intentar decodificar los datos JSON recibidos
  $requestData = json_decode(file_get_contents("php://input"));

  if ($requestData !== null) {
    if (isset($requestData->procedimiento)) {
      $nombreProcedimiento = $requestData->procedimiento;

      if ($nombreProcedimiento === "spEliminarServicioPaquete") {
        $idServicio = $requestData->id;
        $paqueteID = $requestData->paqueteID;

        $resultado = $conexion->ejecutarProcedimientoAlmacenado($nombreProcedimiento, [$idServicio, $paqueteID]);

        if ($resultado) {
          $response = array('success' => true, 'message' => 'Servicio eliminado exitosamente.');
        } else {
          $response = array('success' => false, 'message' => 'Error al eliminar el servicio.');
        }

        header("Content-Type: application/json");
        echo json_encode($response);
      } elseif ($nombreProcedimiento === "spActualizarDatosPaquete") {
        $nombre = $requestData->nombrePaquete;
        $precio = $requestData->precioTotal;
        $horas = $requestData->horasEstablecidas;
        $paqueteID = $requestData->paqueteID;

        $resultado = $conexion->ejecutarProcedimientoAlmacenado($nombreProcedimiento, [$paqueteID, $nombre, $horas, $precio]);
      }
    } else {
      echo "Datos incompletos.";
    }
  } else {
    // Datos no son JSON, asumir que se reciben a través de variables POST
    $nombreProcedimiento = $_POST['procedimiento'];

    if ($nombreProcedimiento === "spActualizarTablaPaquetesDetalles") {
      $paqueteID = $_POST['paqueteID'];
      $servicio = $_POST['servicio'];

      // Verificar si el servicioID ya existe en la base de datos
      $stmt = $conexion->ejecutarProcedimientosAlmacenado("spVerificarExistenciaServicio", [$servicio, $paqueteID]);
      $result = sqlsrv_fetch_array($stmt, SQLSRV_FETCH_ASSOC);

      if ($result["Result"] === 1) {
        echo "El servicioID ya existe en la base de datos.";
      } else {
        // El servicioID no existe, proceder con la actualización
        $resultado = $conexion->ejecutarProcedimientoAlmacenado($nombreProcedimiento, [$paqueteID, $servicio]);
        echo "Actualización exitosa.";
      }
    } else {
      echo "Procedimiento no válido.";
    }
  }
} else {
  echo "Método de solicitud no válido.";
}
?>