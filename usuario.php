<?php
session_start();
require_once('util/DB.php');

if( !isset($_SESSION['usuario']) && !isset($_GET['id']) ){
    header('Location: cuenta.php');
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <?php
    $name = "Usuario";
    include "plantillas/head.php";
    ?>
</head>
<body>
    <?php
        include "plantillas/header.php";
    ?>
    <section class="contact">
        <div class="container">
            <div class="row">
                <div class="col-md-8 col-md-offset-2">
                    <h2 onclick="$('#botones').toggle(150)" class="btn btn-default center-block">Mi cuenta</h2><br>
                    <div id="botones">
                        <?php if (isset($_SESSION['usuario'])){ ?>
                        <a id="botonLogout" class="btn btn-default btn-md center-block" role="button">
                            <i class="fa fa-sign-out fa-fw"></i> Cerrar sesión
                        </a><br>
                        <a id="botonVer" class="btn btn-default btn-md center-block" role="button" href="usuario.php?id=<?php echo $_SESSION['usuario']['id']; ?>">
                        <i class="fa fa-eye fa-fw"></i> Ver mi perfil
                        </a><br>
                        <?php } ?>
                        <a id="botonConfigurar" class="btn btn-default btn-md center-block" role="button" href="usuario.php">
                            <i class="fa fa-cog fa-fw"></i> <?php echo (isset($_SESSION['usuario'])) ? "Configurar cuenta" : "Iniciar sesion"; ?>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <hr>

    <section class="contact">
        <div class="container">
            <div class="row">
                <div class="col-md-8 col-md-offset-2" id="infoUsuario">
                    <?php
                    if( !isset($_GET['id']) ){
                        $usuario = $_SESSION['usuario'];
                    ?>
                        <!-- INICIO MODIFICAR -->
                        <h2>Configuración del perfil</h2>
                        <form action="?" class="form-horizontal" id="formConfig">
                            <div class="form-group">
                                <label for="email" class="control-label col-sm-2">Email</label>
                                <div class="col-sm-10">
                                    <input name="email" id="email" type="email" class="form-control" placeholder="email" required value="<?php echo $usuario['email']?>">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="nombre" class="control-label col-sm-2">Nombre</label>
                                <div class="col-sm-10">
                                    <input name="nombre" id="nombre" type="text" class="form-control" placeholder="Nombre" required value="<?php echo $usuario['nombre']?>"
                                           pattern="([A-Za-zñÑ\s]){3,}"
                                           title="El nombre debe tener al menos 3 carácteres y solo letras">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="apellidos" class="control-label col-sm-2">Apellidos</label>
                                <div class="col-sm-10">
                                    <input name="apellidos" id="apellidos" type="text" class="form-control" placeholder="Apellidos" required value="<?php echo $usuario['apellidos']?>"
                                           pattern="([A-Za-zñÑ\s]){3,}"
                                           title="Los apellidos deben tener al menos 3 carácteres y solo letras">
                                </div>
                            </div>
                            <div class="form-group">
                                <label for="descripcion" class="control-label col-sm-2">Descripcion</label>
                                <div class="col-sm-10">
                                    <textarea name="descripcion" id="descripcion" class="form-control" placeholder="Descripcion opcional"><?php echo $usuario['descripcion']?></textarea>
                                </div>
                            </div>
                            <button id="botonContraseña" class="btn btn-default btn-md center-block">
                                <i class="fa fa-key fa-fw"></i> Cambiar contraseña
                            </button>
                            <div id="divContraseña">
                                <small>
                                    <p class="help-block text-danger" id="help_pass"></p>
                                    <p class="help-block">Dejar en blanco o minimizar para no cambiar la contraseña.</p>
                                    <p class="help-block"><a style="cursor: pointer" onClick="$('#consejos_pass').toggle();">Consejos para elegir una buena contraseña</a><br/></p>
                                    <div class="well" id="consejos_pass" style="display:none;">
                                        <ul>
                                            <li>Debería tener al menos 8 caracteres.</li>
                                            <li>Combina mayúsculas y minúsculas.</li>
                                            <li>Incluye símbolos (!,%, &, @, #, $, ^, *,?, _, ~) o números.</li>
                                            <li>No incluyas datos personales como tu nombre o email.</li>
                                            <li>¡Haz que sea imposible de adivinar!</li>
                                        </ul>
                                    </div>
                                </small>
                                <div class="form-group">
                                    <label for="contraseña" class="control-label col-sm-2">Contraseña</label>
                                    <div class="col-sm-10">
                                        <input name="contraseña" id="contraseña" type="password" class="form-control" placeholder="Contraseña"
                                               pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
                                               title="La contraseña debe tener al menos 6 caracteres, incluyendo mayusculas, minusculas y numeros"
                                        >
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label for="conf_contraseña" class="control-label col-sm-2">Confirmar contraseña</label>
                                    <div class="col-sm-10">
                                        <input name="conf_contraseña" id="conf_contraseña" type="password" class="form-control" placeholder="Repite la contraseña">
                                    </div>
                                </div>
                            </div>
                            <input type="submit" id="btnModificar" name="btnModificar" value="Guardar cambios"/>
                        </form>
                        <!-- FIN MODIFICAR -->
                    <?php
                    } else {
                    ?>
                        <!-- INICIO INFORMACION -->
                        <h2>Perfil de <span  id="nombreUsuario"></span></h2>
                        <div>
                            <br><h4><i class="fa fa-envelope" aria-hidden="true"> Email</i>: <span id="emailUsuario">test@gmail.com</span></h4>
                        </div>
                        <div>
                            <h4>Descripcion:</h4><p id="descripcionUsuario">The idea of creating something out of nothing has always generated a passion in my heart. This is what lead me to website development. I can literally create little worlds that hopefully thousands of people can see and even experience.</p>
                        </div>
                        <hr>
                        <h2>Actividad</h2>
                        <div id="divActividad"></div>
                    <?php
                    }
                    ?>
                    <!-- FIN INFORMACION -->
                </div>
            </div>
        </div>
    </section>

    <?php include "plantillas/footer.php"; ?>
    <script src="js/usuario.js"></script>
</body>
</html>
