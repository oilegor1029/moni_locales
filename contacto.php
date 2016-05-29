<?php
session_start();
if(isset($_SESSION['usuario'])){
    $sesionIniciada = true;
    $nombre = $_SESSION['usuario']->getNombre() . " " . $_SESSION['usuario']->getApellidos();
    $email = $_SESSION['usuario']->getEmail();
} else $sesionIniciada = false;
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <?php
        $name = "Contacto";
        include "plantillas/head.php";
    ?>
</head>
<body>
    <?php include "plantillas/header.php"; ?>

    <!-- about section -->
    <section class="contact text-center">
        <div class="container">
            <div class="row">
                <div class="col-md-8 col-md-offset-2">
                    <h2>Ponte en contacto</h2>
                    <span>Rellena los datos y cuéntanos que necesitas</span>
                    <form action="?" class="form-horizontal">
                        <div class="form-group">
                            <label for="nombre" class="control-label col-sm-2">Nombre</label>
                            <div class="col-sm-10">
                                <input name="nombre" id="nombre" type="text" class="form-control" placeholder="Nombre completo"
                                       required value="<?php echo $sesionIniciada ? $nombre : ''?>">
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="mensaje" class="control-label col-sm-2">Mensaje</label>
                            <div class="col-sm-10">
                                <textarea name="mensaje" id="mensaje" rows="5" class="form-control" placeholder="Escribe tu mensaje" required></textarea>
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="motivo" class="control-label col-sm-2">Motivo</label>
                            <div class="col-sm-10">
                                <select name="motivo" id="motivo" class="form-control">
                                    <option value="0">--- Motivo por el que contactas ---</option>
                                    <option value="Sugerencia">Sugerencia de un lugar que conozco</option>
                                    <option value="Dueño">Soy el dueño de uno de los locales</option>
                                    <option value="Problema">Problema o fallo en la web</option>
                                    <option value="Otros">Otros</option>
                                </select>
                            </div>
                        </div>

                        <p>Elige al menos un método de contacto para responderte:</p>
                        <div id="metodoContacto" class="panel panel-default">
                            <div class="form-group">
                                <label for="email" id="email" class="control-label col-sm-2"><input type="checkbox" value="email"> Email</label>
                                <div class="col-sm-10">
                                    <input name="email" type="email" class="form-control" placeholder="Correo electrónico"
                                           readonly value="<?php echo $sesionIniciada ? $email : ''?>">
                                </div>
                            </div>

                            <div class="form-group">
                                <label for="telefono" id="telefono" class="control-label col-sm-2"><input type="checkbox" value="telefono"> Teléfono</label>
                                <div class="col-sm-10">
                                    <input name="telefono" type="text" class="form-control" Placeholder="Número de teléfono" readonly>
                                </div>
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-sm-offset-2 col-sm-10">
                                <input type="submit" class="form-control" value="Submit Your Message">
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>

    <?php include "plantillas/footer.php"; ?>
</body>
</html>
