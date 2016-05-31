<?php
require_once('DB.php');
$dbh = DB::getInstancia()->getDbh();
$categorias = array();
if($res = $dbh->query('SELECT * FROM categoria'))
{
    if($res->rowCount() > 0)
    {
        while ($fila = $res->fetchObject())
            $categorias[] = array('id' => $fila->id, 'nombre' => $fila->nombre);

        echo json_encode(array('estado' => 'ok', 'categorias' => $categorias));
    }
    else
        echo json_encode(array('estado' => 'error', 'mensaje' => 'No hay categorías.'));
}



