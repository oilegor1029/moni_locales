$(function() {
    
    //SUBMIT
    $('#formContacto').submit(function() {
        if ( $('#cbEmail').is(":checked")){
            if ( $('#cbEmail').is(":checked")){
                var metodos = [$('#email').val(), $('#telefono').val()];
            }
            else {
                var metodos = [$('#email').val()];
            }
        } else if ( $('#cbEmail').is(":checked")){
            var metodos = [$('#telefono').val()];

        } else {
            toastr.error("Selecciona al menos un metodo");
            return false;
        }
        $.ajax({
            url: 'util/login.php',
            dataType: 'json',
            type: 'post',
            data:
            {
                datos: JSON.stringify
                ({
                    nombre: $('#formContacto #nombre').val(),
                    mensaje: $('#formContacto #mensaje').val(),
                    motivo: $('#formContacto #motivo').find(":selected").text(),
                    metodos: metodos
                })
            },
            beforeSend: function ()
            {
                $('#mensajeLogin').html('Cargando');
            },
            success: function (respuesta)
            {
                if (respuesta.estado == 'ok')
                {
                    $('#mensajeLogin').html('Login correcto');
                    location.href = "";
                }
                else{
                    toastr.error(respuesta.mensaje);
                }
            },
            error: function (jqXHR, textStatus, errorThrown)
            {
                toastr.error('Ha habido problemas para hacer login');
                if (jqXHR.status === 0) {
                    alert('Not connect: Verify Network.');
                } else if (jqXHR.status == 404) {
                    alert('Requested page not found [404]');
                } else if (jqXHR.status == 500) {
                    alert('Internal Server Error [500].');
                } else if (textStatus === 'parsererror') {
                    alert('Requested JSON parse failed.');
                } else if (textStatus === 'timeout') {
                    alert('Time out error.');
                } else if (textStatus === 'abort') {
                    alert('Ajax request aborted.');
                } else {
                    alert('Uncaught Error: ' + jqXHR.responseText);
                }
            }
        });
        return false;
    });

    $('#logout').click(function ()
    {
        $.ajax({
            url: 'logout.php',
            dataType: 'json',
            success: function (respuesta)
            {
                if (respuesta.estado == 'ok')
                    location.href = "";
                else
                    toastr.error(respuesta.mensaje);
            },
            error: function (xhr)
            {
                toastr.error('Ha habido problemas al cerrar la sesión :(');
            }
        });
    });

    //REGISTER SUBMIT
    $('#register-form').submit(function() {
        $.ajax({
            url: 'util/reg_or_mod_client.php',
            dataType: 'json',
            type: 'post',
            data:
            {
                datos: JSON.stringify
                ({
                    opcion: 'registrar',
                    email: $('#register-form #email').val(),
                    pass: $('#register-form #password').val(),
                    conf_pass: $('#register-form #confirm-password').val(),
                    nombre: $('#register-form #nombre').val(),
                    apellidos: $('#register-form #apellidos').val(),
                    descripcion: $('#register-form #descripcion').val()
                })
            },
            beforeSend: function ()
            {
                $('#mensajeLogin').html('Cargando');
            },
            success: function (respuesta)
            {
                if (respuesta.estado == 'ok')
                {
                    $('#mensajeLogin').html('Registro correcto. Inicia sesión con tus datos.');
                    document.getElementById('register-form').reset();
                    $('#login-form-link').click();
                    toastr.success(respuesta.mensaje);
                }
                else{
                    $('#mensajeRecover').html(respuesta.mensaje);
                    toastr.error(respuesta.mensaje);
                }
            },
            error: function (xhr, status, error)
            {
                $('#mensajeLogin').html('Ha habido problemas para hacer recuperar tu contraseña');
                console.log(xhr);
                console.log(xhr.responseText);
                console.log(status);
                console.log(error);
            }
        });
        return false;
    });

    //Recover SUBMIT
    $('#recover-form').submit(function() {
        $.ajax({
            url: 'util/recover.php',
            dataType: 'json',
            type: 'post',
            data:
            {
                datos: JSON.stringify
                ({
                    email: $('#recover-form #email').val(),
                })
            },
            beforeSend: function ()
            {
                $('#mensajeLogin').html('Cargando');
            },
            success: function (respuesta)
            {
                if (respuesta.estado == 'ok')
                {
                    $('#mensajeLogin').html(respuesta.mensaje);
                    $("#login-form #email").val($("#recover-form #email").val());
                    $('#panel1').delay(100).show();
                    $('#panel2').hide(100);
                    $('#login-form-link').click();
                }
                else{
                    $('#mensajeRecover').html(respuesta.mensaje);
                }
            },
            error: function (jqXHR, textStatus, errorThrown)
            {
                $('#mensajeLogin').html('Ha habido problemas para hacer recuperar tu contraseña');
                if (jqXHR.status === 0) {
                    alert('Not connect: Verify Network.');
                } else if (jqXHR.status == 404) {
                    alert('Requested page not found [404]');
                } else if (jqXHR.status == 500) {
                    alert('Internal Server Error [500].');
                } else if (textStatus === 'parsererror') {
                    alert('Requested JSON parse failed.');
                } else if (textStatus === 'timeout') {
                    alert('Time out error.');
                } else if (textStatus === 'abort') {
                    alert('Ajax request aborted.');
                } else {
                    alert('Uncaught Error: ' + jqXHR.responseText);
                }
            }
        });
        return false;
    });
});

