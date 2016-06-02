<?php
//http://localhost/moni_locales/locales/123/yoqse
/*
if (isset($_GET['local'])){
    echo "yeah".$_GET['local']."--".$_GET['caca']."--";
} else {
    echo "nope";
}
die();
*/
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <?php include "plantillas/head.php"; ?>
    <link rel="stylesheet" href="css/rangeSlider.min.css">
</head>
<body>
    <?php include "plantillas/header.php"; ?>
    <!--<div id="mapa-select"">
        <div id="map" style="width: 100%; height: 450px;"></div>
    </div>-->

    <!-- Page Content -->
    <div class="container cuerpo">

        <div class="row">

            <!-- Blog Post Content Column -->
            <div class="col-lg-12">

                <!-- Blog Post -->

                <!-- Title -->
                <h3 id="local_nombre">Nombre Local</h3>

                <!-- Author -->
                <p id="local_categoria" class="lead">Categoria Local</p>

                <hr>

                <!-- Date/Time -->
                <p><span class="fa fa-map-marker"></span> <span id="local_direccion">Direccion</span></p>

                <hr>

                <!-- Preview Image -->
                <div id="divImg">
                    <img id="local_img" class="img-responsive" src="http://placehold.it/900x300" alt="Imagen del local">
                </div>

                <hr>

                <!-- Post Content -->
                <div id="local_breve_descripcion" class="lead">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus, vero, obcaecati, aut, error quam sapiente nemo saepe quibusdam sit excepturi nam quia corporis eligendi eos magni recusandae laborum minus inventore?</div>
                <div id="local_descripcion">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut, tenetur natus doloremque laborum quos iste ipsum rerum obcaecati impedit odit illo dolorum ab tempora nihil dicta earum fugiat. Temporibus, voluptatibus.</div>

                <hr>



                <!-- Blog Comments -->
                <?php


                ?>
                <!-- Puntuacion -->

                <h4><i class="fa fa-heart" aria-hidden="true"></i> Puntuacion media del local: <span id="puntuacion">5</span> / 10</h4>
                <p>¿Has visitado este local y quieres dar tu opinion?</p>

                <!-- Comments Form -->
                <div class="well" id="valoracion">
                    <h4>Deja tu valoración:</h4>
                    <form role="form" id="formComentario">
                        <div class="form-group">
                            <textarea class="form-control" rows="3" id="inputComentario" name="inputComentario"></textarea>
                        </div>
                        <p>Tu Puntuacion: <span id="puntuacionOutput"></span></p>
                        <input id="puntuacion" type=range min=0 max=10 value=5 step=0.5 data-rangeSlider>
                        <hr>
                        <p>
                            <small>En caso de que ya hayas valorado antes este local, el comentario y puntuación que introduzcas ahora sustituirá al antiguo.
                            </small>
                        </p>
                        <hr>
                        <p class="text-center"><button type="submit" class="btn btn-primary">Enviar</button></p>
                    </form>
                </div>

                <hr>



                <!-- Posted Comments -->
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h4>VALORACIONES</h4>
                    </div>
                    <div id="comentarios" class="panel-body">
                        <div class="divComentario">
                            <!-- Comment -->
                            <div class="media">
                                <a class="pull-left" href="#">
                                    <img class="media-object comentarioImagen" src="http://placehold.it/64x64" alt="" width="64px" height="64px">
                                </a>
                                <div class="media-body">
                                    <h4 class="media-heading comentarioAutor">Rogelio Ramos
                                        <small class="comentarioFecha">August 26, 2014 at 9:30 PM</small>
                                    </h4>
                                    <p class="comentario">
                                        Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
                                    </p>
                                    <p class="pull-right comentarioPuntuacion" style="text-decoration: underline">Puntuacion: 3 / 10</p>
                                </div>
                            </div>
                        </div>
<hr>
                        <div class="divComentario">
                            <!-- Comment -->
                            <div class="media">
                                <a class="pull-left" href="#">
                                    <img class="media-object comentarioImagen" src="http://placehold.it/64x64" alt="" width="64px" height="64px">
                                </a>
                                <div class="media-body">
                                    <h4 class="media-heading comentarioAutor">Antonio Manuel
                                        <small class="omentarioFecha">August 25, 2014 at 9:30 PM</small>
                                    </h4>
                                    <p class="comentario">
                                        Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
                                    </p>
                                    <p class="pull-right comentarioPuntuacion" style="text-decoration: underline">Puntuacion: 7 / 10</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <?php /*
                <div id="comentarios">
                    <!-- Comment -->
                    <div class="media">
                        <a class="pull-left" href="#">
                            <img class="media-object comentarioImagen" src="http://placehold.it/64x64" alt="" width="64px" height="64px">
                        </a>
                        <div class="media-body">
                            <h4 class="media-heading comentarioAutor">Start Bootstrap
                                <small class="comentarioFecha">August 25, 2014 at 9:30 PM</small>
                            </h4>
                            <h3 class="comentarioPuntuacion"></h3>
                            <p class="comentario">
                                Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
                            </p>
                        </div>
                    </div>
                </div>
                */?>
            </div>
        </div>
    </div>

    <?php include "plantillas/footer.php"; ?>
    <script src="js/rangeSlider.min.js"></script>
    <script src="js/local.js"></script>
</body>
</html>
