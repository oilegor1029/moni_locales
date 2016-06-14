<?php
session_start();
if(isset($_SESSION['usuario'])){
    header('Location: usuario.php');
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <?php
    $name = "Cuenta";
    include "plantillas/head.php";
    ?>
    <link rel="stylesheet" href="css/cuenta.css">
</head>
<body>
    <?php include "plantillas/header.php";?>

    <div id="ventana" class="container">
        <div class="row">
            <div class="col-md-6 col-md-offset-3">
                <div class="panel panel-login" id="panel1">
                    <div class="panel-heading">
                        <div class="row">
                            <div class="col-xs-6">
                                <a href="#" class="active" id="login-form-link">Inicio de sesión</a>
                            </div>
                            <div class="col-xs-6">
                                <a href="#" id="register-form-link">Registro</a>
                            </div>
                        </div>
                        <hr>
                    </div>
                    <div class="panel-body">
                        <div class="row">
                            <div class="col-lg-12">
                                <form id="login-form" action="usuario.php" method="post" role="form" style="display: block;">
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
                                                <input type="submit" name="login-submit" id="login-submit" tabindex="4" class="form-control btn btn-login" value="Iniciar sesion">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col-lg-12">
                                                <div class="text-center">
                                                    <a id="recover-form-link" tabindex="5" class="forgot-password">¿Olvidastes tu contraseña?</a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                                <form id="register-form" method="post" role="form" style="display: none;">
                                    <div class="form-group">
                                        <input type="email" required name="email" id="email" tabindex="1"
                                               class="form-control" placeholder="Email" value="">
                                    </div>
                                    <div class="form-group">
                                        <input type="password" required pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
                                               title="La contraseña debe tener al menos 6 caracteres, incluyendo mayusculas, minusculas y numeros"
                                               type="password" name="password" id="password" tabindex="2" class="form-control" placeholder="Contraseña">
                                    </div>
                                    <div class="form-group">
                                        <input type="password" required name="confirm-password" id="confirm-password" tabindex="3"
                                               class="form-control" placeholder="Confirmar contraseña">
                                    </div>
                                    <div class="form-group">
                                        <input type="text" required pattern="([A-Za-zñÑ\s]){3,}"
                                               title="El nombre debe tener al menos 3 carácteres"
                                               name="nombre" id="nombre" tabindex="4" class="form-control" placeholder="Nombre">
                                    </div>
                                    <div class="form-group">
                                        <input type="text" required pattern="([A-Za-zñÑ\s]){3,}"
                                               title="Los apellidos deben tener al menos 3 carácteres"
                                               name="apellidos" id="apellidos" tabindex="5" class="form-control" placeholder="Apellidos" value="">
                                    </div>
                                    <div class="form-group">
                                        <textarea rows="4" name="descripcion" id="descripcion" tabindex="6" class="form-control"
                                                  placeholder="Campo opcional.
Puedes escribir una descripción sobre ti para los usuarios que visiten tu perfil"></textarea>
                                    </div>
                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col-sm-6 col-sm-offset-3">
                                                <input type="submit" name="register-submit" id="register-submit" tabindex="4" class="form-control btn btn-register" value="Registrarme">
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="panel panel-login" id="panel2">
                    <div class="panel-heading">
                        <div class="row">
                            <div class="col-lg-12">
                                <a href="#" class="active" id="login-form-link">Recuperar contraseña</a>
                            </div>
                        </div>
                        <hr>
                    </div>
                    <div class="panel-body">
                        <div class="row">
                            <div class="col-lg-12">
                                <form id="recover-form" method="post" role="form" style="display: block;">
                                    <div id="mensajeRecover"></div>
                                    <div class="form-group">
                                        <input type="text" required name="email" id="email" tabindex="1" class="form-control" placeholder="Email" value="">
                                    </div>
                                    <div class="form-group">
                                        <div class="row">
                                            <div class="col-sm-6 col-sm-offset-3">
                                                <input type="submit" name="recover-submit" id="recover-submit" tabindex="4" class="form-control btn btn-login" value="Recuperar contraseña">
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
    <?php include "plantillas/footer.php"; ?>
    <script src="js/cuenta.js"></script>
</body>
</html>
