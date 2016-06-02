<?php
require_once('DB.php');
require_once('../entities/Usuario.php');
if(isset($_POST['datos']))
{
    $datos = json_decode($_POST['datos']);
    $dbh = DB::getInstancia()->getDbh();
    session_start();

    if ($res = $dbh->query('SELECT id, email, nombre, apellidos FROM usuario WHERE id = "' . $datos->id . '"'))
    {
        if($res->rowCount() > 0)
        {
            $fila = $res->fetchObject();
            $usuario = array(
                'id' => $fila->id,
                'email' => $fila->email,
                'nombre' => $fila->nombre,
                'apellidos' => $fila->apellidos
            );
            echo json_encode(array('estado' => 'ok', 'usuario' => $usuario));
        }
        else
            echo json_encode(array('estado' => 'error', 'mensaje' => 'El usuario no existe'));
    }
}
else
    echo json_encode(array('estado' => 'error', 'mensaje' => 'El servidor no ha podido recibir los datos.'));
