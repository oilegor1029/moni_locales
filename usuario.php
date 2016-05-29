<?php
session_start();
if(!isset($_SESSION['usuario'])){
    header('Location: cuenta.php');
}
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <?php
    $name = "";
    include "plantillas/head.php";
    ?>
</head>
<body>
    <?php
        $pagina = "";
        include "plantillas/header.php";
    ?>
    <section class="contact">
        <div class="container">
            <div class="row">
                <div class="col-md-8 col-md-offset-2" id="infoUsuario">
                    <h2>Configurando tu perfil</h2>
                    <span>Modifica los datos que desees</span>
                    <form action="?" class="form-horizontal">
                        <div class="form-group">
                            <label for="email" class="control-label col-sm-2">Email</label>
                            <div class="col-sm-10">
                                <input name="email" id="email" type="email" class="form-control" placeholder="email" required>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="nombre" class="control-label col-sm-2">Nombre</label>
                            <div class="col-sm-10">
                                <input name="nombre" id="nombre" type="text" class="form-control" placeholder="Nombre" required>
                            </div>
                        </div>
                        <div class="form-group">
                            <label for="apellidos" class="control-label col-sm-2">Apellidos</label>
                            <div class="col-sm-10">
                                <input name="apellidos" id="apellidos" type="text" class="form-control" placeholder="Apellidoss" required>
                            </div>
                        </div>
                        <input type="submit" id="btnModificar" name="btnModificar" value="Guardar cambios"/>
                    </form>
                </div>
            </div>
        </div>
    </section>

    <div class="panel panel-default">
        <div class="panel-heading">
            <h4 style="display: <?php echo $sesionIniciada ? 'none' : 'block' ?>;" class="modal-title">Regístrate ahora <span class="text-success">GRATIS</span></h4>
            <h4 style="display: <?php echo $sesionIniciada ? 'block' : 'none' ?>;" class="modal-title"><span class="fa fa-edit"></span> Modificar datos</h4>
        </div>
        <div class="panel-body">
            <div class="row">
                <div class="col-md-8 col-md-offset-2">
                    <div class="form-group">
                        <label for="nombre_usuario" class="control-label">Nombre de usuario</label>
                        <div class="input-group">
                            <div class="input-group-addon"><span class="fa fa-user fa-fw"></span></div>
                            <input type="text" <?php echo $sesionIniciada ? 'disabled' : '' ?> class="form-control" id="txtNombreUsuario" value="<?php echo $sesionIniciada ? $_SESSION['usuario']->getUsuario() : ''?>">
                        </div>
                        <span class="help-block text-danger" id="help_nombreUsuario"></span>
                    </div>
                    <div class="form-group">
                        <label for="email_usuario" class="control-label">Email</label>
                        <div class="input-group">
                            <div class="input-group-addon"><span class="fa fa-at fa-fw"></span>
                            </div>
                            <input type="email" class="form-control" id="txtEmail" placeholder="ejemplo@gmail.com" value="<?php echo $sesionIniciada ? $_SESSION['usuario']->getEmail() : ''?>">
                        </div>
                        <span class="help-block text-danger" id="help_email"></span>
                    </div>
                    <div class="form-group">
                        <div class="row">
                            <div class="col-xs-3"><label for="pass_usuario_reg" class="control-label">Contraseña</label>
                            </div>
                            <div class="col-xs-9 text-right">
                                <div id="comentario_medidor_pass"></div>
                            </div>
                        </div>
                        <div class="input-group">
                            <div class="input-group-addon"><span class="fa fa-key fa-fw"></span>
                            </div>
                            <input type="password" class="form-control" id="txtPass" <?php if($sesionIniciada) echo 'placeholder="Déjela en blanco si no desea cambiarla."'; ?>>
                            <div class="input-group-addon medidor_pass">
                                <ul class="medidor_pass">
                                    <li class="1"></li>
                                    <li class="2"></li>
                                    <li class="3"></li>
                                    <li class="4"></li>
                                    <li class="5"></li>
                                </ul>
                            </div>
                        </div>

                        <span class="help-block text-danger" id="help_pass"></span>
                        <small>
                            <span class="help-block"><a style="cursor: pointer" onClick="$('#consejos_pass').toggle();">Consejos para elegir una buena contraseña</a><br/></span>
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
                    </div>
                    <button style="display: <?php echo $sesionIniciada ? 'none' : 'block' ?>" class="btn btn-info btn-block" data-loading-text="Registrando..." id="btnRegUsuario">¡Registrarme ahora!</button>
                    <button style="display: <?php echo $sesionIniciada ? 'block' : 'none' ?>" class="btn btn-success btn-block" data-loading-text="Guardando..." id="btnGuardarCambios">Guardar cambios</button>
                </div>
            </div>
        </div>
    </div>
    <?php include "plantillas/footer.php"; ?>
</body>
</html>
