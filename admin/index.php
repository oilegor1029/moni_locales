<?php
session_start();
if(isset($_SESSION['usuario'])){
    if ($_SESSION['usuario']['admin']!=0)    //Sesion de administrador activa
        header('Location: panel.php');              //Redirige al panel de administracion
    else{                                       //Sesion de cliente activa
        unset($_SESSION['usuario']);                //Cierra sesion de cuenta de cliente
        echo "<h1>-" . $_SESSION['usuario']['nombre'] . "-</h1>";
        echo "<h1>-" . $_SESSION['usuario']['admin'] . "-</h1>";
    }
}
?>
<!doctype html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <title>Acceso administración</title>
    <link rel="stylesheet" href="../css/lib/bootstrap.min.css"/>
    <link rel="stylesheet" href="../css/cuenta.css">

</head>
<body>

<div class="container" style="margin-top: 20px;">
    <div class="row">
        <div class="col-xs-12 col-sm-offset-4 col-sm-4 col-md text-center">
            <div class="panel panel-login" id="panel1">
                <div class="panel-heading">
                    <div class="row">
                        <div class="col-xs-12">
                            <a href="#" class="active" id="login-form-link">Inicio de sesión</a>
                        </div>
                    </div>
                    <hr>
                </div>
                <div class="panel-body">
                    <div class="row">
                        <div class="col-lg-12">
                            <form id="login-form" action="panel.php" method="post" role="form" style="display: block;">
                                <p>Inicia sesión con una cuenta de administrador.</p>
                                <div id="mensajeLogin"></div>
                                <div class="form-group">
                                    <input type="text" required name="email" id="email" tabindex="1" class="form-control" placeholder="Email" value="">
                                </div>
                                <div class="form-group">
                                    <input type="password" required name="password" id="password" tabindex="2" class="form-control" placeholder="Contraseña">
                                </div>
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-sm-6 col-sm-offset-3">
                                            <input type="submit" name="login-submit" id="login-submit" tabindex="3" class="form-control btn btn-login" value="Iniciar sesion">
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="row">
                                        <div class="col-lg-12">
                                            <div class="text-center">
                                                <a href=".." id="blog-link" tabindex="4" class="forgot-password">Volver a la web</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script src="../js/lib/jquery.js"></script>
<script src="../js/lib/bootstrap.min.js"></script>
<script src="../js/custom_admin.js"></script>
</body>
</html>

