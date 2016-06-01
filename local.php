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
    <script src="js/jquery.js"></script>
    <script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?key=AIzaSyDZ3QtDNa8RYGLchU4MBSZAYnvUH-2vFsI&sensor=false"></script>
    <?php include "plantillas/head.php"; ?>
</head>
<body>
    <?php include "plantillas/header.php"; ?>
    <!--<div id="mapa-select"">
        <div id="map" style="width: 100%; height: 450px;"></div>
    </div>-->

    <!-- Page Content -->
    <div class="container">

        <div class="row">

            <!-- Blog Post Content Column -->
            <div class="col-lg-12">

                <!-- Blog Post -->

                <!-- Title -->
                <h2 id="local_nombre">Nombre Local</h2>

                <!-- Author -->
                <p id="local_categoria" class="lead">Categoria Local</p>

                <hr>

                <!-- Date/Time -->
                <p><span class="fa fa-map-marker"></span> <span id="local_direccion">Avenida Utrera</span></p>

                <hr>

                <!-- Preview Image -->
                <img id="local_imagen" class="img-responsive" src="http://placehold.it/900x300" alt="Imagen del local">

                <hr>

                <!-- Post Content -->
                <div id="local_breve_descripcion" class="lead">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus, vero, obcaecati, aut, error quam sapiente nemo saepe quibusdam sit excepturi nam quia corporis eligendi eos magni recusandae laborum minus inventore?</div>
                <div id="local_descripcion">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ut, tenetur natus doloremque laborum quos iste ipsum rerum obcaecati impedit odit illo dolorum ab tempora nihil dicta earum fugiat. Temporibus, voluptatibus.</div>

                <hr>

                <!-- Blog Comments -->

                <!-- Comments Form -->
                <div class="well">
                    <h4>Deja tu valoración:</h4>
                    <form role="form" id="formComentario">
                        <div class="form-group">
                            <textarea class="form-control" rows="3" id="inputComentario" name="inputComentario"></textarea>
                        </div>
                        <button type="submit" class="btn btn-primary">Submit</button>
                    </form>
                </div>

                <hr>

                <!-- Posted Comments -->

                <!-- Comment -->
                <div class="media">
                    <a class="pull-left" href="#">
                        <img class="media-object comentarioImagen" src="http://placehold.it/64x64" alt="">
                    </a>
                    <div class="media-body">
                        <h4 class="media-heading comentarioAutor">Start Bootstrap
                            <small class="comentarioFecha">August 25, 2014 at 9:30 PM</small>
                        </h4>
                        <h3 class="puntuacion"></h3>
                        <p class="comentario">
                            Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin commodo. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
                        </p>
                    </div>
                </div>

            </div>
        </div>
    </div>

    <?php include "plantillas/footer.php"; ?>
    <script src="js/locales.js"></script>
</body>
</html>
