
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
                    console.log("CategoriasDB:"+categorias);
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
                                var categoria = categorias[respuesta.local.categoria]["nombre"];
                                $("#local_categoria").html(categoria);
                                $("#local_direccion").html(respuesta.local.direccion);
                                if (respuesta.local.img==null)
                                    respuesta.local.img = "http://www.beverlyhills.ph/img/quotes/dental.jpg";
                                $("#local_img").attr("src","img/local/"+respuesta.local.img);
                                $("#local_breve_descripcion").html(respuesta.local.breve_descripcion);
                                $("#local_descripcion").html(respuesta.local.descripcion);
                            }
                            else {
                                window.location.replace("404.php");
                            }
                        },
                        error: function (xhr)
                        {
                            toastr.error('Ha habido problemas para obtener los locales :(');
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
                    alert("ss");
                    //Por cada comentario escribir tochaco
                }else{
                    $("#comentarios").html("<p class='text-center'>"+respuesta.mensaje+"</p>");
                }
            },
            error: function (xhr)
            {
                alert(xhr.responseText );
                toastr.error('Ha habido problemas para cargar las categorias :( <br><br>¿Estructura de datos no creada?');
            }
        });
    }



















































    //TU VALORACION
    $('#formComentario').submit(function() {
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


    //INPUT RANGE
    var selector = '[data-rangeSlider]',
        elements = document.querySelectorAll(selector);
    function valueOutput(element) {
        var value = element.value,
            output = document.getElementById('puntuacionOutput');
        output.innerHTML = value;
    }
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
        value : 5,
        borderRadius : 3
    });
});
