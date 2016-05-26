<?php
require_once('util/DB.php');
$dbh = DB::getInstancia()->getDbh();
$categorias = array();
if($res = $dbh->query('SELECT * FROM categoria'))
{
    if($res->rowCount() > 0)
    {
        while ($fila = $res->fetchObject())
            $categorias[] = array('cod' => $fila->cod, 'nombre' => $fila->nombre);

        echo json_encode(array('estado' => 'ok', 'categorias' => $categorias));
    }
    else
        echo json_encode(array('estado' => 'error', 'mensaje' => 'No hay categorías.'));
}



