jQuery(document).ready(function() {

    /* =================================================================================================================
     Pagina actual
     */
    var loc = window.location.href,
        pgurl = loc.substr(loc.lastIndexOf("/") + 1),
        hashIndex = pgurl.indexOf('#');

    if (hashIndex > 0) {
        pgurl = pgurl.substring(0, hashIndex);
    }

    var paginaActual = pgurl.substr(0, pgurl.indexOf("."));

    //alert(pgurl+ "..." +paginaActual);

    $(".main-nav ul li a").each(function () {
        if ($(this).attr("href") == pgurl || $(this).attr("href") == '')
            $(this).addClass("active");
    });

    /*
     Pagina actual
     =================================================================================================================*/

    
    /* =================================================================================================================
     Scroll Top Pagina
     */
    $(function () {
        $("#subir-arriba").click(function () {
            $("body").animate(
                {
                    scrollTop: 10
                },
                800
            );
            return false;
        })
    });

    /*
     Scroll Top Pagina
     =================================================================================================================*/


    /* =================================================================================================================
     Activar/Desactivar campos
     */
    $('#metodoContacto input[type="checkbox"]').click(function () {
        var idInput = $(this).attr("value");
        var input = $('input[name="' + idInput + '"]');
        var estado = input.prop("readonly");
        input.val("");
        input.prop("readonly", !estado);
        if (estado) input.focus();
    });
    /*
     Activar/Desactivar campos
     =================================================================================================================*/

    

});
