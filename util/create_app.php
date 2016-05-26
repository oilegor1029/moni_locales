<?php
session_start();
require_once('DB.php');
$db = DB::getInstancia();
if($db->crearEstructura())
    echo json_encode(array('estado' => 'ok', 'mensaje' => 'Estructura creada correctamente.'));
else
    echo json_encode(array('estado' => 'error', 'mensaje' => 'No se ha podido crear la estructura de la base de datos.'));