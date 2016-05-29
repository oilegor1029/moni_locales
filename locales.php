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
    <?php
    $name = "Locales";
    include "plantillas/head.php";
    ?>
</head>
<body>
    <?php include "plantillas/header.php"; ?>
    <div id="mapa-select"">
        <div id="map" style="width: 100%; height: 450px;"></div>
        <select id="selectMapa">
            <option value="0" selected>Todos</option>
            <option value="1">Bares y Restaurantes</option>
            <option value="2">Pubs y discotecas</option>
            <option value="3">Hoteles y hostales</option>
            <option value="4">Otros</option>
        </select>
    </div>
    <!-- portfolio section -->
    <section id="divLocales">
        <div class="container">
            <div class="row">
                <div class="col-md-12 text-center">
                    <h2>Categorias</h2>
                    <ul class="list-inline">
                        <li class="categoria active" data-id-cat="0">Todos</li>
                        <li class="categoria" data-id-cat="1">Bares y Restaurantes</li>
                        <li class="categoria" data-id-cat="2">Pubs y discotecas</li>
                        <li class="categoria" data-id-cat="3">Hoteles y hostales</li>
                        <li class="categoria" data-id-cat="4">Otros</li>
                    </ul>
                </div>
            </div>
            <div id="listaLocales" class="row"></div>
        </div>
    </section><!-- end of portfolios -->

    <?php include "plantillas/footer.php"; ?>
    <script src="js/locales.js"></script>
</body>
</html>
