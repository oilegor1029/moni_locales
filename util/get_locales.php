<?php
require_once('DB.php');
$dbh = DB::getInstancia()->getDbh();

if(isset($_REQUEST['categoria']))
{
    $sql = 'SELECT * from local';
    if($_REQUEST['categoria'] != 0)
        $sql .= ' WHERE categoria = ' . $_REQUEST['categoria'] . '';

    $locales = array();
    if($res = $dbh->query($sql))
    {
        while($fila = $res->fetchObject())
            $locales[] = $fila;

        echo json_encode(array('estado' => 'ok', 'locales' => $locales));
    }
    else
        echo json_encode(array('estado' => 'error', 'mensaje' => 'No se ha podido obtener los locales'));
}