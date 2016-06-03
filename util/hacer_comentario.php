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

    if(!preg_match('/([A-Za-zñÑ\s]){10,250}/', $datos->texto))
        $todoCorrecto = false;

    if(!preg_match('/^[\d]$/', $datos->puntuacion))
        $todoCorrecto = false;

    if($todoCorrecto)
    {
        $res = $dbh->query('SELECT * FROM local WHERE id = ' . $datos->id);
        if($datos->opcion == 'nuevo')
        {
            if($dbh->query('INSERT INTO local VALUES (NULL, "' . $datos->nombre . '", "' . $datos->breve_descripcion . '", "' . $datos->descripcion . '", "' . $datos->direccion . '", ' . $datos->lat . ', ' . $datos->lng . ', ' . $datos->categoria . ', "")'))
                echo json_encode(array('estado' => 'ok', 'lastId' => $dbh->lastInsertId(), 'mensaje' => 'Local registrado correctamente'));
            else
                echo json_encode(array('estado' => 'error', 'mensaje' => 'No se ha podido registrar el local'));
        }
        if($datos->opcion == 'modificar')
        {
            $res = $dbh->query('SELECT * FROM local WHERE id = ' . $datos->id);
            if($res->rowCount() > 0)
            {
                $sql = "UPDATE local SET nombre = '" . $datos->nombre . "', breve_descripcion = '" . $datos->breve_descripcion . "', descripcion = '" . $datos->descripcion . "', direccion = '" . $datos->direccion . "', lat = " . $datos->lat . ", lng = " . $datos->lng . ", categoria = " . $datos->categoria . " WHERE id = " . $datos->id;
                if($dbh->query($sql))
                    echo json_encode(array('estado' => 'ok', 'mensaje' => 'Local editado correctamente'));
                else
                    echo json_encode(array('estado' => 'error', 'mensaje' => 'No se ha podido editar el local'));
            }
            else
                echo json_encode(array('estado' => 'error', 'mensaje' => 'El local que intenta editar no se encuentra en la base de datos'));
        }
    }
    else
        echo json_encode(array('estado' => 'error', 'mensaje' => 'Datos incorrectos'));

}
else
    echo json_encode(array('estado' => 'error', 'mensaje' => 'El servidor no ha recibido los datos'));
