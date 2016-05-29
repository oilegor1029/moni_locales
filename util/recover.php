<?php
require_once('DB.php');
require_once('../entities/Usuario.php');
if(isset($_POST['datos']))
{
    $datos = json_decode($_POST['datos']);
    $dbh = DB::getInstancia()->getDbh();
    session_start();

    if ($res = $dbh->query('SELECT * FROM usuario WHERE email = "' . $datos->email . '"'))
    {
        if($res->rowCount() > 0) {
            $id = $res->fetchObject()->id;

            //Random Pass->
            $alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
            $pass = array(); //remember to declare $pass as an array
            $alphaLength = strlen($alphabet) - 1; //put the length -1 in cache
            for ($i = 0; $i < 8; $i++) {
                $n = rand(0, $alphaLength);
                $pass[] = $alphabet[$n];
            }
            $nuevaPass = implode($pass); //turn the array into a string
            //<-Random Pass
            
            $sql = "UPDATE usuario SET pass = '" . sha1($nuevaPass) . "'";
            $sql .= " WHERE id = '" . $id . "'";
            if ($dbh->query($sql)) {
                if (mail(
                    $datos->email,
                    'Nueva contraseña en Ocio Palaciego',
                    '<p>Tu nueva contraseña es: ' . $nuevaPass . '</p><p>Inicie sesión con esta y visite su perfil de usuario si desea cambiarla.</p>'))
                    echo json_encode(array('estado' => 'ok', 'mensaje' => 'Hemos enviado a tu email tu nueva contraseña. Mirelo e introduzcala. Luego puedes modificarla desde la configuración de su usuario'));
                else
                    echo json_encode(array('estado' => 'ok', 'mensaje' => 'Su nueva contraseña es ' . $nuevaPass . '. Cambiela en la configuración de su usuario si lo desea.'));
            } else {
                echo json_encode(array('estado' => 'error', 'mensaje' => 'Tenemos problemas internos, pruebe más tarde.'));
            }
        }
        else
            echo json_encode(array('estado' => 'error', 'mensaje' => 'No existe usuario con ese email'));
    }
}
else
    echo json_encode(array('estado' => 'error', 'mensaje' => 'El servidor no ha podido recibir los datos.'));