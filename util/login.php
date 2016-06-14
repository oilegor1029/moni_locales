<?php
require_once('DB.php');
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
            if (isset($datos->admin) && $fila->admin == 0 ) //SI LOGIN SOLO PARA ADMIN Y NO LO ES
                echo json_encode(array('estado' => 'error', 'mensaje' => 'El email o contraseña es incorrecto'));
            else{
                $_SESSION['usuario'] = array(
                    'id' => $fila->id ,
                    'email' => $fila->email,
                    'nombre' => $fila->nombre,
                    'apellidos' => $fila->apellidos,
                    'descripcion' => $fila->descripcion,
                    'admin' => $fila->admin
                );
                echo json_encode(array('estado' => 'ok', 'mensaje' => '¡Ahora ya puedes postear!'));
            }
        }
        else
            echo json_encode(array('estado' => 'error', 'mensaje' => 'El email o contraseña es incorrecto'));
    }
}
else
    echo json_encode(array('estado' => 'error', 'mensaje' => 'El servidor no ha podido recibir los datos.'));
