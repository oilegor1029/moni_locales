<?php
require_once('../util/DB.php');
session_start();
if(!isset($_SESSION['usuario']) || $_SESSION['usuario']['admin']==0)
    echo json_encode(array('estado' => 'error', 'mensaje' => 'Acceso denegado'));

$dbh = DB::getInstancia()->getDbh();
if(isset($_POST['id']))
{
    $res = $dbh->query('SELECT * FROM categoria WHERE id = "' . $_POST['id'] . '"');
    if($res->rowCount() > 0)
    {
        $sql = 'DELETE FROM categoria WHERE id = "' . $_POST['id'] . '"';
        if($dbh->query($sql))
            echo json_encode(array('estado' => 'ok', 'mensaje' => 'Categoría eliminada correctamente'));
        else
            echo json_encode(array('estado' => 'error', 'mensaje' => 'No se ha podido eliminar la categoría'));
    }
    else
        echo json_encode(array('estado' => 'error', 'mensaje' => 'La categoría que intenta eliminar no se encuentra en la base de datos'));
}
else
    echo json_encode(array('estado' => 'error', 'mensaje' => 'El servidor no ha recibido los datos'));