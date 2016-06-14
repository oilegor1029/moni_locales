<?php

require_once('DB.php');
session_start();
if(!isset($_SESSION['usuario']))
    echo json_encode(array('estado' => 'error', 'mensaje' => 'Acceso denegado, logueate antes de comentar.'));

$dbh = DB::getInstancia()->getDbh();
if(isset($_POST['datos']))
{
    $datos = json_decode($_POST['datos']);
    $todoCorrecto = true;

    //if(!preg_match('/([A-Za-zñÑ\s]){10,250}/', $datos->texto))
        //$todoCorrecto = false;

    //if(!preg_match('/^[\d]$/', $datos->puntuacion))
        //$todoCorrecto = false;

    if($todoCorrecto)
    {
        if($datos->opcion == 'nuevo')
        {
            if($dbh->query('INSERT INTO comentario VALUES (NULL, ' . $datos->usuarioID . ', ' . $datos->localID . ', "' . $datos->texto . '", ' . $datos->puntuacion . ', NULL)'))
                echo json_encode(array('estado' => 'ok', 'lastId' => $dbh->lastInsertId(), 'mensaje' => 'Valoracion registrada correctamente'));
            else
                echo json_encode(array('estado' => 'error', 'mensaje' => 'No se ha podido registrar la valoracion'));
        }
        if($datos->opcion == 'modificar')
        {
            $sql = "UPDATE comentario SET texto = '" . $datos->texto . "', puntuacion = " . $datos->puntuacion .
                " WHERE usuario = '" . $datos->usuarioID . "' AND local = '" . $datos->localID . "'";
            if($dbh->query($sql))
                echo json_encode(array('estado' => 'ok', 'mensaje' => 'Valoración editada correctamente'));
            else
                echo json_encode(array('estado' => 'error', 'mensaje' => 'No se ha podido editar la valoración'));
        }
    }
    else
        echo json_encode(array('estado' => 'error', 'mensaje' => 'Datos incorrectos'));

}
else
    echo json_encode(array('estado' => 'error', 'mensaje' => 'El servidor no ha recibido los datos'));
