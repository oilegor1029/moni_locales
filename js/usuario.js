$(document).ready(function() {

    if (getUrlParameter("id")){
        $('#botones').hide();
        cargarPaginaUsuario();
    } else {
        $('#botonConfigurar').hide();
        $('#divContraseña').hide();
        $('#botonContraseña').click(
            function( event ) {
                event.preventDefault();
                if ($('#divContraseña').is(":visible")==true){
                    $('#contraseña').val('').prop('required',false);
                    $('#conf_contraseña').val('').prop('required',false);
                    $('#divContraseña').hide(200);
                } else {
                    $('#contraseña').val('').prop('required',true);
                    $('#conf_contraseña').val('').prop('required',true);
                    $('#divContraseña').show(200);
                }

                //window.location.replace("404.php");
            }
        );
    }
    $('#botonLogout').click(function ()
    {
        $.ajax({
            url: 'util/logout.php',
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

    $('#formConfig').submit(function (){

    });

    function cargarPaginaUsuario(){
        $.ajax({
            url: 'util/get_user_info.php',
            dataType: 'json',
            type: 'post',
            data:
            {
                datos: JSON.stringify
                ({
                    id: getUrlParameter("id")
                })
            },
            success: function (respuesta) {
                if (respuesta.estado == 'ok') {
                    var usuario = respuesta.usuario;
                    $('#nombreUsuario').html(usuario.nombre + " " + usuario.apellidos);
                    $('#emailUsuario').html(usuario.email);
                    $('#descripcionUsuario').html(usuario.descripcion);
                    $.ajax({
                        url: 'util/get_comentarios.php',
                        dataType: 'json',
                        type: 'post',
                        data: {usuarioID: getUrlParameter("id")},
                        success: function (respuesta)
                        {
                            if(respuesta.estado == "ok")
                            {
                                var comentarios = respuesta.comentarios;
                                var puntaciones = respuesta.puntuaciones;
                                var html = '<div id="no-more-tables">' +
                                    '<p>Numero de valoraciones: <b id="numValoraciones"></b></p>' +
                                    '<p>Puntuacion media: <b>'+puntaciones+'</b></p>' +
                                    '<table id="tabla_locales" class="table">' +
                                    '<thead>' +
                                    '<tr>' +
                                    '<th width="60%">Local</th>' +
                                    '<th width="30%">Puntuacion</th>' +
                                    '<th width="10%"></th>' +
                                    '</tr>' +
                                    '</thead>' +
                                    '<tbody>';
                                var cont = 0;
                                $.each(comentarios, function (indice, comentario)
                                {
                                    html+= '<tr>' +
                                        '<td> ' + comentario.local + ' </td>' +
                                        '<td> ' + comentario.puntuacion + ' </td>' +
                                        '<td class="text-right"> <a class="btn btn-default" type="button" href="local.php?id=' + comentario.local + '#comentario' + comentario.usuario + '"><i class="fa fa-eye fa-fw"></i></a></td>' +
                                        '</tr>';
                                    cont++;
                                });
                                html += '</tbody></table></div>';
                                $('#divActividad').html(html);
                                $('#numValoraciones').html(cont);
                            }
                            else {
                                //window.location.replace("404.php");
                                toastr.error(respuesta.mensaje); //NO TIENE VALORACIONES
                            }
                        },
                        error: function (xhr)
                        {
                            toastr.error('Ha habido problemas para obtener los comentarios :(');
                        }
                    });
                }else
                    window.location.replace("404.php");
            },
            error: function (xhr)
            {
                toastr.error('Ha habido problemas para cargar las categorias :( <br><br>¿Estructura de datos no creada?');
            }
        });
    }
});