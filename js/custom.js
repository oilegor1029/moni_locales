jQuery(document).ready(function() {

    //Pagina actual
    var pgurl = window.location.href.substr(window.location.href.lastIndexOf("/")+1);
    $(".main-nav ul li a").each(function(){
        if($(this).attr("href") == pgurl || $(this).attr("href") == '' )
            $(this).addClass("active");
    });

    // JQuery Filters
    $('.filters li').click(function() {
        $(".filters li.active").removeClass("active");
        $(this).addClass('active');
    });

    //Scroll Top Pagina
    $(function(){
        $("#subir-arriba").click(function(){
            $("body").animate(
                {
                    scrollTop:10
                },
                800
            );
            return false;
        })
    });

    //SEGUN QUE PAGINA ESTEMOS:
    switch (pgurl){
        case "locales.php":
            // JQuery MixItUp
            if (pgurl=="locales.php") {
                $('.works').mixItUp();
            }
            break;
        case "contacto.php":
            //Activar/Desactivar campos
            $('#metodoContacto input[type="checkbox"]').click(function(){
                var idInput = $(this).attr("value");
                var input = $('input[name="'+idInput+'"]');
                var estado = input.prop("readonly");
                input.val("");
                input.prop("readonly", !estado);
                if (estado) input.focus();
            });
            break;
    }
});
