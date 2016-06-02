<?php
require_once('DB.php');
$dbh = DB::getInstancia()->getDbh();

if(isset($_REQUEST['id']))
{
    $sql = 'SELECT * from local WHERE id = ' . $_REQUEST['id'] . '';

    if($res = $dbh->query($sql))
    {
        if($res->rowCount() > 0)
        {
            $local = $res->fetchObject();
            echo json_encode(array('estado' => 'ok', 'local' => $local));
        }
        else
            echo json_encode(array('estado' => 'error', 'mensaje' => 'El local no existe'));
    }

}else
    echo json_encode(array('estado' => 'error', 'mensaje' => 'El servidor no ha recibido el id del local'));
