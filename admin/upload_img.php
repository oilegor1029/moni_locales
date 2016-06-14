<?php
if(isset($_FILES["file"]))
{
    require_once('../util/DB.php');
    session_start();
    if(!isset($_SESSION['usuario']) || $_SESSION['usuario']['admin']==0)
        echo json_encode(array('estado' => 'error', 'mensaje' => 'Acceso denegado'));

    $dbh = DB::getInstancia()->getDbh();
    $idLocal = $_POST['id_local'];
    if ((($_FILES["file"]["type"] == "image/png") || ($_FILES["file"]["type"] == "image/jpg") || ($_FILES["file"]["type"] == "image/jpeg")) && ($_FILES["file"]["size"] < 10000000))
    {
        if ($_FILES["file"]["error"] > 0)
            echo json_encode(array('estado' => 'error', 'mensaje' => 'Código de error: ' . $_FILES["file"]["error"]));
        else
        {
            if(move_uploaded_file($_FILES['file']['tmp_name'], "../img/local/" . $_FILES['file']['name']))
            {
                if($res = $dbh->query('SELECT img FROM local WHERE id = ' . $idLocal));
                {
                    if($res->rowCount() > 0)
                    {
                        $img = $res->fetchObject()->img;
                        if($img != '')
                            unlink('../img/' . $img);
                    }
                }
                if($dbh->query("UPDATE local SET img = '" . $_FILES['file']['name'] . "' WHERE id = " . $idLocal))
                    echo json_encode(array('estado' => 'ok', 'mensaje' => 'Local editado correctamente', 'img' => $_FILES['file']['name'], 'idLocal' => $idLocal));
                else
                    echo json_encode(array('estado' => 'error', 'mensaje' => 'No se ha podido editar el local'));
            }
            else
                echo json_encode(array('estado' => 'error', 'mensaje' => 'El archivo no ha podido ser movido a la carpeta correspondiente en el servidor'));
        }
    }
    else
        echo json_encode(array('estado' => 'error', 'mensaje' => 'Tipo de imagen no válida o excede de 10mb'));
}
else
    echo json_encode(array('estado' => 'error', 'mensaje' => 'No se le ha enviado ninguna imagen. ($_FILES["file"] no existe)'));