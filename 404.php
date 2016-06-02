<!DOCTYPE html>
<html lang="es">
<head>
    <?php
    $name = "404";
    include "plantillas/head.php";
    ?>
</head>
<body>
    <?php include "plantillas/header.php";?>
    <hr>
    <div class="text-center ">
        <h2><i class="fa fa-frown-o" aria-hidden="true"></i> Pagina no encontrada <i class="fa fa-frown-o" aria-hidden="true"></i></h2>
        <h3>La direccion a la que intentas entrar no existe.</h3>
        <h3><a href="index.php" class="button button-default">Click aqui para volver</a></h3>
    </div>
    <hr>
    <?php include "plantillas/footer.php"; ?>
</body>
</html>
