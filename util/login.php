<?php
require_once('DB.php');
require_once('../entities/Usuario.php');
if(isset($_POST['datos']))
{
    $datos = json_decode($_POST['datos']);
    $dbh = DB::getInstancia()->getDbh();
    session_start();

    if ($res = $dbh->query('SELECT * FROM usuario WHERE email = "' . $datos->email . '" AND pass = "' . sha1($datos->pass) . '"'))
    {
        if($res->rowCount() > 0)
        {
            $fila = $res->fetchObject();
            $_SESSION['usuario'] = new Usuario(
                $fila->id ,
                $fila->email,
                $fila->nombre,
                $fila->apellidos,
                $fila->descripcion,
                $fila->admin
            );
            if (isset($datos->admin) && $fila->admin == 0 ) //LOGIN SOLO PARA ADMIN
                echo json_encode(array('estado' => 'error', 'mensaje' => 'El email o contraseña es incorrecto'));
            else
                echo json_encode(array('estado' => 'ok', 'mensaje' => '¡Ahora ya puedes postear!'));
        }
        else
            echo json_encode(array('estado' => 'error', 'mensaje' => 'El email o contraseña es incorrecto'));
    }
}
else
    echo json_encode(array('estado' => 'error', 'mensaje' => 'El servidor no ha podido recibir los datos.'));