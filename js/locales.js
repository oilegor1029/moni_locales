var markersArray = [];

$(document).ready(function() {
    /* =================================================================================================================
     Inicializar Mapa
     */

    var map;

    var mapCenter = new google.maps.LatLng(37.162137, -5.924211); //Google map Coordinates

    var googleMapOptions =
    {
        center: mapCenter,
        zoom: 15,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.SMALL
        },
        scaleControl: true, // enable scale control
        mapTypeId: google.maps.MapTypeId.ROADMAP // google map type
    };
    map = new google.maps.Map(document.getElementById("map"), googleMapOptions);

    mostrarLocales(0);
    /*
     Inicializar Mapa
     =================================================================================================================*/



    /* =================================================================================================================
     Lista Categorias
     */

    var select = document.getElementById('selectMapa');

    select.onchange = function(){
        var lista = $('.categoria');
        lista.each(function () {
            if ($(this).hasClass("active")){
                $(this).removeClass("active");
            }
            if ($(this).data("id-cat") == select.value){
                $(this).addClass('active');
            }
        })
        mostrarLocales(select.value);
    };

    $('.categoria').click(function () {
        $(".categoria, .active").removeClass("active");
        $(this).addClass('active');
        var idCategoria = $(this).data("id-cat");
        //$("#selectMapa option:selected").removeAttr("selected");
        $("#selectMapa option").each(function(){
            if ($(this).attr('value')==idCategoria){
                select.value=idCategoria;
                mostrarLocales(idCategoria);
            }
        });
    });

    /*
     Lista Categorias
     =================================================================================================================*/

    /* =================================================================================================================
     Markers
     */
    function crearMarker(local) {
        var marker = new google.maps.Marker({
            position: {
                lat: parseFloat(local['lat']),
                lng: parseFloat(local['lng'])
            },
            map: map
        });

        var html = crearHtmlLocal(local);

        var infowindow = new google.maps.InfoWindow({
            content: html
        });

        markersArray.push(marker);
        marker.addListener('click', function () {
            infowindow.open(map, marker);
        });
    }

    function borrarMarkers(){
        for (var i = 0; i < markersArray.length; i++ ) {
            markersArray[i].setMap(null);
        }
        markersArray.length = 0;
    }

    /*
     Markers
     =================================================================================================================*/

    function mostrarLocales(categoria) {
        borrarMarkers();
        var divLista = $("#listaLocales");
        divLista.html("");
        $.ajax({
            url: 'util/get_locales.php',
            dataType: 'json',
            data: {categoria: categoria},
            success: function (respuesta) {
                if (respuesta.estado == 'ok') {
                    if (respuesta.locales.length > 0) {
                        var productosInsertados = 0;
                        $.each(respuesta.locales, function(index, value){
                            var nuevoDiv = crearHtmlLocal(respuesta.locales[index]);
                            crearMarker(respuesta.locales[index]);
                            divLista.html(divLista.html()+nuevoDiv);
                        });
                    }
                    else {
                        alert("No hay locales de esa categoria.");
                        divLista.html("<p>Esta categoria no tiene locales.</p>");
                    }
                }else
                    alert(respuesta.mensaje);
            },
            error: function (xhr)
            {
                alert('Ha habido problemas para cargar los productos :( <br><br>¿Estructura de datos no creada?');
            }
        });
    }


    function crearHtmlLocal(local) {
        var hostname = window.location.hostname; //www.ociolospalacios.com
        var index = window.location.pathname; //locales.php
        //var search = window.location.search; //?local=2
        var url = hostname+index;

        var html =
            '<div class="panel panel-default infoWindow">'
                +'<div class="panel-heading">'
                    +"<strong>" + local['nombre'] + "</strong>"
                    +'<span style="float : right;margin-left: 5px;">'
                        +'<a href="http://'+url+'?local='+local['id']+'"><i class="fa fa-info" aria-hidden="true"></i> - Ver más</a>'
                    +'</span>'
                +'</div>'
                +'<div class="panel-body">'
                    +'<table>'
                        +'<tr>'
                            +'<td max-width="130px">'
                                +'<img src="img/local/'+local['img']+'" alt="Imagen" width="130px;">'
                            +'</td>'
                            +'<td>'
                                + '<p>'+local['breve_descripcion']+'</p>'
                            +'</td>'
                        +'</tr>'
                    +'</table>'
                +'</div>'
                +'<div class="panel-footer" style="bottom: 0px">'
                    +local['direccion']
                    +'<span style="float : right;margin-left: 5px;">'
                        +'<a href="http://'+url+'?local='+local['id']+'#comentarios"><i class="fa fa-heart" aria-hidden="true"></i>5</a>'
                    +'</span>'
                    +'</div>'
                +'</div>'
            +'</div>';

        return html;
    }
});