$('#panel2').hide();

var pass = $("#register-form #password");
var confirm_password = $("#register-form #confirm-password");

function validatePassword(){
    if(pass.val() != confirm_password.val()) {
        confirm_password.get(0).setCustomValidity("Las contraseñas no coinciden.");
    } else {
        confirm_password.get(0).setCustomValidity('');
    }
}

pass.change(validatePassword);
confirm_password.keyup(validatePassword);

$(function() {
    $('#mensajeLogin').html('');
    //VENTANAS
    $('#login-form-link').click(function(e) {
        $("#login-form").delay(100).fadeIn(100);
        $("#register-form").fadeOut(100);
        $('#register-form-link').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
    });
    $('#register-form-link').click(function(e) {
        $('#mensajeLogin').html('');
        $("#register-form").delay(100).fadeIn(100);
        $("#login-form").fadeOut(100);
        $('#login-form-link').removeClass('active');
        $(this).addClass('active');
        e.preventDefault();
    });
    $('#recover-form-link').click(function(e) {
        $("#recover-form #email").val($("#login-form #email").val());
        //document.getElementById('login-form').reset();
        $('#mensajeLogin').html('');
        $('#panel2').delay(100).show(100);
        $('#panel1').hide(100);
        e.preventDefault();
    });
    
    //LOGIN SUBMIT
    $('#login-form').submit(function() {
        $.ajax({
            url: 'util/login.php',
            dataType: 'json',
            type: 'post',
            data:
            {
                datos: JSON.stringify
                ({
                    email: $('#login-form #email').val(),
                    pass: $('#login-form #password').val()
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
                    return true;
                }
                else{
                    $('#mensajeLogin').html(respuesta.mensaje);
                }
            },
            error: function (jqXHR, textStatus, errorThrown)
            {
                $('#mensajeLogin').html('Ha habido problemas para hacer login');
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

    //REGISTER SUBMIT
    $('#register-form').submit(function() {
        var todoOk = false;
        if (todoOk){
            //CAMBIA A PESTAÑA LOGIN CON MENSAJE DE REGISTRO CORRECTO
            $('#mensajeLogin').html('Registro correcto. Inicia sesión con tus datos.');
            this.reset();
            $('#login-form-link').click();
        } else {
            //SE QUEDA MOSTRANDO ERROR
        }
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

