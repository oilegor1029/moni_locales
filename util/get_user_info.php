<?php
require_once('DB.php');

session_start();
if(isset($_POST['datos']))
{
    $datos = json_decode($_POST['datos']);
    $dbh = DB::getInstancia()->getDbh();

    if ($res = $dbh->query('SELECT id, email, nombre, apellidos, descripcion FROM usuario WHERE id = ' . $datos->id))
    {
        if($res->rowCount() > 0)
        {
            $fila = $res->fetchObject();
            $usuario = array(
                'id' => $fila->id,
                'email' => $fila->email,
                'nombre' => $fila->nombre,
                'apellidos' => $fila->apellidos,
                'descripcion' => $fila->descripcion
            );
            echo json_encode(array('estado' => 'ok', 'usuario' => $usuario));
        }
        else
            echo json_encode(array('estado' => 'error', 'mensaje' => 'El usuario no existe'));
    }
}
else{
    $usuario = $_SESSION['usuario'];

    echo json_encode(array('estado' => 'ok', 'usuario' => $usuario));
}
