/* =================================================================================================================
 MANEJO DATABASE
 */
$('#crear_estructura').click(function ()
{
    $.ajax({
        url: 'util/create_app.php',
        dataType: 'json',
        beforeSend: function ()
        {
            $('#crear_estructura').button('loading');
        },
        success: function (respuesta)
        {
            if (respuesta.estado == 'ok')
                location.href="";
            else
                toastr.error(respuesta.mensaje);
            $('#crear_estructura').button('reset');
        },
        error: function (xhr)
        {
            alert('Ha habido problemas para crear la estructura de datos :(');
            $('#crear_estructura').button('reset');
        }
    });
});


function getLocales(categoria){
    $.ajax({
        url: 'util/get_locales.php',
        dataType: 'json',
        data: {categoria: categoria},
        success: function (respuesta) {
            if (respuesta.estado == 'ok') {
                var locales = respuesta.locales;
                alert(locales);
                return locales;
            }else
                alert(respuesta.mensaje);
        },
        error: function (xhr)
        {
            alert('Ha habido problemas para cargar los locales :( <br><br>¿Estructura de datos no creada?');
        }
    });
}
function getCategorias(){
    $.ajax({
        url: 'util/get_categorias.php',
        dataType: 'json',
        success: function (respuesta) {
            if (respuesta.estado == 'ok') {
                var categorias = respuesta.categorias;
                return categorias;
            }else
                alert("Fallo:"+respuesta.mensaje);
        },
        error: function (xhr)
        {
            alert('Ha habido problemas para cargar las categorias :( <br><br>¿Estructura de datos no creada?');
        }
    });
}


/*
 MANEJO DATABASE
 =================================================================================================================*/

