$(document).ready(function ()
{
    /*
    if($('#pass_admin').length)
        $('#pass_admin').focus();
    else
        cargarVentas();
    */

    $(function ()
    {
        $('.navbar-toggle-sidebar').click(function ()
        {
            $('.navbar-nav').toggleClass('slide-in');
            $('.side-body').toggleClass('body-slide-in');
            $('#search').removeClass('in').addClass('collapse').slideUp(200);
        });

        $('#search-trigger').click(function ()
        {
            $('.navbar-nav').removeClass('slide-in');
            $('.side-body').removeClass('body-slide-in');
            $('.search-input').focus();
        });
    });

    $(document).on('click', '#close-preview', function(){
        $('.image-preview').popover('hide');
        // Hover befor close the preview
        $('.image-preview').hover(
            function () {
                $('.image-preview').popover('show');
            },
            function () {
                $('.image-preview').popover('hide');
            }
        );
    });

    $('#login-form').submit(function() {
        $.ajax({
            url: '../util/login.php',
            dataType: 'json',
            type: 'post',
            data:
            {
                datos: JSON.stringify
                ({
                    email: $('#login-form #email').val(),
                    pass: $('#login-form #password').val(),
                    admin: true
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

    $('#logout').click(function ()
    {
        $.ajax({
            url: '../util/logout.php',
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

    $('#lista_usuarios').click(function ()
    {
        if(!$(this).parent().hasClass('active'))
        {
            $(this).parents('ul').children('li').removeClass('active');
            $(this).parent().addClass('active');
            cargarUsuarios();
        }
    });

    $('#lista_locales').click(function ()
    {
        if(!$(this).parent().hasClass('active'))
        {
            $(this).parents('ul').children('li').removeClass('active');
            $(this).parent().addClass('active');
            cargarLocales();
        }

    });

    $('#lista_categorias').click(function ()
    {
        if(!$(this).parent().hasClass('active'))
        {
            $(this).parents('ul').children('li').removeClass('active');
            $(this).parent().addClass('active');
            cargarCategorias();
        }
    });

    function guardarLocal()
    {
        var idLocal = $(this).data('local-save');

        var okInfo = true;
        var opcion = 'modificar';

        if(idLocal < 0)
            opcion = 'nuevo';

        var img = $('#local_img_' + idLocal);
        var helpImg = $('#local_img_help_' + idLocal);
        var nombre = $('#local_name_' + idLocal);
        var helpNombre = $('#local_name_help_' + idLocal);
        var breveDescripcion = $('#local_breve_desc_' + idLocal);
        var helpBreveDesc = $('#local_breve_desc_help_' + idLocal);
        var descripcion = $('#local_desc_' + idLocal);
        var helpDesc = $('#local_desc_help_' + idLocal);
        var categoria = $('#categorias_' + idLocal);
        var helpCategoria = $('#local_categorias_help_' + idLocal);
        var lat = $('#local_lat_' + idLocal);
        var helpLat = $('#local_lat_help_' + idLocal);
        var lng = $('#local_lng_' + idLocal);
        var helpLng = $('#local_lng_help_' + idLocal);
        var direccion = $('#local_direccion_' + idLocal);
        var helpDireccion = $('#local_direccion_help_' + idLocal);

        if(/^[\d]$/.test(categoria.val()))
        {
            categoria.parent().removeClass('has-error');
            helpCategoria.text('');
        }
        else
        {
            categoria.parent().addClass('has-error');
            categoria.focus();
            helpCategoria.text('Categoría no válida');
            okInfo = false;
        }

        if(/([A-Za-zñÑ\s]){8,210}/i.test(breveDescripcion.val()))
        {
            breveDescripcion.parent().removeClass('has-error');
            helpDesc.text('');
        }
        else
        {
            breveDescripcion.parent().addClass('has-error');
            breveDescripcion.focus();
            helpBreveDesc.text('La breve descripción debe ser alfanumérico de entre 8 y 210 caracteres.');
            okInfo = false;
        }

        if(/([A-Za-zñÑ\s]){8,450}/i.test(descripcion.val()))
        {
            descripcion.parent().removeClass('has-error');
            helpDesc.text('');
        }
        else
        {
            descripcion.parent().addClass('has-error');
            descripcion.focus();
            helpDesc.text('La descripción debe ser alfanumérico de entre 8 y 450 caracteres.');
            okInfo = false;
        }

        if(/([A-Za-zñÑ\s]){4,10}/i.test(nombre.val()))
        {
            nombre.parent().removeClass('has-error');
            helpNombre.text('');
        }
        else
        {
            nombre.parent().addClass('has-error');
            nombre.focus();
            helpNombre.text('El nombre del local debe ser alfanumérico de entre 4 y 25 caracteres.');
            okInfo = false;
        }

        if(okInfo)
        {
            $('#link_tab_info_local_' + idLocal + '').html('Información');
            $.ajax({
                url: 'new_or_mod_local.php',
                dataType: 'json',
                type : 'post',
                data :
                {
                    datos: JSON.stringify
                    ({
                        id: idLocal,
                        nombre: nombre.val(),
                        breve_descripcion: breveDescripcion.val(),
                        descripcion: descripcion.val(),
                        categoria: categoria.val(),
                        lat: lat.val(),
                        lng: lng.val(),
                        direccion: direccion.val(),
                        opcion: opcion
                    })
                },
                beforeSend: function ()
                {
                    $('[data-local-save="' + idLocal + '"]').button('loading');
                },
                success: function (respuesta)
                {
                    if (respuesta.estado == 'ok')
                    {
                        $('#new_id_local_hidden').val(respuesta.lastId);
                        if(img.val() != '')
                        {
                            $('#upload_img_local_' + idLocal + '').one('submit', function (e)
                            {
                                e.preventDefault();
                                $.ajax({
                                    url: "upload_img.php",
                                    type: "post",
                                    data: new FormData(this),
                                    dataType: 'json',
                                    contentType: false,
                                    cache: false,
                                    processData:false,
                                    success: function(respuesta)
                                    {
                                        if(respuesta.estado == 'ok')
                                            toastr.success(respuesta.mensaje);
                                        else
                                            toastr.warning('La información del local ha sido guardada correctamente, pero ha habido problemas con la imagen:\n' + respuesta.mensaje);

                                        $('#modal_new_local').queue(function ()
                                        {
                                            $('div .modal-header button.close').click();

                                        }).delay(700).queue(function ()
                                        {
                                            $('#refresh_locales').click();

                                        }).dequeue();
                                        $('#details_local_' + idLocal   + '').queue(function ()
                                        {
                                            $('div .modal-header button.close').click();

                                        }).delay(700).queue(function ()
                                        {
                                            $('#refresh_locales').click();

                                        }).dequeue();
                                    },
                                    error: function (xhr)
                                    {
                                        //console.log(xhr.responseText);
                                        toastr.warning('La información del local ha sido guardada correctamente, pero ha habido un problema desconocido con la imagen :(');
                                    }
                                });
                            }).submit();
                        }
                        else
                        {
                            toastr.success(respuesta.mensaje);

                            $('#modal_new_local').queue(function ()
                            {
                                $('div .modal-header button.close').click();

                            }).delay(700).queue(function ()
                            {
                                $('#refresh_locales').click();

                            }).dequeue();
                            $('#details_local_' + idLocal   + '').queue(function ()
                            {
                                $('div .modal-header button.close').click();

                            }).delay(700).queue(function ()
                            {
                                $('#refresh_locales').click();

                            }).dequeue();
                        }
                    }
                    else
                        toastr.error(respuesta.mensaje);
                },
                error: function (xhr)
                {
                    toastr.error('Ha habido problemas para guardar la información :(');
                },
                complete: function()
                {
                    $('[data-local-save="' + idLocal + '"]').button('reset');
                }
            });
        }
        else
        {
            $('#link_tab_info_local_' + idLocal + '').html('<span class="fa fa-exclamation-triangle fa-fw text-danger"></span> Información');
        }
    }

    function guardarCategoria()
    {
        var idCategoria = $(this).data('categoria-save');

        var okInfo = true;
        var opcion = 'modificar';

        if(idCategoria < 0)
            opcion = 'nuevo';

        var nombre = $('#name_categoria_' + idCategoria);
        var helpNombre = $('#name_categoria_help_' + idCategoria);

        if(/([A-Za-zñÑ\s]){4,10}/i.test(nombre.val()))
        {
            nombre.parent().removeClass('has-error');
            helpNombre.text('');
        }
        else
        {
            nombre.parent().addClass('has-error');
            nombre.focus();
            helpNombre.text('El nombre de la categoría debe ser alfanumérico de entre 4 y 25 caracteres.');
            okInfo = false;
        }

        if(okInfo)
        {
            $.ajax({
                url: 'new_or_mod_categoria.php',
                dataType: 'json',
                type : 'post',
                data :
                {
                    datos: JSON.stringify
                    ({
                        id: idCategoria,
                        nombre: nombre.val(),
                        opcion: opcion
                    })
                },
                beforeSend: function ()
                {
                    $('[data-categoria-save="' + idCategoria + '"]').button('loading');
                },
                success: function (respuesta)
                {
                    if (respuesta.estado == 'ok')
                    {
                        toastr.success(respuesta.mensaje);
                        $('#modal_categoria_' + idCategoria + '').queue(function ()
                        {
                            $('div .modal-header button.close').click();

                        }).delay(700).queue(function ()
                        {
                            $('#refresh_categorias').click();

                        }).dequeue();

                    }
                    else
                        toastr.error(respuesta.mensaje);
                },
                error: function (xhr)
                {
                    console.log(JSON.stringify
                    ({
                        id: idCategoria,
                        nombre: nombre.val(),
                        opcion: opcion
                    }));
                    toastr.error('Ha habido problemas para guardar la información :(');
                },
                complete: function()
                {
                    $('[data-categoria-save="' + idCategoria + '"]').button('reset');
                }
            });
        }
    }

    function eliminarLocal()
    {
        var idLocal = $(this).data('delete-local');
        var tr = $(this).parents('tr');
        $.ajax({
            url: 'delete_local.php',
            dataType: 'json',
            type: 'post',
            data: {idLocal: idLocal},
            beforeSend: function ()
            {
                $('[data-delete-local="' + idLocal + '"]').attr('disabled');
            },
            success: function(respuesta)
            {
                if(respuesta.estado == 'ok')
                {
                    toastr.success(respuesta.mensaje);
                    tr.fadeOut(function () {
                        $('#refresh_locales').click();
                    });
                }
                else if(respuesta.estado == 'warning')
                {
                    toastr.warning(respuesta.mensaje);
                    tr.fadeOut(function () {
                        $('#refresh_locales').click();
                    });
                }
                else
                    toastr.error(respuesta.mensaje);
            },
            error: function(xhr)
            {
                toastr.error('Ha habido problemas para eliminar el local :(');
            },
            complete: function()
            {
                $('[data-delete-local="' + idLocal + '"]').removeAttr('disabled');
            }
        });
    }

    function eliminarUsuario()
    {
        var id = $(this).data('delete-usuario');
        var tr = $(this).parents('tr');
        $.ajax({
            url: 'delete_usuario.php',
            dataType: 'json',
            type: 'post',
            data: {id: id},
            beforeSend: function ()
            {
                $('[data-delete-usuario="' + id + '"]').attr('disabled');
            },
            success: function(respuesta)
            {
                if(respuesta.estado == 'ok')
                {
                    toastr.success(respuesta.mensaje);
                    tr.fadeOut(function () {
                        $('#refresh_usuarios').click();
                    });
                }
                else
                    toastr.error(respuesta.mensaje);
            },
            error: function(xhr)
            {
                toastr.error('Ha habido problemas para eliminar el usuario :(');
            },
            complete: function()
            {
                $('[data-delete-usuario="' + id + '"]').removeAttr('disabled');
            }
        });
    }

    function eliminarCategoria()
    {
        var idCategoria = $(this).data('delete-categoria');
        var tr = $(this).parents('tr');
        $.ajax({
            url: 'delete_categoria.php',
            dataType: 'json',
            type: 'post',
            data: {id: idCategoria},
            beforeSend: function ()
            {
                $('[data-delete-categoria="' + idCategoria + '"]').attr('disabled');
            },
            success: function(respuesta)
            {
                if(respuesta.estado == 'ok')
                {
                    toastr.success(respuesta.mensaje);
                    tr.fadeOut(function () {
                        $('#refresh_categorias').click();
                    });
                }
                else
                    toastr.error(respuesta.mensaje);
            },
            error: function(xhr)
            {
                toastr.error('Ha habido problemas para eliminar la categoria :(');
            },
            complete: function()
            {
                $('[data-delete-categoria="' + idCategoria + '"]').removeAttr('disabled');
            }
        });
    }

    function cargarUsuarios()
    {
        $.ajax({
            url: 'get_usuarios.php',
            dataType: 'json',
            type: 'get',
            beforeSend: function ()
            {
                $('#contenido').html('Cargando...');
            },
            success: function (respuesta)
            {
                if(respuesta.estado == 'ok')
                {
                    if(respuesta.usuarios.length > 0)
                    {
                        var html =  '<br>' +
                                    '<div class="panel panel-default">' +
                                        '<div class="panel-heading">' +
                                            '<div class="row">' +
                                                '<div class="col-xs-4">' +
                                                    '<h4>Usuarios</h4>' +
                                                '</div>' +
                                                '<div class="col-xs-8 text-right">' +
                                                    '<button class="btn btn-default" id="refresh_usuarios"><span class="fa fa-refresh fa-fw"></span></button>' +
                                                '</div>' +
                                            '</div>' +
                                        '</div>' +
                                        '<div class="panel-body">' +
                                            '<div id="no-more-tables">' +
                                                '<table id="tabla_usuarios" class="table">' +
                                                    '<thead>' +
                                                        '<tr>' +
                                                            '<th>Email</th>' +
                                                            '<th>Tipo</th>' +
                                                            '<th>Nombre</th>' +
                                                            '<th>Apellidos</th>' +
                                                            '<th></th>' +
                                                        '</tr>' +
                                                    '</thead>' +
                                                    '<tbody>';
                                                        $.each(respuesta.usuarios, function (indice, usuario)
                                                        {
                                                            html += '<tr>' +
                                                                        '<td data-title="Email">' + usuario.email + '</td>' +
                                                                        '<td data-title="Tipo">';
                                                            html += (usuario.admin == 1) ? "Admin" : "Usuario"
                                                            html +=     '</td>' +
                                                                        '<td data-title="Nombre">' + usuario.nombre + '</td>' +
                                                                        '<td data-title="Apellidos">' + usuario.apellidos + '</td>' +
                                                                        '<td data-title="">' +
                                                                            '<button class="btn btn-default" data-toggle="modal" data-target="#modal_usuario_' + usuario.id + '"><span class="fa fa-eye fa-fw"></span></button> ' +
                                                                            '<button class="btn btn-danger" data-delete-usuario="' + usuario.id + '"><span class="fa fa-trash fa-fw"></span></button>' +
                                                                        '</td>' +
                                                                    '</tr>';
                                                        });
                                                        html += '</tbody>' +
                                                '</table>' +
                                            '</div>' +
                                        '</div>' +
                                    '</div>';

                        $.each(respuesta.usuarios, function (indice, usuario)
                        {
                            html += '<div class="modal fade" id="modal_usuario_' + usuario.id + '" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">' +
                                        '<div class="modal-dialog">' +
                                            '<div class="modal-content">' +
                                                '<div class="modal-header">' +
                                                    '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
                                                    '<h4 class="modal-title" id="myModalLabel">Detalles del usuario</h4>' +
                                                '</div>' +
                                                '<div class="modal-body">' +
                                                    '<form class="form-horizontal">' +
                                                        '<div class="form-group">' +
                                                            '<label for="inputEmail3" class="col-sm-3 control-label">ID</label>' +
                                                            '<div class="col-sm-9">' +
                                                                '<input type="text" class="form-control" readonly value="' + usuario.id + '">' +
                                                            '</div>' +
                                                        '</div>' +
                                                        '<div class="form-group">' +
                                                            '<label for="inputEmail3" class="col-sm-3 control-label">Email</label>' +
                                                            '<div class="col-sm-9">' +
                                                                '<input type="text" class="form-control" readonly value="' + usuario.email + '">' +
                                                            '</div>' +
                                                        '</div>' +
                                                        '<div class="form-group">' +
                                                            '<label for="inputPassword3" class="col-sm-3 control-label">Nombre</label>' +
                                                            '<div class="col-sm-9">' +
                                                                '<input type="text" class="form-control" readonly value="' + usuario.nombre + '"> ' +
                                                            '</div> ' +
                                                        '</div> ' +
                                                        '<div class="form-group">' +
                                                            '<label for="inputPassword3" class="col-sm-3 control-label">Apellidos</label>' +
                                                            '<div class="col-sm-9">' +
                                                                '<input type="text" class="form-control" readonly value="' + usuario.apellidos + '"> ' +
                                                            '</div> ' +
                                                        '</div> ' +
                                                        '<div class="form-group">' +
                                                            '<label for="inputPassword3" class="col-sm-3 control-label">Descripcion</label>' +
                                                            '<div class="col-sm-9">' +
                                                                '<input type="text" class="form-control" readonly value="' + usuario.descripcion + '"> ' +
                                                            '</div> ' +
                                                        '</div> ' +
                                                        '<div class="form-group">' +
                                                            '<label for="inputPassword3" class="col-sm-3 control-label">Tipo</label>' +
                                                            '<div class="col-sm-9">' +
                                                                '<input type="text" class="form-control" readonly value="';
                                                                html += (usuario.admin == 1) ? "Admin" : "Usuario"
                                                                html +=  '"> ' +
                                                            '</div> ' +
                                                        '</div> ' +
                                                    '</form>' +
                                                '</div>' +
                                            '</div>' +
                                        '</div>' +
                                    '</div>';
                        });

                        $('#contenido').html(html);

                        $('#refresh_usuarios').click(cargarUsuarios);
                        $('[data-delete-usuario]').click(eliminarUsuario);

                        $('#tabla_usuarios').DataTable();
                    }
                    else
                    {
                        $('#contenido').html('<br/><div class="alert alert-warning">No se ha registrado ningún usuario</div>');
                    }
                }
                else
                    toastr.error(respuesta.mensaje);
            },
            error: function (jqXHR, textStatus, errorThrown)
            {
                toastr.error('Ha habido problemas para cargar los usuarios :(');
            }
        });
    }

    function cargarLocales()
    {
        $.ajax({
            url: '../util/get_locales.php',
            dataType: 'json',
            type: 'get',
            data: {categoria : 0},
            beforeSend: function ()
            {
                $('#contenido').html('Cargando...');
            },
            success: function (respuesta)
            {
                if(respuesta.locales.length > 0)
                {
                    var categorias = '';
                    if (respuesta.estado == 'ok')
                    {
                        $.ajax({
                            url: '../util/get_categorias.php',
                            dataType: 'json',
                            type: 'get',
                            success: function(respuesta)
                            {
                                categorias = respuesta.categorias;
                            },
                            complete: function()
                            {
                                var html = '<br/>' +
                                    '<div class="panel panel-default">' +
                                        '<div class="panel-heading">' +
                                            '<div class="row">' +
                                                '<div class="col-xs-4">' +
                                                    '<h4>Locales</h4>' +
                                                '</div>' +
                                                '<div class="col-xs-8 text-right">' +
                                                    '<button class="btn btn-success hidden-xs" data-toggle="modal" data-target="#modal_new_local"><span class="fa fa-plus-circle"></span> Nuevo local</button> ' +
                                                    '<button class="btn btn-success visible-xs-inline" data-toggle="modal" data-target="#modal_new_local"><span class="fa fa-plus-circle"></span></button> ' +
                                                    '<button class="btn btn-default" id="refresh_locales"><span class="fa fa-refresh fa-fw"></span></button>' +
                                                '</div>' +
                                            '</div>' +
                                        '</div>' +
                                        '<div class="panel-body" >' +
                                            //'<a class="btn btn-default center-block" href="javascript:genPDF()"><i class="fa fa-file-pdf-o fa-fw"></i>Descargar tabla en PDF</a>' +
                                            '<div id="no-more-tables">' +
                                                '<table id="tabla_locales" class="table">' +
                                                    '<thead>' +
                                                        '<tr>' +
                                                            '<th width="6%">ID</th>' +
                                                            '<th width="6%">Categoría</th>' +
                                                            '<th width="60%">Nombre</th>' +
                                                            '<th width="5%">Direccion</th>' +
                                                            '<th width="20%"></th>' +
                                                        '</tr>' +
                                                    '</thead>' +
                                                    '<tbody>';
                                                    $.each(respuesta.locales, function (indice, local)
                                                    {
                                                        var rowOutStock = '';
                                                        if(local.stock == 0)
                                                            rowOutStock = 'danger';
                                                        else if(local.stock < 10)
                                                            rowOutStock = 'warning';
                                                        html += '<tr data-local-list="' + local.id + '" class="' + rowOutStock + '">' +
                                                                    '<td data-title="ID"> ' + local.id + ' </td>' +
                                                                    '<td data-title="Categoría"> ' + local.categoria + ' </td>' +
                                                                    '<td data-title="Nombre"> ' + local.nombre + ' </td>' +
                                                                    '<td data-title="Direccion"> ' + local.direccion + ' </td>' +
                                                                    '<td class="text-right"> <button class="btn btn-default" type="button" data-toggle="modal" data-target="#details_local_' + local.id + '"><span class="fa fa-pencil fa-fw"></span></button> <button class="btn btn-danger" data-delete-local="' + local.id + '"><span class="fa fa-trash-o fa-fw"></span></button></td>' +
                                                                '</tr>';
                                                    });
                                html += '</tbody></table></div></div></div>';

                                $.each(respuesta.locales, function (indice, local)
                                {
                                    html += '<div class="modal fade" id="details_local_' + local.id + '" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">' +
                                        '<div class="modal-dialog modal-lg"> ' +
                                            '<div class="modal-content">' +
                                                '<div class="modal-header">' +
                                                    '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
                                                    '<h4 class="modal-title">' + local.nombre + '</h4>' +
                                                '</div>' +
                                                '<div class="modal-body">' +
                                                    '<ul class="nav nav-tabs">' +
                                                        '<li class="active"><a id="link_tab_info_local_' + local.id + '" href="#tab_info_local_' + local.id + '" data-toggle="tab" aria-expanded="true">Información</a></li>' +
                                                        '<li class=""><a id="link_tab_img_local_' + local.id + '" href="#tab_img_local_' + local.id + '" data-toggle="tab" aria-expanded="false">Imagen</a></li>' +
                                                    '</ul>' +
                                                    '<div class="tab-content">' +
                                                        '<div class="tab-pane fade active in" id="tab_info_local_' + local.id + '" style="padding: 1em 0">' +
                                                            '<div class="row">' +
                                                                '<div class="col-xs-12">' +
                                                                    '<div class="form-group"> ' +
                                                                        '<label class="control-label" for="local_name_' + local.id + '">Nombre</label> ' +
                                                                        '<input class="form-control" id="local_name_' + local.id + '" type="text" value="' + local.nombre + '"> ' +
                                                                        '<p class="help-block" id="local_name_help_' + local.id + '"></p>' +
                                                                    '</div>' +
                                                                    '<div class="form-group">' +
                                                                    '<label class="control-label" for="local_breve_desc_' + local.id + '">Breve descripción</label>' +
                                                                    '<textarea class="form-control" rows="3" style="resize: vertical" id="local_breve_desc_' + local.id + '">' + local.breve_descripcion + '</textarea>' +
                                                                    '<p class="help-block" id="local_breve_desc_help_' + local.id + '"></p>' +
                                                                    '</div>' +
                                                                    '<div class="form-group">' +
                                                                        '<label class="control-label" for="local_desc_' + local.id + '">Descripción</label>' +
                                                                        '<textarea class="form-control" rows="3" style="resize: vertical" id="local_desc_' + local.id + '">' + local.descripcion + '</textarea>' +
                                                                        '<p class="help-block" id="local_desc_help_' + local.id + '"></p>' +
                                                                    '</div>' +
                                                                    '<div class="row">' +
                                                                        '<div class="col-xs-12 col-md-4">' +
                                                                            '<div class="form-group">' +
                                                                                '<label class="" for="categorias_' + local.id + '">Categoría</label>' +
                                                                                '<select class="form-control" id="categorias_' + local.id + '">';
                                                                                    var selected = '';
                                                                                    $.each(categorias, function (i, categoria)
                                                                                    {
                                                                                        if (categoria.nombre == local.categoria)
                                                                                            selected = 'selected';
                                                                                        else
                                                                                            selected = '';
                                                                                        html += '<option value="' + categoria.id + '" ' + selected + '>' + categoria.nombre + '</option>';
                                                                                    });
                                                                                    html += '</select>' +
                                                                                '<p class="help-block" id="local_categorias_help_' + local.id + '"></p>' +
                                                                            '</div>' +
                                                                        '</div>' +
                                                                        '<div class="col-xs-12 col-md-4">' +
                                                                            '<div class="form-group">' +
                                                                                '<label class="" for="local_lat_' + local.id + '">Latitud</label>' +
                                                                                '<input class="form-control" type="text" id="local_lat_' + local.id + '" value="' + local.lat + '"/>' +
                                                                                '<p class="help-block" id="local_lat_help_' + local.id + '"></p>' +
                                                                            '</div>' +
                                                                        '</div>' +
                                                                        '<div class="col-xs-12 col-md-4">' +
                                                                            '<div class="form-group">' +
                                                                                '<label class="" for="local_lng_' + local.id + '">Longitud</label>' +
                                                                                '<input class="form-control" type="text" id="local_lng_' + local.id + '" value="' + local.lng + '"/>' +
                                                                                '<p class="help-block" id="local_lng_help_' + local.id + '"></p>' +
                                                                            '</div>' +
                                                                        '</div>' +
                                                                    '</div>' +
                                                                    '<div class="form-group">' +
                                                                        '<label class="control-label" for="local_direccion_' + local.id + '">Dirección</label>' +
                                                                            '<input class="form-control" type="text" id="local_direccion_' + local.id + '" value="' + local.direccion + '"/>' +
                                                                        '<p class="help-block" id="local_direccion_help_' + local.id + '"></p>' +
                                                                    '</div>' +
                                                                '</div>' +
                                                            '</div>' +
                                                        '</div> ' +
                                                        '<div class="tab-pane fade" id="tab_img_local_' + local.id + '" style="padding: 1em 0"> ' +
                                                            '<div class="row">' +
                                                                '<div class="col-xs-12 col-md-4">' +
                                                                    '<label>Imagen actual</label>';
                                                                    if(local.img != "")
                                                                        html += '<img src="../img/local/' +  local.img + '" class="img-responsive img-rounded"> ';
                                                                    else
                                                                        html += '<img src="../img/local/no-image.jpg" class="img-responsive img-rounded"> ';
                                                                html += '</div>' +
                                                                '<div class="col-xs-12 col-md-8">' +
                                                                    '<form action="" id="upload_img_local_' + local.id + '" method="post" enctype="multipart/form-data">' +
                                                                        '<div class="form-group">' +
                                                                            '<label for="local_img_' + local.id + '">Subir imagen</label>' +
                                                                            '<input type="file" name="file" class="form-control" id="local_img_' + local.id + '"/>' +
                                                                            '<input type="hidden" name="id_local" value="' + local.id + '"/>' +
                                                                            '<p class="help-block" id="local_img_help_' + local.id + '">Déjela en blanco si no desea cambiarla</p>' +
                                                                        '</div>' +
                                                                    '</form>' +
                                                                '</div>' +
                                                            '</div>' +
                                                        '</div> ' +
                                                    '</div>' +
                                                '</div>' +
                                                '<div class="modal-footer">' +
                                                    '<button type="button" data-loading-text="Guardando..." class="btn btn-primary" data-local-save="' + local.id + '">Guardar</button>' +
                                                '</div>' +
                                            '</div> ' +
                                        '</div> ' +
                                    '</div>';
                                });

                                html += '<div class="modal fade" tabindex="-1" role="dialog" id="modal_new_local" aria-hidden="true">' +
                                            '<div class="modal-dialog modal-lg">' +
                                                '<div class="modal-content">' +
                                                    '<div class="modal-header">' +
                                                        '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
                                                        '<h4 class="modal-title">Nuevo local</h4>' +
                                                    '</div>' +
                                                    '<div class="modal-body">' +
                                                        '<ul class="nav nav-tabs">' +
                                                            '<li class="active"><a id="link_tab_info_local_-1" href="#tab_info_local_-1" data-toggle="tab" aria-expanded="true">Información</a></li>' +
                                                            '<li class=""><a id="link_tab_img_local_-1" href="#tab_img_local_-1" data-toggle="tab" aria-expanded="false">Imagen</a></li>' +
                                                        '</ul>' +
                                                        '<div class="tab-content">' +
                                                            '<div class="tab-pane fade active in" id="tab_info_local_-1" style="padding: 1em 0">' +
                                                                '<div class="row">' +
                                                                    '<div class="col-xs-12">' +
                                                                        '<div class="form-group"> ' +
                                                                            '<label class="control-label" for="local_name_-1">Nombre</label> ' +
                                                                            '<input class="form-control" id="local_name_-1" type="text"> ' +
                                                                            '<p class="help-block" id="local_name_help_-1"></p>' +
                                                                        '</div>' +
                                                                        '<div class="form-group">' +
                                                                            '<label class="control-label" for="local_breve_desc_-1">Breve descripción</label>' +
                                                                            '<textarea class="form-control" rows="3" style="resize: vertical" id="local_breve_desc_-1"></textarea>' +
                                                                            '<p class="help-block" id="local_breve_desc_help_-1"></p>' +
                                                                        '</div>' +
                                                                        '<div class="form-group">' +
                                                                            '<label class="control-label" for="local_desc_-1">Descripción</label>' +
                                                                            '<textarea class="form-control" rows="3" style="resize: vertical" id="local_desc_-1"></textarea>' +
                                                                            '<p class="help-block" id="local_desc_help_-1"></p>' +
                                                                        '</div>' +
                                                                        '<div class="row">' +
                                                                            '<div class="col-xs-12 col-md-4">' +
                                                                                '<div class="form-group">' +
                                                                                    '<label class="" for="categorias_-1">Categoría</label>' +
                                                                                    '<select class="form-control" id="categorias_-1">' +
                                                                                        '<option value="a" selected>Seleccione...</option>';
                                                                                        $.each(categorias, function (indice, categoria)
                                                                                        {
                                                                                            html += '<option value="' + categoria.id + '">' + categoria.nombre + '</option>';
                                                                                        });
                                                                                        html += '</select>' +
                                                                                        '<p class="help-block" id="local_categorias_help_-1"></p>' +
                                                                                '</div>' +
                                                                            '</div>' +
                                                                            '<div class="col-xs-12 col-md-4">' +
                                                                                '<div class="form-group">' +
                                                                                    '<label class="" for="local_lat_-1">Latitud</label>' +
                                                                                    '<input class="form-control" type="text" id="local_lat_-1"/>' +
                                                                                    '<p class="help-block" id="local_lat_help_-1"></p>' +
                                                                                '</div>' +
                                                                            '</div>' +
                                                                            '<div class="col-xs-12 col-md-4">' +
                                                                                '<div class="form-group">' +
                                                                                    '<label class="" for="local_lng_-1">Longitud</label>' +
                                                                                    '<input class="form-control" type="text" id="local_lng_-1"/>' +
                                                                                    '<p class="help-block" id="local_lng_help_-1"></p>' +
                                                                                '</div>' +
                                                                            '</div>' +
                                                                        '</div>' +
                                                                        '<div class="form-group">' +
                                                                            '<label class="control-label" for="local_direccion_-1">Dirección</label>' +
                                                                            '<input class="form-control" type="text" id="local_direccion_-1"/>' +
                                                                            '<p class="help-block" id="local_direccion_help_-1"></p>' +
                                                                        '</div>' +
                                                                    '</div>' +
                                                                '</div>' +
                                                            '</div> ' +
                                                            '<div class="tab-pane fade" id="tab_img_local_-1" style="padding: 1em 0"> ' +
                                                                '<div class="row">' +
                                                                    '<div class="col-xs-12">' +
                                                                        '<form action="" id="upload_img_local_-1" method="post" enctype="multipart/form-data">' +
                                                                            '<div class="form-group">' +
                                                                                '<label for="local_img_-1">Subir imagen</label>' +
                                                                                '<input type="file" name="file" class="form-control" id="local_img_-1"/>' +
                                                                                '<input type="hidden" name="id_local" id="new_id_local_hidden"/>' +
                                                                                '<p class="help-block" id="local_img_help_-1">Déjela en blanco si no desea cambiarla</p>' +
                                                                            '</div>' +
                                                                        '</form>' +
                                                                    '</div>' +
                                                                '</div>' +
                                                            '</div> ' +
                                                        '</div>' +
                                                    '</div>' +
                                                    '<div class="modal-footer">' +
                                                        '<button type="button" data-loading-text="Guardando..." class="btn btn-primary" data-local-save="-1">Guardar</button>' +
                                                    '</div>' +
                                                '</div>' +
                                            '</div>';

                                $('#contenido').html(html);

                                $('#refresh_locales').click(cargarLocales);

                                $('[data-local-save]').click(guardarLocal);
                                $('[data-delete-local]').click(eliminarLocal);

                                $('#tabla_locales').DataTable({
                                    "processing": true,
                                    "dom": 'lBfrtip',
                                    "buttons": [
                                        {
                                            extend: 'collection',
                                            text: 'Exportar',
                                            buttons: [
                                                {
                                                    extend: 'pdfHtml5',
                                                    title: 'Locales OLP'
                                                },
                                                {
                                                    extend: 'excelHtml5',
                                                    title: 'Locales OLP'
                                                },
                                                {
                                                    extend: 'csvHtml5',
                                                    title: 'Locales OLP'
                                                },
                                                {
                                                    extend: 'print',
                                                    text: 'Imprimir',
                                                    title: 'Locales Ocio Los Palacios'
                                                }
                                            ]
                                        }
                                    ],
                                    "language":
                                    {
                                        "url": "../js/lib/jquery.dataTables.spanish.json"
                                    }
                                });

                            }
                        });
                    }
                    else
                        toastr.error(respuesta.mensaje);
                }
                else
                    $('#contenido').html('<br><div class="alert alert-warning">No hay locales registrados</div>');
            },
            error: function (xhr)
            {
                toastr.error('Ha habido problemas para obtener los locales :(');
                $('#contenido').html('');
            }
        });
    }

    function cargarCategorias()
    {
        $.ajax({
            url: '../util/get_categorias.php',
            dataType: 'json',
            type: 'get',
            beforeSend: function ()
            {
                $('#contenido').html('Cargando...');
            },
            success: function (respuesta)
            {
                if(respuesta.estado == 'ok')
                {
                    if(respuesta.categorias.length > 0)
                    {
                        var html =  '<br>' +
                                    '<div class="panel panel-default">' +
                                        '<div class="panel-heading">' +
                                            '<div class="row">' +
                                                '<div class="col-xs-4">' +
                                                    '<h4>Categorías</h4>' +
                                                '</div>' +
                                                '<div class="col-xs-8 text-right">' +
                                                    '<button class="btn btn-success hidden-xs" data-toggle="modal" data-target="#modal_categoria_-1"><span class="fa fa-plus-circle fa-fw"></span> Nueva categoría</button> ' +
                                                    '<button class="btn btn-success visible-xs-inline" data-toggle="modal" data-target="#modal_categoria_-1"><span class="fa fa-plus-circle fa-fw"></span></button> ' +
                                                    '<button class="btn btn-default" id="refresh_categorias"><span class="fa fa-refresh fa-fw"></span></button>' +
                                                '</div>' +
                                            '</div>' +
                                        '</div>' +
                                        '<div class="panel-body">' +
                                            '<div id="no-more-tables">' +
                                                '<table id="tabla_categorias" class="table">' +
                                                    '<thead>' +
                                                        '<tr>' +
                                                            '<th>ID</th>' +
                                                            '<th>Nombre</th>' +
                                                            '<th></th>' +
                                                        '</tr>' +
                                                    '</thead>' +
                                                    '<tbody>';
                                                        $.each(respuesta.categorias, function (indice, categoria)
                                                        {
                                                            html += '<tr>' +
                                                                        '<td data-title="ID">' + categoria.id + '</td>' +
                                                                        '<td data-title="Nombre">' + categoria.nombre + '</td>' +
                                                                        '<td data-title="">' +
                                                                            '<button class="btn btn-default" data-toggle="modal" data-target="#modal_categoria_' + categoria.id + '"><span class="fa fa-pencil fa-fw"></span></button> ' +
                                                                            '<button class="btn btn-danger" data-delete-categoria="' + categoria.id + '"><span class="fa fa-trash fa-fw"></span></button>' +
                                                                        '</td>' +
                                                                    '</tr>';
                                                        });
                                                        html += '</tbody>' +
                                                '</table>' +
                                            '</div>' +
                                        '</div>' +
                                    '</div>';

                                    $.each(respuesta.categorias, function (indice, categoria)
                                    {
                                        html += '<div class="modal fade" id="modal_categoria_' + categoria.id + '" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">' +
                                                    '<div class="modal-dialog">' +
                                                        '<div class="modal-content">' +
                                                            '<div class="modal-header">' +
                                                                '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
                                                                '<h4 class="modal-title" id="myModalLabel">' + categoria.nombre + '</h4>' +
                                                            '</div>' +
                                                            '<div class="modal-body">' +
                                                                '<form class="form-horizontal">' +
                                                                    '<div class="form-group">' +
                                                                        '<label for="name_categoria_' + categoria.id + '" class="col-sm-3 control-label">Nombre</label>' +
                                                                        '<div class="col-sm-9">' +
                                                                            '<input id="name_categoria_' + categoria.id + '" type="text" class="form-control" value="' + categoria.nombre + '"> ' +
                                                                        '</div>' +
                                                                        '<p class="help-block" id="name_categoria_help_' + categoria.id + '"></p>' +
                                                                    '</div> ' +
                                                                '</form>' +
                                                            '</div>' +
                                                            '<div class="modal-footer">' +
                                                                '<button type="button" data-loading-text="Guardando..." class="btn btn-primary" data-categoria-save="' + categoria.id + '">Guardar</button>' +
                                                            '</div>' +
                                                        '</div>' +
                                                    '</div>' +
                                                '</div>';
                                    });

                        html += '<div class="modal fade" id="modal_categoria_-1" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">' +
                                    '<div class="modal-dialog">' +
                                        '<div class="modal-content">' +
                                            '<div class="modal-header">' +
                                                '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
                                                '<h4 class="modal-title">Nueva categoría</h4>' +
                                            '</div>' +
                                            '<div class="modal-body">' +
                                                '<form class="form-horizontal">' +
                                                    '<div class="form-group">' +
                                                        '<label for="name_categoria_-1" class="col-sm-3 control-label">Nombre</label>' +
                                                        '<div class="col-sm-9">' +
                                                            '<input id="name_categoria_-1" type="text" class="form-control"> ' +
                                                        '</div>' +
                                                        '<p class="help-block" id="name_categoria_help_-1"></p>' +
                                                    '</div> ' +
                                                '</form>' +
                                            '</div>' +
                                            '<div class="modal-footer">' +
                                                '<button type="button" data-loading-text="Guardando..." class="btn btn-primary" data-categoria-save="-1">Guardar</button>' +
                                            '</div>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>';

                        $('#contenido').html(html);

                        $('[data-categoria-save]').click(guardarCategoria);

                        $('#refresh_categorias').click(cargarCategorias);
                        $('[data-delete-categoria]').click(eliminarCategoria);

                        $('#tabla_categorias').DataTable({
                            "language":
                            {
                                "url": "../js/jquery.dataTables.spanish.json"
                            }
                        });
                    }
                    else
                        toastr.error(respuesta.mensaje);
                }
                else
                    $('#contenido').html('<br><div class="alert alert-warning">No hay categorías registradas</div>');
            },
            error: function (xhr)
            {
                toastr.error('Ha habido problemas para cargar las ventas :(');
            }
        });
    }

});