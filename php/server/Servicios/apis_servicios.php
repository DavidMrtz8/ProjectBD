<?php
// Incluir el archivo con la clase de conexión a la base de datos (por ejemplo, "conexion.php")
require_once "../conexion.php";

$conexion = new Conexion();


// Obtener el nombre del procedimiento almacenado a ejecutar
$nombreProcedimiento = $_POST['procedimiento'];
// Procedimientos almacenados para la introducción de información
if ($nombreProcedimiento === "spInsertarNuevoServicio") {
  // Obtener los datos del formulario 1
  $nombre = $_POST['nombre'];
  $descripcion = $_POST['descripcion'];
  $precio = $_POST['precio'];

  $resultado = $conexion->ejecutarProcedimientoAlmacenado($nombreProcedimiento, [$nombre, $descripcion, $precio]);
}

if ($nombreProcedimiento === "spInsertarPaquete") {
  // Obtener los datos del formulario 2
  $nombre = $_POST['name-paquete'];
  $precio = $_POST['precio-i'];
  $servicio = $_POST['servicio-i'];

  $resultado = $conexion->ejecutarProcedimientoAlmacenado($nombreProcedimiento, [$nombre, $precio, $servicio]);
}

if ($nombreProcedimiento === "spActualizarTablaPaquetesDetalles") {
  $paqueteID = $_POST['paqueteID'];
  $servicio = $_POST['servicio'];

  $resultado = $conexion->ejecutarProcedimientoAlmacenado($nombreProcedimiento, [$paqueteID, $servicio]);
}

// Cargar datos a los comboBox

if (isset($_GET['getComboData']) && $_GET['getComboData'] === 'true') {
  $sql = "select * from vMostrarServicios";
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

if (isset($_GET['getDataTablePaquetes']) && $_GET['getDataTablePaquetes'] === 'true') {
  $sql = "select * from vMostrarPaquetes";
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

// Eliminar datos de las tablas
if ($nombreProcedimiento === "spEliminarServicio") {
  $id = $_POST['id'];
  $resultado = $conexion->ejecutarProcedimientoAlmacenado($nombreProcedimiento, [$id]);

  if ($resultado) {
    $response = array('success' => true, 'message' => 'Servicio eliminado exitosamente.');
  } else {
    $response = array('success' => false, 'message' => 'Error al eliminar el servicio.');
  }

  // Devolver la respuesta en formato JSON
  header('Content-Type: application/json');
  echo json_encode($response);
}

if ($nombreProcedimiento === "spEliminarPaquete") {
  $id = $_POST['id'];
  $resultado = $conexion->ejecutarProcedimientoAlmacenado($nombreProcedimiento, [$id]);

  if ($resultado) {
    $response = array('success' => true, 'message' => 'Paquete eliminado exitosamente.');
  } else {
    $response = array('success' => false, 'message' => 'Error al eliminar el paquete.');
  }

  // Devolver la respuesta en formato JSON
  header('Content-Type: application/json');
  echo json_encode($response);
}

if ($nombreProcedimiento === "spEliminarServicioPaquete") {
  $id = $_POST['id'];
  $resultado = $conexion->ejecutarProcedimientoAlmacenado($nombreProcedimiento, [$id]);

  if ($resultado) {
    $response = array('success' => true, 'message' => 'Servicio eliminado exitosamente.');
  } else {
    $response = array('success' => false, 'message' => 'Error al eliminar el servicio.');
  }

  // Devolver la respuesta en formato JSON
  header('Content-Type: application/json');
  echo json_encode($response);
}

if ($nombreProcedimiento === "spMostrarServiciosPaqueteEspecifico") {
  $paqueteID = $_POST['paqueteID'];
  $resultado = $conexion->ejecutarProcedimientosAlmacenado($nombreProcedimiento, [$paqueteID]);

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

if ($nombreProcedimiento === "spMostrarDatosPaquetes") {
  $paqueteID = $_POST['paqueteID'];
  $resultado = $conexion->ejecutarProcedimientosAlmacenado($nombreProcedimiento, [$paqueteID]);

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

// if ($nombreProcedimiento === "spActualizarDatosPaquete") {
//   $nombre = $_POST['nombre-paquete'];
//   $precio = $_POST['precioTotal'];
//   $horas = $_POST['horasEstablecidas'];
//   $paqueteID = $_POST['paqueteID'];

//   print_r($nombre);
//   $resultado = $conexion->ejecutarProcedimientoAlmacenado($nombreProcedimiento, [$paqueteID, $nombre, $horas, $precio]);
// }

?>