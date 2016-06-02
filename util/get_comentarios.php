<?php
require_once('DB.php');

if(isset($_REQUEST['localID']))
{
    $dbh = DB::getInstancia()->getDbh();
    session_start();

    //DATOS usuarioID, localID
    $sql = 'SELECT * FROM comentario WHERE local = "' . $_REQUEST['localID']. '"';
    if (isset($_REQUEST['usuarioID'])){
        $sql .= ' AND usuario =' . $datos->usuarioID . '"';
    } else {
        if ($res = $dbh->query($sql))
        {
            if($res->rowCount() > 0)
            {
                while ($fila = $res->fetchObject())
                    $comentarios[] = $fila;

                echo json_encode(array('estado' => 'ok', 'comentarios' => $comentarios));
            }
            else
                echo json_encode(array('estado' => 'error', 'mensaje' => 'El local no tiene valoraciones'));
        }
    }
}
else
    echo json_encode(array('estado' => 'error', 'mensaje' => 'El servidor no ha podido recibir los datos.'));
