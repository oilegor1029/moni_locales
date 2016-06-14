<?php
require_once('../util/DB.php');
session_start();
if(!isset($_SESSION['usuario']) || $_SESSION['usuario']['admin']==0)
    echo json_encode(array('estado' => 'error', 'mensaje' => 'Acceso denegado'));

$dbh = DB::getInstancia()->getDbh();
if(isset($_POST['datos']))
{
    $datos = json_decode($_POST['datos']);

    if(preg_match('/([A-Za-zñÑ\s]){4,10}/', $datos->nombre))
    {
        if($datos->opcion == 'nuevo')
        {
            if($dbh->query('INSERT INTO categoria VALUES (NULL, "' . $datos->nombre . '")'))
                echo json_encode(array('estado' => 'ok', 'mensaje' => 'Categoría registrada correctamente'));
            else
                echo json_encode(array('estado' => 'error', 'mensaje' => 'No se ha podido registrar el producto'));
        }
        if($datos->opcion == 'modificar')
        {
            $res = $dbh->query('SELECT * FROM categoria WHERE id = ' . $datos->id);
            if($res->rowCount() > 0)
            {
                $sql = "UPDATE categoria SET nombre = '" . $datos->nombre . "' WHERE id = " . $datos->id;
                if($dbh->query($sql))
                    echo json_encode(array('estado' => 'ok', 'mensaje' => 'Categoría editada correctamente'));
                else
                    echo json_encode(array('estado' => 'error', 'mensaje' => 'No se ha podido editar la categoría'));
            }
            else
                echo json_encode(array('estado' => 'error', 'mensaje' => 'La categoría que intenta editar no se encuentra en la base de datos'));
        }
    }
    else
        echo json_encode(array('estado' => 'error', 'mensaje' => 'Datos incorrectos'));

}
else
    echo json_encode(array('estado' => 'error', 'mensaje' => 'El servidor no ha recibido los datos'));