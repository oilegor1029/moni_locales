<?php
require_once('../util/DB.php');
session_start();
if(!isset($_SESSION['usuario']) || $_SESSION['usuario']['admin']==0)
    echo json_encode(array('estado' => 'error', 'mensaje' => 'Acceso denegado'));

$dbh = DB::getInstancia()->getDbh();
if(isset($_POST['dni']))
{
    $res = $dbh->query('SELECT * FROM usuario WHERE id = "' . $_POST['id'] . '"');
    if($res->rowCount() > 0)
    {
        $sql = 'DELETE FROM usuario WHERE id = "' . $_POST['id'] . '"';
        if($dbh->query($sql))
            echo json_encode(array('estado' => 'ok', 'mensaje' => 'Usuario eliminado correctamente'));
        else
            echo json_encode(array('estado' => 'error', 'mensaje' => 'No se ha podido eliminar el usuario'));
    }
    else
        echo json_encode(array('estado' => 'error', 'mensaje' => 'El usuario que intenta eliminar no se encuentra en la base de datos'));
}
else
    echo json_encode(array('estado' => 'error', 'mensaje' => 'El servidor no ha recibido los datos'));