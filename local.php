<?php
session_start();
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <?php
    $name = "Local";
    include "plantillas/head.php"; ?>
    <link rel="stylesheet" href="css/lib/rangeSlider.min.css">
</head>
<body>
    <?php include "plantillas/header.php"; ?>
    <!--<div id="mapa-select"">
        <div id="map" style="width: 100%; height: 450px;"></div>
    </div>-->

    <div class="container cuerpo">

        <div class="row">

            <div class="col-lg-12">

                <h3 id="local_nombre"></h3>

                <p id="local_categoria" class="lead"></p>

                <hr>

                <p><span class="fa fa-map-marker"></span> <span id="local_direccion"></span></p>

                <hr>

                <div id="divImg">
                    <img id="local_img" class="img-responsive" src="http://placehold.it/900x300" alt="Imagen del local">
                </div>

                <hr>

                <div id="local_breve_descripcion" class="lead"></div>
                <div id="local_descripcion"></div>

                <hr>

                <!-- Puntuacion -->

                <h4><i class="fa fa-heart" aria-hidden="true"></i> Puntuacion media del local: <span id="puntuacion"> Sin valoraciones </span></h4>
                <p>¿Has visitado este local y quieres dar tu opinion?</p>


                <div class="well" id="valoracion">
                    <h4>Deja tu valoración:</h4>
                    <div id="divValoracion">
                <?php
                if (isset($_SESSION['usuario']))
                {
                ?>
                    <form method="post" id="formComentario">
                        <div class="form-group">
                            <textarea class="form-control" rows="3" maxlength="250" minlength="10"
                                      id="inputComentario" name="inputComentario"></textarea>
                        </div>
                        <p>Tu Puntuacion: <span id="puntuacionOutput"></span></p>
                        <input id="inputPuntuacion" type=range min=0 max=10 value=5 step=0.5 data-rangeSlider>
                        <hr>
                        <p>
                            <small>En caso de que ya hayas valorado antes este local, el comentario y puntuación que
                                introduzcas ahora sustituirá al antiguo.
                            </small>
                        </p>
                        <hr>
                        <p class="text-center">
                            <button type="submit" class="btn btn-primary">Enviar</button>
                        </p>
                    </form>
                <?php
                }else
                {
                ?>
                    <form id="login-form" action="usuario.php" method="post" role="form" style="display: block;">
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
                                <div class="col-sm-6 col-sm-offset-3" style="text-align:center">
                                    <a type="submit" tabindex="5" href="cuenta.php">Registrate</a>
                                </div>
                            </div>
                        </div>
                    </form>
                <?php
                }
                ?>
                    </div>
                </div>
                <hr>

                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h4>VALORACIONES</h4>
                    </div>
                    <div id="comentarios" class="panel-body"></div>
                </div>
            </div>
        </div>
    </div>

    <?php include "plantillas/footer.php"; ?>
    <script src="js/lib/rangeSlider.min.js"></script>
    <script src="js/local.js"></script>
</body>
</html>
