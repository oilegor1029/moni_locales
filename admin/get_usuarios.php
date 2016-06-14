<?php
require_once('../util/DB.php');
session_start();
if(!isset($_SESSION['usuario']) || $_SESSION['usuario']['admin']==0)
    echo json_encode(array('estado' => 'error', 'mensaje' => 'Acceso denegado'));
else {
    $dbh = DB::getInstancia()->getDbh();
    $clientes = array();
    if ($res = $dbh->query('SELECT * FROM usuario'))
        while ($fila = $res->fetchObject())
            $usuarios[] = array('id' => $fila->id, 'email' => $fila->email, 'nombre' => $fila->nombre, 'apellidos' => $fila->apellidos, 'descripcion' => $fila->descripcion, 'admin' => $fila->admin);

    echo json_encode(array('estado' => 'ok', 'usuarios' => $usuarios));
}