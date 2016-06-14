<?php
require_once('DB.php');

if(isset($_REQUEST['localID']) || isset($_REQUEST['usuarioID']) )
{
    $dbh = DB::getInstancia()->getDbh();

    //DATOS usuarioID, localID
    $sql = 'SELECT * FROM comentario WHERE ';

    if (isset($_REQUEST['localID']) && isset($_REQUEST['usuarioID']) )
        $sql .= 'local = ' . $_REQUEST['localID'] . ' AND usuario =' . $_REQUEST['usuarioID'];
    elseif (isset($_REQUEST['usuarioID']))
        $sql .= 'usuario =' . $_REQUEST['usuarioID'];
    else
        $sql .= 'local = ' . $_REQUEST['localID'];

    if ($res = $dbh->query($sql))
    {
        if($res->rowCount() > 0)
        {
            $puntuaciones = 0;
            $contador = 0;
            while ($fila = $res->fetchObject()){
                if ($resUser = $dbh->query('SELECT nombre, apellidos FROM usuario WHERE id = ' . $fila->usuario)) {
                    if ($resUser->rowCount() > 0) {
                        $usuarioDB = $resUser->fetchObject();
                        $usuarioNombre = $usuarioDB->nombre . " ". $usuarioDB->apellidos;
                    } else {
                        $usuarioNombre = "Fallo - Usuario inexistente.";
                    }
                }
                $comentario = array(
                    'id' => $fila->id,
                    'usuario' => $fila->usuario,
                    'usuarioNombre' => $usuarioNombre,
                    'local' => $fila->local,
                    'texto' => $fila->texto,
                    'puntuacion' => $fila->puntuacion,
                    'fecha' => $fila->fecha
                );
                $comentarios[] = $comentario;
                $puntuaciones += $fila->puntuacion;
                $contador++;
            }

            $puntuaciones = round($puntuaciones/$contador, 1);

            echo json_encode(array('estado' => 'ok', 'comentarios' => $comentarios, 'puntuaciones' => $puntuaciones));
        }
        else
            echo json_encode(array('estado' => 'error', 'mensaje' => 'No tiene valoraciones'));
    }
}
else
    echo json_encode(array('estado' => 'error', 'mensaje' => 'El servidor no ha podido recibir los datos.'));
