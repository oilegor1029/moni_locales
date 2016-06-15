
$(document).ready(function() {

    cargarPaginaLocal();
    cargarComentarios();
    //cargarLocal();

    function cargarPaginaLocal(){
        $.ajax({
            url: 'util/get_categorias.php',
            dataType: 'json',
            success: function (respuesta) {
                if (respuesta.estado == 'ok') {
                    var categorias = respuesta.categorias;
                    $.ajax({
                        url: 'util/get_local.php',
                        dataType: 'json',
                        type: 'get',
                        data: {id : getUrlParameter("id")},
                        success: function (respuesta)
                        {
                            if(respuesta.estado == "ok")
                            {
                                $("#local_nombre").html(respuesta.local.nombre);
                                var categoria = categorias[respuesta.local.categoria-1]["nombre"];
                                $("#local_categoria").html(categoria);
                                $("#local_direccion").html(respuesta.local.direccion);
                                if (respuesta.local.img==null)
                                    respuesta.local.img = "http://www.beverlyhills.ph/img/quotes/dental.jpg";
                                $("#local_img").attr("src","img/local/"+respuesta.local.img);
                                $("#local_breve_descripcion").html(respuesta.local.breve_descripcion);
                                $("#local_descripcion").html(respuesta.local.descripcion);
                            }
                            else {
                                window.location.assign ("404.php");
                            }
                        },
                        error: function (xhr)
                        {
                            toastr.error('Ha habido problemas para obtener el local :(');
                            $('#contenido').html('');
                        }
                    });
                }else
                    toastr.error(respuesta.mensaje);
            },
            error: function (xhr)
            {
                toastr.error('Ha habido problemas para cargar las categorias :( <br><br>¿Estructura de datos no creada?');
            }
        });
    }

    function cargarComentarios(){
        $.ajax({
            url: 'util/get_comentarios.php',
            dataType: 'json',
            data: {localID : getUrlParameter("id")},
            success: function (respuesta) {
                if (respuesta.estado == 'ok') {
                    var html = "";
                    $.each(respuesta.comentarios, function (indice, comentario){
                        html +=
                            '<div id="comentario'+comentario.usuario+'" class="divComentario">'
                                + '<div class="media">'
                                    + '<div class="media-body">'
                                        + '<h4 class="media-heading comentarioAutor">' + comentario.usuarioNombre
                                            +'  <small class="comentarioFecha">'+comentario.fecha+'</small>'
                                        + '</h4>'
                                        + '<p class="comentario">'+comentario.texto+'</p>'
                                    + '</div>'
                                    + '<p class="pull-right comentarioPuntuacion" style="text-decoration: underline">Puntuacion: '+comentario.puntuacion+' / 10</p>'
                            + '</div>'
                            + '</div>'
                            + '<hr>';
                    });
                    $("#puntuacion").html(respuesta.puntuaciones + " / 10");
                    $("#comentarios").html(html);

                }else{
                    $("#comentarios").html("<p class='text-center'>"+respuesta.mensaje+"</p>");
                    $("#puntuacion").html(respuesta.mensaje);
                }
            },
            error: function (xhr)
            {
                alert(xhr.responseText );
                toastr.error('Ha habido problemas para cargar los comentarios :( <br><br>¿Estructura de datos no creada?');
            }
        });
    }

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
                    $html = '<form method="post" id="formComentario">'
                        + '<div class="form-group">'
                        + '<textarea class="form-control" rows="3" maxlength="250" minlength="10"'
                        + 'id="inputComentario" name="inputComentario"></textarea>'
                        + '</div>'
                        + '<p>Tu Puntuacion: <span id="puntuacionOutput"></span></p>'
                        + '<input id="inputPuntuacion" type=range min=0 max=10 value=5 step=0.5 data-rangeSlider>'
                        + '<hr>'
                        + '<p>'
                        + '<small>En caso de que ya hayas valorado antes este local, el comentario y puntuación que'
                        + 'introduzcas ahora sustituirá al antiguo.'
                        + '</small>'
                        + '</p>'
                        + '<hr>'
                        + '<p class="text-center">'
                        + '<button type="submit" class="btn btn-primary">Enviar</button>'
                        + '</p>'
                        + '</form>';
                    $html += "<script>ponerRangeSlider()</script>";
                    $('#divValoracion').html($html + respuesta.mensaje);
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
    
    //TU VALORACION
    $('#formComentario').submit(function() {
        $.ajax({
            url: 'util/get_user_info.php',
            dataType: 'json',
            success: function (respuestaUsuario) {
                if (respuestaUsuario.estado == 'ok') {
                    $.ajax({
                        url: 'util/get_comentarios.php',
                        dataType: 'json',
                        data: {
                            localID : getUrlParameter("id"),
                            usuarioID : respuestaUsuario.usuario.id
                        },
                        success: function (respuestaComentarioHecho) {
                            if (respuestaComentarioHecho.estado == 'ok')
                                var opcion = "modificar";
                            else 
                                var opcion = "nuevo";
                            $.ajax({
                                url: 'util/hacer_comentario.php',
                                dataType: 'json',
                                type: 'post',
                                data:
                                {
                                    datos: JSON.stringify
                                    ({
                                        local: getUrlParameter("id"),
                                        texto: $('#inputComentario').val(),
                                        puntuacion: $('#puntuacionOutput').html(),
                                        opcion: opcion,
                                        localID : getUrlParameter("id"),
                                        usuarioID : respuestaUsuario.usuario.id
                                    })
                                },
                                success: function (respuesta)
                                {
                                    if (respuesta.estado == 'ok'){
                                        cargarComentarios();
                                        toastr.success(respuesta.mensaje);
                                        $('#formComentario')[0].reset();
                                    }
                                    else{
                                        alert(respuesta.mensaje);
                                        toastr.error(respuesta.mensaje);
                                    }
                                },
                                error: function (xhr)
                                {
                                    alert(xhr.responseText);
                                    toastr.error('Ha habido problemas en el servidor :(');
                                }
                            });
                        },
                        error: function (xhr)
                        {
                            alert(xhr.responseText);
                            console.log(xhr);
                            toastr.error('Ha habido problemas para cargar los comentarios :( <br><br>¿Estructura de datos no creada?');
                        }
                    });
                }else{
                    toastr.error(respuestaUsuario.mensaje);
                }
            },
            error: function (xhr)
            {
                alert(xhr.responseText );
                toastr.error('Ha habido problemas para acceder a los usuarios :( <br><br>¿Estructura de datos no creada?');
            }
        });
        return false;
    });
    
    ponerRangeSlider();
});
//INPUT RANGE
function valueOutput(element) {
    var value = element.value,
        output = document.getElementById('puntuacionOutput');
    output.innerHTML = value;
}
function ponerRangeSlider(){
    var selector = '[data-rangeSlider]',
        elements = document.querySelectorAll(selector);
    if (elements.length != 0) {
        for (var i = elements.length - 1; i >= 0; i--) {
            valueOutput(elements[i]);
        }
        Array.prototype.slice.call(document.querySelectorAll('input[type="range"]')).forEach(function (el) {
            el.addEventListener('input', function (e) {
                valueOutput(e.target);
            }, false);
        });
        // Basic rangeSlider initialization
        rangeSlider.create(elements, {
            min: 0,
            max: 10,
            value: 5,
            borderRadius: 3
        });
    }
}
