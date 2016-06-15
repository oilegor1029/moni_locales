<?php
session_start();
require_once('DB.php');
$dbh = DB::getInstancia()->getDbh();
if(isset($_REQUEST['datos']))
{
    $datos = json_decode($_REQUEST['datos']);
    $todoCorrecto = true;

    if(!preg_match('/([A-Za-zñÑ\s]){3,}/', $datos->nombre))
        $todoCorrecto = false;

    if(!preg_match('/([A-Za-zñÑ\s]){3,}/', $datos->apellidos))
        $todoCorrecto = false;

    if(!preg_match('/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/', $datos->email))
        $todoCorrecto = false;

    if(!($datos->opcion == 'modificar' && $datos->pass == '') && !preg_match('/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/', $datos->pass))
        $todoCorrecto = false;
    
    if ($datos->pass != $datos->conf_pass)
        $todoCorrecto = false;

    if($todoCorrecto)
    {
        $existe = false;
        $res = $dbh->query('SELECT * FROM usuario WHERE email="' . $datos->email . '"');
        if($res->rowCount() > 0)
            $existe = true;

        if($datos->opcion == 'registrar')
        {
            if($existe)
                echo json_encode(array('estado' => 'error', 'mensaje' => 'Ya existe un usuario con ese mismo email'));
            else
            {
                if($dbh->query('INSERT INTO usuario VALUES (null, "' . $datos->email . '", "' . sha1($datos->pass) . '", "' . $datos->nombre . '", "' . $datos->apellidos . '", "' . $datos->descripcion . '", 0)'))
                {
                    if(mail($datos->email, 'Registro en Ocio Palaciego', 'Enhorabuena '. $datos->nombre.', usted se ha registrado en Ocio Palaciego.'))
                        echo json_encode(array('estado' => 'ok', 'mensaje' => 'Se ha registrado correctamente'));
                    else
                        echo json_encode(array('estado' => 'ok', 'mensaje' => 'Se ha registrado correctamente. Pero el correo electrónico no se ha podido enviar.'));
                }
                else
                    echo json_encode(array('estado' => 'error', 'mensaje' => 'No se ha podido registrar al cliente'));
            }
        } else if($datos->opcion == 'modificar')
        {
            if($existe)
            {
                $id = $res->fetchObject()->id;
                $sql = "UPDATE usuario SET email = '" . $datos->email . "', nombre = '" . $datos->nombre . "', apellidos = '".$datos->apellidos."', descripcion = '" . $datos->descripcion . "'";
                if($datos->pass != '')
                    $sql .= ", pass = '".sha1($datos->pass)."'";
                $sql .= " WHERE id = '" . $id . "'";
                if($dbh->query($sql))
                {
                    $clienteModificado = $dbh->query('SELECT * FROM usuario WHERE id="' . $id . '"');
                    $clienteModificado = $clienteModificado->fetchObject();
                    $_SESSION['usuario'] = [
                        'id' => $clienteModificado->id ,
                        'email' => $clienteModificado->email,
                        'nombre' => $clienteModificado->nombre,
                        'apellidos' => $clienteModificado->apellidos,
                        'descripcion' => $clienteModificado->descripcion,
                        'admin' => $clienteModificado->admin
                    ];
                    echo json_encode(array('estado' => 'ok', 'mensaje' => 'Datos editados correctamente'));
                }
                else
                    echo json_encode(array('estado' => 'error', 'mensaje' => 'No se ha podido editar los datos'));
            }
            else
                echo json_encode(array('estado' => 'error', 'mensaje' => 'No existe un usuario con ese email'));
        } else
            echo json_encode(array('estado' => 'error', 'mensaje' => 'No ha indicado el tipo'));
    }
    else
        echo json_encode(array('estado' => 'error', 'mensaje' => 'Datos incorrectos'));
}
else
    echo json_encode(array('estado' => 'error', 'mensaje' => 'El servidor no ha recibido los datos'));