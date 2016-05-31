<?php
require_once('../util/DB.php');
require_once('../entities/Usuario.php');
session_start();
if(!isset($_SESSION['usuario']) || $_SESSION['usuario']->getAdmin()==0)
    echo json_encode(array('estado' => 'error', 'mensaje' => 'Acceso denegado'));


$dbh = DB::getInstancia()->getDbh();
if(isset($_POST['idLocal']))
{
    $res = $dbh->query('SELECT * FROM local WHERE id = ' . $_POST['idLocal']);
    if($res->rowCount() > 0)
    {
        $img = $res->fetchObject()->img;
        $sql = "DELETE FROM local WHERE id = " . $_POST['idLocal'];
        if($dbh->query($sql))
        {
            if($img != '')
            {
                if (@unlink('../img/local/' . $img))
                    echo json_encode(array('estado' => 'ok', 'mensaje' => 'Local eliminado correctamente'));
                else
                    echo json_encode(array('estado' => 'warning', 'mensaje' => 'El local ha sido eliminado correctamente, pero la imagen no ha podido ser borrada del sistema'));
            }
            else
                echo json_encode(array('estado' => 'ok', 'mensaje' => 'Local eliminado correctamente'));
        }
        else
            echo json_encode(array('estado' => 'error', 'mensaje' => 'No se ha podido eliminar el local'));
    }
    else
        echo json_encode(array('estado' => 'error', 'mensaje' => 'El local que intenta eliminar no se encuentra en la base de datos'));
}
else
    echo json_encode(array('estado' => 'error', 'mensaje' => 'El servidor no ha recibido los datos'));