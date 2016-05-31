<?php
require_once('../entities/Usuario.php');
session_start();
if(!isset($_SESSION['usuario']) || $_SESSION['usuario']->getAdmin()==0)
    header('Location: index.php');
?>
<!doctype html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">
    <title>Panel de administración</title>
    <link rel="stylesheet" href="../css/bootstrap.min.css"/>
    <link rel="stylesheet" href="../css/font-awesome.min.css"/>
    <link rel="stylesheet" href="../css/toastr.min.css"/>
    <link rel="stylesheet" href="../css/no.more.tables.css"/>
    <link rel="stylesheet" href="../css/jquery.dataTables.min.css"/>
    <link rel="stylesheet" href="../css/admin.css"/>
</head>
<body>

<nav class="navbar navbar-default">
    <div class="container-fluid">
        <!-- Brand and toggle get grouped for better mobile display -->
        <div class="navbar-header">
            <button type="button" class="navbar-toggle navbar-toggle-sidebar collapsed">Menú</button>
            <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
                <span class="icon-bar"></span>
            </button>
            <a class="navbar-brand" href="#">Administración</a>
        </div>

        <!-- Collect the nav links, forms, and other content for toggling -->
        <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav navbar-right">
                <li><a href=".." target="_blank">Ocio Palaciego <span class="fa fa-external-link"></span></a></li>
                <li><p class="navbar-btn"><button class="btn btn-default" id="logout"><span class="fa fa-sign-out fa-fw"></span> Cerrar sesión</button></p></li>
            </ul>
        </div><!-- /.navbar-collapse -->
    </div><!-- /.container-fluid -->
</nav>
<div class="container-fluid main-container">
    <div class="col-md-2 sidebar">
        <div class="row">
            <!-- Menu -->
            <div class="side-menu">
                <nav class="navbar navbar-default" role="navigation" style="margin-bottom: 0">
                    <!-- Main Menu -->
                    <div class="side-menu-container">
                        <ul class="nav navbar-nav">
                            <li><a href="#" id="lista_usuarios"><span class="fa fa-users fa-fw"></span> Usuarios</a></li>
                            <li><a href="#" id="lista_categorias"><span class="fa fa-list-ul fa-fw"></span> Categorías</a></li>
                            <li><a href="#" id="lista_locales"><span class="fa fa-cubes fa-fw"></span> Locales</a></li>
                        </ul>
                    </div><!-- /.navbar-collapse -->
                </nav>
            </div>
        </div>
    </div>
    <div class="col-md-10" id="contenido">

    </div>
</div>

<script src="../js/jquery.js"></script>
<script src="../js/bootstrap.min.js"></script>
<script src="../js/toastr.min.js"></script>
<script src="../js/jquery.dataTables.min.js"></script>
<script src="../js/custom_admin.js"></script>
</body>
</html>