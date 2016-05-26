<!DOCTYPE html>
<html lang="es">
<head>
    <script src="js/jquery-2.1.1.js"></script>
    <script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?key=AIzaSyDZ3QtDNa8RYGLchU4MBSZAYnvUH-2vFsI&sensor=false"></script>
    <?php
    $name = "Locales";
    include "plantillas/head.php";
    ?>
</head>
<body>
    <?php
        $pagina = "locales";
        include "plantillas/header.php";
    ?>
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
            <div id="listaLocales" class="row">
                <div class="panel panel-default infoWindow">
                    <div class="panel-heading">
                        <strong>Bar Manolo Mayo</strong>
                        <span style="float : right;margin-left: 5px;">
                            <a href=""><i class="fa fa-info" aria-hidden="true"></i> - Más información</a>
                        </span>
                    </div>
                    <div class="panel-body">
                        <table>
                            <tr>
                                <td max-width="130px">
                                    <img src="img/local/bar-manolo-mayo.jpg" alt="Imagen" width="130px;">
                                </td>
                                <td>
                                    <p>El Bar/Restaurante Manolo Mayo es un establecimiento que apuesta por la mezcla de lo tradicional junto a las novedades en la cocina tradicional.Cuenta con hotel en la planta superior</p>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div class="panel-footer" style="bottom: 0px">
                        Avenida de Sevilla, 29
                        <span style="float : right;margin-left: 5px;">
                            <a href=""><i class="fa fa-heart" aria-hidden="true"></i>Puntuación: 5</a>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    </section><!-- end of portfolios -->

    <?php include "plantillas/footer.php"; ?>
    <script src="js/map.js"></script>
</body>
</html>
