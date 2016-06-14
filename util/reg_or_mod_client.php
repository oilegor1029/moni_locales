<?php
session_start();
require_once('DB.php');
$dbh = DB::getInstancia()->getDbh();
if(isset($_POST['datos']))
{
    $datos = json_decode($_POST['datos']);
    $todoCorrecto = true;


    if(!preg_match('/([A-Za-zñÑ\s]){3,}/', $datos->nombre))
        $todoCorrecto = false;

    if(!preg_match('/([A-Za-zñÑ\s]){3,}/', $datos->apellidos))
        $todoCorrecto = false;

    if(!preg_match('/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,3})$/', $datos->email))
        $todoCorrecto = false;

    if(!($datos->opcion == 'modificar' && $datos->pass == '') && !preg_match('/^.{8,}/', $datos->pass))
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
                if($dbh->query('INSERT INTO usuario VALUES ("' . $datos->email . '", "' . sha1($datos->pass) . '", "' . $datos->nombre . '", "' . $datos->apellidos . '", "' . $datos->descripcion . '", 0)'))
                {
                    if(mail($datos->email, 'Registro en Ocio Palaciego', 'Enhorabuena '. $datos->nombre.', usted se ha registrado en Ocio Palaciego.'))
                        echo json_encode(array('estado' => 'ok', 'mensaje' => 'Se ha registrado correctamente'));
                    else
                        echo json_encode(array('estado' => 'ok', 'mensaje' => 'Se ha registrado correctamente. Pero el correo electrónico no se ha podido enviar.'));
                }
                else
                    echo json_encode(array('estado' => 'error', 'mensaje' => 'No se ha podido registrar al cliente'));
            }
        }
        if($datos->opcion == 'modificar')
        {
            if($existe)
            {
                $id = $res->fetchObject()->id;
                $sql = "UPDATE cliente SET email = '" . $datos->email . "', nombre = '" . $datos->nombre . "', apellidos = '".$datos->apellidos."', descripcion = '" . $datos->descripcion . "'";
                if($datos->pass != '')
                    $sql .= ", pass = '".sha1($datos->pass)."'";
                $sql .= " WHERE id = '" . $id . "'";
                if($dbh->query($sql))
                {
                    /*
                    $clienteModificado = $dbh->query('SELECT * FROM usuario WHERE id="' . $id . '"');
                    $clienteModificado = $clienteModificado->fetchObject();
                    $_SESSION['usuario'] = new Usuario(
                        $clienteModificado->id ,
                        $clienteModificado->email,
                        $clienteModificado->nombre,
                        $clienteModificado->apellidos,
                        $clienteModificado->descripcion,
                        $clienteModificado->admin
                    );
                    */
                    echo json_encode(array('estado' => 'ok', 'mensaje' => 'Datos editados correctamente'));
                }
                else
                    echo json_encode(array('estado' => 'error', 'mensaje' => 'No se ha podido editar los datos'));
            }
            else
                echo json_encode(array('estado' => 'error', 'mensaje' => 'No existe un usuario con ese email'));
        }

    }
    else
        echo json_encode(array('estado' => 'error', 'mensaje' => 'Datos incorrectos'));

}
else
    echo json_encode(array('estado' => 'error', 'mensaje' => 'El servidor no ha recibido los datos'));