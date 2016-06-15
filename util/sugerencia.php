<?php
session_start();
require_once('DB.php');
$dbh = DB::getInstancia()->getDbh();
if(isset($_REQUEST['datos']))
{
    $datos = json_decode($_REQUEST['datos']);

    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/html; charset=UTF-8\r\n";

    $mensaje = "<h1>Ocio Los Palacios</h1>";
    $mensaje .= "<h3>Alguien ha querido contactar contigo.</h3>";
    $mensaje .= "<p>Datos:</p><ul>";
    $mensaje .= "<li>Nombre: ".$datos->nombre."</li>";
    $mensaje .= "<li>Motivo: ".$datos->motivo."</li>";
    $mensaje .= "<li>Metodos de contacto: <lu>";
    foreach ($datos->metodo as $clave => $valor)
        $mensaje .= "<li>".$valor."</li>";
    $mensaje .= "</ul><li>Mensaje: ".$datos->mensaje."</li>";

    if(mail("rogelioramos96@gmail.com", 'Han contactado en Ocio Palaciego', $mensaje, $headers))
        echo json_encode(array('estado' => 'ok', 'mensaje' => 'Mensaje enviado correctamente'));
    else
        echo json_encode(array('estado' => 'error', 'mensaje' => 'Fallo interno al enviar el mensaje.'));
}
else
    echo json_encode(array('estado' => 'error', 'mensaje' => 'El servidor no ha recibido los datos'));