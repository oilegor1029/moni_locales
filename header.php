<?php
//Temporal hasta que lo pase a smarty
?>

<!-- ====================================================
	header section -->
<div class="banner" id="home"></div>
<header class="header">
    <div class="container">
        <div class="row">
            <div class="col-md-8 col-md-offset-2 no-padding">
                <div class="col-md-12 text-center user">
                    <img src="img/escudo.png" alt="Me" class="img-circle">
                    <h1>Moñi Locales</h1>
                    <h4>Encuentra que hacer en Los Palacios y Villafranca de forma sencilla.</h4>
                </div>
                <!-- nav starts here -->
                <div class="col-md-12">
                    <div class="main-nav">
                        <nav class="navbar navbar-default">
                            <div class="container-fluid">
                                <!-- Brand and toggle get grouped for better mobile display -->
                                <div class="navbar-header">
                                    <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                                        <span class="sr-only">Toggle navigation</span>
                                        <span class="icon-bar"></span>
                                        <span class="icon-bar"></span>
                                        <span class="icon-bar"></span>
                                    </button>
                                </div>
                                <br>
                                <!-- Collect the nav links, forms, and other content for toggling -->
                                <div class="collapse navbar-collapse text-center" id="bs-example-navbar-collapse-1">
                                    <ul class="nav navbar-nav">
                                        <li><a href="index.php" <?php if($pagina=="mapa") echo "class='active'"; ?>>Mapa Moñi</a></li>
                                        <li><a href="locales.php" <?php if($pagina=="local") echo "class='active'"; ?>>Locales</a></li>
                                        <li><a href="contacto.php" <?php if($pagina=="contacto") echo "class='active'"; ?>>Contacta con nosotros</a></li>
                                        <li><a href="usuario.html" <?php if($pagina=="usuario") echo "class='active'"; ?>>Usuario</a></li>
                                    </ul>
                                </div><!-- /.navbar-collapse -->
                            </div><!-- /.container-fluid -->
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    </div>
</header><!-- end of header section -->
