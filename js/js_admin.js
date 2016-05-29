$(document).ready(function ()
{
    if($('#pass_admin').length)
        $('#pass_admin').focus();
    else
        cargarVentas();

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

    $('#btnLoginAdmin').click(function (e)
    {
        e.preventDefault();

        $.ajax({
            url: 'login_admin_2.php',
            dataType: 'json',
            type: 'post',
            data:
            {
                datos: JSON.stringify
                ({
                    pass: $('#pass_admin').val()
                })
            },
            success: function (respuesta)
            {
                if (respuesta.estado == 'ok')
                    location.href="../admin/index.php";
                else
                {
                    $('#error').show();
                    $('#mensaje_error').html('<span class="fa fa-warning fa-fw"></span> Contraseña incorrecta');
                }
            },
            error: function (xhr)
            {
                $('#error').show();
                $('#mensaje_error').html('<span class="fa fa-warning fa-fw"></span> Ha habido problemas para hacer login :(');
            }
        });
    });

    $('#logout_admin').click(function ()
    {
        $.ajax({
            url: 'logout_admin.php',
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

    $('#sales_list').click(function ()
    {
        if(!$(this).parent().hasClass('active'))
        {
            $(this).parents('ul').children('li').removeClass('active');
            $(this).parent().addClass('active');
            cargarVentas();
        }
    });

    $('#clients_list').click(function ()
    {
        if(!$(this).parent().hasClass('active'))
        {
            $(this).parents('ul').children('li').removeClass('active');
            $(this).parent().addClass('active');
            cargarClientes();
        }
    });

    $('#product_list').click(function ()
    {
        if(!$(this).parent().hasClass('active'))
        {
            $(this).parents('ul').children('li').removeClass('active');
            $(this).parent().addClass('active');
            cargarProductos();
        }

    });

    $('#categories_list').click(function ()
    {
        if(!$(this).parent().hasClass('active'))
        {
            $(this).parents('ul').children('li').removeClass('active');
            $(this).parent().addClass('active');
            cargarCategorias();
        }
    });

    function guardarProducto()
    {
        var codProduct = $(this).data('product-save');

        var okInfo = true;
        var opcion = 'modificar';

        if(codProduct < 0)
            opcion = 'nuevo';

        var img = $('#product_img_' + codProduct);
        var helpImg = $('#product_img_help_' + codProduct);
        var nombre = $('#product_name_' + codProduct);
        var helpNombre = $('#product_name_help_' + codProduct);
        var descripcion = $('#product_desc_' + codProduct);
        var helpDesc = $('#product_desc_help_' + codProduct);
        var categoria = $('#categories_' + codProduct);
        var helpCategoria = $('#product_categories_help_' + codProduct);
        var pvp = $('#product_pvp_' + codProduct);
        var helpPvp = $('#product_pvp_help_' + codProduct);
        var stock = $('#product_stock_' + codProduct);
        var helpStock = $('#product_stock_help_' + codProduct);

        if(/^\d+$/.test(stock.val()))
        {
            stock.parent().removeClass('has-error');
            helpStock.text('');
        }
        else
        {
            stock.parent().addClass('has-error');
            stock.focus();
            helpStock.text('Este valor debe ser numérico.');
            okInfo = false;
        }

        if(/^\d+(\.\d+)?$/.test(pvp.val()))
        {
            pvp.parent().removeClass('has-error');
            helpPvp.text('');
        }
        else
        {
            pvp.parent().addClass('has-error');
            pvp.focus();
            helpPvp.text('Este valor debe ser de formato numérico decima separado por un punto.');
            okInfo = false;
        }


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

        if(/([A-Za-zñÑ\s]){8,400}/i.test(descripcion.val()))
        {
            descripcion.parent().removeClass('has-error');
            helpDesc.text('');
        }
        else
        {
            descripcion.parent().addClass('has-error');
            descripcion.focus();
            helpDesc.text('La descripción debe ser alfanumérico de entre 8 y 400 caracteres.');
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
            helpNombre.text('El nombre del producto debe ser alfanumérico de entre 4 y 25 caracteres.');
            okInfo = false;
        }

        if(okInfo)
        {
            $('#link_tab_info_producto_' + codProduct + '').html('Información');
            $.ajax({
                url: 'new_or_mod_product.php',
                dataType: 'json',
                type : 'post',
                data :
                {
                    datos: JSON.stringify
                    ({
                        cod: codProduct,
                        nombre: nombre.val(),
                        descripcion: descripcion.val(),
                        categoria: categoria.val(),
                        pvp: pvp.val(),
                        stock: stock.val(),
                        opcion: opcion
                    })
                },
                beforeSend: function ()
                {
                    $('[data-product-save="' + codProduct + '"]').button('loading');
                },
                success: function (respuesta)
                {
                    if (respuesta.estado == 'ok')
                    {
                        $('#new_cod_product_hidden').val(respuesta.lastId);
                        if(img.val() != '')
                        {
                            $('#upload_img_product_' + codProduct + '').one('submit', function (e)
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
                                            toastr.warning('La información del producto ha sido guardada correctamente, pero ha habido problemas con la imagen:\n' + respuesta.mensaje);

                                        $('#modal_new_product').queue(function ()
                                        {
                                            $('div .modal-header button.close').click();

                                        }).delay(700).queue(function ()
                                        {
                                            $('#refresh_products').click();

                                        }).dequeue();
                                        $('#details_product_' + codProduct   + '').queue(function ()
                                        {
                                            $('div .modal-header button.close').click();

                                        }).delay(700).queue(function ()
                                        {
                                            $('#refresh_products').click();

                                        }).dequeue();
                                    },
                                    error: function (xhr)
                                    {
                                        toastr.warning('La información del producto ha sido guardada correctamente, pero ha habido un problema desconocido con la imagen :(');
                                    }
                                });
                            }).submit();
                        }
                        else
                        {
                            toastr.success(respuesta.mensaje);

                            $('#modal_new_product').queue(function ()
                            {
                                $('div .modal-header button.close').click();

                            }).delay(700).queue(function ()
                            {
                                $('#refresh_products').click();

                            }).dequeue();
                            $('#details_product_' + codProduct   + '').queue(function ()
                            {
                                $('div .modal-header button.close').click();

                            }).delay(700).queue(function ()
                            {
                                $('#refresh_products').click();

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
                    $('[data-product-save="' + codProduct + '"]').button('reset');
                }
            });
        }
        else
        {
            $('#link_tab_info_producto_' + codProduct + '').html('<span class="fa fa-exclamation-triangle fa-fw text-danger"></span> Información');
        }
    }

    function guardarCategoria()
    {
        var codCategory = $(this).data('category-save');

        var okInfo = true;
        var opcion = 'modificar';

        if(codCategory < 0)
            opcion = 'nuevo';

        var nombre = $('#name_category_' + codCategory);
        var helpNombre = $('#name_category_help_' + codCategory);

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
                url: 'new_or_mod_category.php',
                dataType: 'json',
                type : 'post',
                data :
                {
                    datos: JSON.stringify
                    ({
                        cod: codCategory,
                        nombre: nombre.val(),
                        opcion: opcion
                    })
                },
                beforeSend: function ()
                {
                    $('[data-category-save="' + codCategory + '"]').button('loading');
                },
                success: function (respuesta)
                {
                    if (respuesta.estado == 'ok')
                    {
                        toastr.success(respuesta.mensaje);
                        $('#modal_categoria_' + codCategory + '').queue(function ()
                        {
                            $('div .modal-header button.close').click();

                        }).delay(700).queue(function ()
                        {
                            $('#refresh_categories').click();

                        }).dequeue();

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
                    $('[data-category-save="' + codCategory + '"]').button('reset');
                }
            });
        }
    }

    function eliminarProducto()
    {
        var codProduct = $(this).data('delete-product');
        var tr = $(this).parents('tr');
        $.ajax({
            url: 'delete_product.php',
            dataType: 'json',
            type: 'post',
            data: {codProduct: codProduct},
            beforeSend: function ()
            {
                $('[data-delete-product="' + codProduct + '"]').attr('disabled');
            },
            success: function(respuesta)
            {
                if(respuesta.estado == 'ok')
                {
                    toastr.success(respuesta.mensaje);
                    tr.fadeOut(function () {
                        $('#refresh_products').click();
                    });
                }
                else if(respuesta.estado == 'warning')
                {
                    toastr.warning(respuesta.mensaje);
                    tr.fadeOut(function () {
                        $('#refresh_products').click();
                    });
                }
                else
                    toastr.error(respuesta.mensaje);
            },
            error: function(xhr)
            {
                toastr.error('Ha habido problemas para eliminar el producto :(');
            },
            complete: function()
            {
                $('[data-delete-product="' + codProduct + '"]').removeAttr('disabled');
            }
        });
    }

    function eliminarCliente()
    {
        var dni = $(this).data('delete-client');
        var tr = $(this).parents('tr');
        $.ajax({
            url: 'delete_client.php',
            dataType: 'json',
            type: 'post',
            data: {dni: dni},
            beforeSend: function ()
            {
                $('[data-delete-client="' + dni + '"]').attr('disabled');
            },
            success: function(respuesta)
            {
                if(respuesta.estado == 'ok')
                {
                    toastr.success(respuesta.mensaje);
                    tr.fadeOut(function () {
                        $('#refresh_clients').click();
                    });
                }
                else
                    toastr.error(respuesta.mensaje);
            },
            error: function(xhr)
            {
                toastr.error('Ha habido problemas para eliminar el cliente :(');
            },
            complete: function()
            {
                $('[data-delete-client="' + dni + '"]').removeAttr('disabled');
            }
        });
    }

    function eliminarCategoria()
    {
        var codCategoria = $(this).data('delete-category');
        var tr = $(this).parents('tr');
        $.ajax({
            url: 'delete_category.php',
            dataType: 'json',
            type: 'post',
            data: {cod: codCategoria},
            beforeSend: function ()
            {
                $('[data-delete-category="' + codCategoria + '"]').attr('disabled');
            },
            success: function(respuesta)
            {
                if(respuesta.estado == 'ok')
                {
                    toastr.success(respuesta.mensaje);
                    tr.fadeOut(function () {
                        $('#refresh_categories').click();
                    });
                }
                else
                    toastr.error(respuesta.mensaje);
            },
            error: function(xhr)
            {
                toastr.error('Ha habido problemas para eliminar el producto :(');
            },
            complete: function()
            {
                $('[data-delete-category="' + codCategoria + '"]').removeAttr('disabled');
            }
        });
    }

    function cargarVentas()
    {
        $.ajax({
            url: 'get_orders.php',
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
                    if(respuesta.pedidos.length > 0)
                    {
                        var html = '<br>' +
                                    '<div class="panel panel-default">' +
                                        '<div class="panel-heading">' +
                                            '<div class="row">' +
                                                '<div class="col-xs-4">' +
                                                    '<h4>Ventas</h4>' +
                                                '</div>' +
                                                '<div class="col-xs-8 text-right">' +
                                                    '<button class="btn btn-default" id="refresh_sales"><span class="fa fa-refresh fa-fw"></span></button>' +
                                                '</div>' +
                                            '</div>' +
                                        '</div>' +
                                        '<div class="panel-body">' +
                                            '<div id="no-more-tables">' +
                                                '<table id="tabla_ventas" class="table">' +
                                                    '<thead>' +
                                                        '<tr>' +
                                                            '<th>Num. pedido</th>' +
                                                            '<th>Fecha del pedido</th>' +
                                                            '<th>Total del pedido</th>' +
                                                            '<th>Factura</th>' +
                                                        '</tr>' +
                                                    '</thead>' +
                                                    '<tbody>';
                                                        $.each(respuesta.pedidos, function (indice, pedido) {
                                                            html += '<tr>' +
                                                            '<td data-title="Num. pedido">' + pedido.num_pedido + '</td>' +
                                                            '<td data-title="Fecha del pedido">' + pedido.fecha + '</td>' +
                                                            '<td data-title="Total del pedido">' + pedido.total_pedido + '</td>' +
                                                            '<td data-title="Factura"><a href="../view_invoice.php?codPedido=' + pedido.num_pedido + '" target="_blank" class="btn btn-link">Ver factura</a></td>' +
                                                            '</tr>';
                                                        });
                                                        html += '</tbody>' +
                                                '</table>' +
                                            '</div>' +
                                        '</div>' +
                                    '</div>';

                        $('#contenido').html(html);
                        $('#refresh_sales').click(cargarVentas);

                        $('#tabla_ventas').DataTable({
                            "language":
                            {
                                "url": "../js/spanish.json"
                            }
                        });
                    }
                    else
                        $('#contenido').html('<br><div class="alert alert-warning">No se ha realizado ventas</div>');
                }
                else
                    toastr.error(respuesta.mensaje);
            },
            error: function ()
            {
                toastr.error('Ha habido problemas para cargar las ventas :(');
            }
        });
    }

    function cargarClientes()
    {
        $.ajax({
            url: 'get_clients.php',
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
                    if(respuesta.clientes.length > 0)
                    {
                        var html =  '<br>' +
                                    '<div class="panel panel-default">' +
                                        '<div class="panel-heading">' +
                                            '<div class="row">' +
                                                '<div class="col-xs-4">' +
                                                    '<h4>Clientes</h4>' +
                                                '</div>' +
                                                '<div class="col-xs-8 text-right">' +
                                                    '<button class="btn btn-default" id="refresh_clients"><span class="fa fa-refresh fa-fw"></span></button>' +
                                                '</div>' +
                                            '</div>' +
                                        '</div>' +
                                        '<div class="panel-body">' +
                                            '<div id="no-more-tables">' +
                                                '<table id="tabla_clientes" class="table">' +
                                                    '<thead>' +
                                                        '<tr>' +
                                                            '<th>DNI</th>' +
                                                            '<th>Nombre</th>' +
                                                            '<th>Apellidos</th>' +
                                                            '<th></th>' +
                                                        '</tr>' +
                                                    '</thead>' +
                                                    '<tbody>';
                                                        $.each(respuesta.clientes, function (indice, cliente)
                                                        {
                                                            html += '<tr>' +
                                                                        '<td data-title="DNI">' + cliente.dni + '</td>' +
                                                                        '<td data-title="Nombre">' + cliente.nombre + '</td>' +
                                                                        '<td data-title="Apellidos">' + cliente.apellidos + '</td>' +
                                                                        '<td data-title="">' +
                                                                            '<button class="btn btn-default" data-toggle="modal" data-target="#modal_usuario_' + cliente.dni + '"><span class="fa fa-eye fa-fw"></span></button> ' +
                                                                            '<button class="btn btn-danger" data-delete-client="' + cliente.dni + '"><span class="fa fa-trash fa-fw"></span></button>' +
                                                                        '</td>' +
                                                                    '</tr>';
                                                        });
                                                        html += '</tbody>' +
                                                '</table>' +
                                            '</div>' +
                                        '</div>' +
                                    '</div>';

                        $.each(respuesta.clientes, function (indice, cliente)
                        {
                            html += '<div class="modal fade" id="modal_usuario_' + cliente.dni + '" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">' +
                                        '<div class="modal-dialog">' +
                                            '<div class="modal-content">' +
                                                '<div class="modal-header">' +
                                                    '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
                                                    '<h4 class="modal-title" id="myModalLabel">Detalles del usuario</h4>' +
                                                '</div>' +
                                                '<div class="modal-body">' +
                                                    '<form class="form-horizontal">' +
                                                        '<div class="form-group">' +
                                                            '<label for="inputEmail3" class="col-sm-3 control-label">DNI</label>' +
                                                            '<div class="col-sm-9">' +
                                                                '<input type="text" class="form-control" readonly value="' + cliente.dni + '">' +
                                                            '</div>' +
                                                        '</div>' +
                                                        '<div class="form-group">' +
                                                            '<label for="inputPassword3" class="col-sm-3 control-label">Nombre</label>' +
                                                            '<div class="col-sm-9">' +
                                                                '<input type="text" class="form-control" readonly value="' + cliente.nombre + '"> ' +
                                                            '</div> ' +
                                                        '</div> ' +
                                                        '<div class="form-group">' +
                                                            '<label for="inputPassword3" class="col-sm-3 control-label">Apellidos</label>' +
                                                            '<div class="col-sm-9">' +
                                                                '<input type="text" class="form-control" readonly value="' + cliente.apellidos + '"> ' +
                                                            '</div> ' +
                                                        '</div> ' +
                                                        '<div class="form-group">' +
                                                            '<label for="inputPassword3" class="col-sm-3 control-label">Dirección</label>' +
                                                            '<div class="col-sm-9">' +
                                                                '<input type="text" class="form-control" readonly value="' + cliente.direccion + '"> ' +
                                                            '</div> ' +
                                                        '</div> ' +
                                                        '<div class="form-group">' +
                                                            '<label for="inputPassword3" class="col-sm-3 control-label">Localidad</label>' +
                                                            '<div class="col-sm-9">' +
                                                                '<input type="text" class="form-control" readonly value="' + cliente.localidad + '"> ' +
                                                            '</div> ' +
                                                        '</div> ' +
                                                        '<div class="form-group">' +
                                                            '<label for="inputPassword3" class="col-sm-3 control-label">Código postal</label>' +
                                                            '<div class="col-sm-9">' +
                                                                '<input type="text" class="form-control" readonly value="' + cliente.cp + '"> ' +
                                                            '</div> ' +
                                                        '</div> ' +
                                                        '<div class="form-group">' +
                                                            '<label for="inputPassword3" class="col-sm-3 control-label">Provincia</label>' +
                                                            '<div class="col-sm-9">' +
                                                                '<input type="text" class="form-control" readonly value="' + cliente.provincia + '"> ' +
                                                            '</div> ' +
                                                        '</div> ' +
                                                        '<div class="form-group">' +
                                                            '<label for="inputPassword3" class="col-sm-3 control-label">Email</label>' +
                                                            '<div class="col-sm-9">' +
                                                                '<input type="text" class="form-control" readonly value="' + cliente.email + '"> ' +
                                                            '</div> ' +
                                                        '</div> ' +
                                                        '<div class="form-group">' +
                                                            '<label for="inputPassword3" class="col-sm-3 control-label">Usuario</label>' +
                                                            '<div class="col-sm-9">' +
                                                                '<input type="text" class="form-control" readonly value="' + cliente.usuario + '"> ' +
                                                            '</div> ' +
                                                        '</div> ' +
                                                    '</form>' +
                                                '</div>' +
                                            '</div>' +
                                        '</div>' +
                                    '</div>';
                        });

                        $('#contenido').html(html);

                        $('#refresh_clients').click(cargarClientes);
                        $('[data-delete-client]').click(eliminarCliente);

                        $('#tabla_clientes').DataTable({
                            "language":
                            {
                                "url": "../js/spanish.json"
                            }
                        });
                    }
                    else
                    {
                        $('#contenido').html('<br/><div class="alert alert-warning">No se ha registrado ningún cliente</div>');
                    }
                }
                else
                    toastr.error(respuesta.mensaje);
            },
            error: function ()
            {
                toastr.error('Ha habido problemas para cargar los clientes :(');
            }
        });
    }

    function cargarProductos()
    {
        $.ajax({
            url: '../get_products.php',
            dataType: 'json',
            type: 'get',
            data: {categoria : 0},
            beforeSend: function ()
            {
                $('#contenido').html('Cargando...');
            },
            success: function (respuesta)
            {
                if(respuesta.productos.length > 0)
                {
                    var categorias = '';
                    if (respuesta.estado == 'ok')
                    {
                        $.ajax({
                            url: '../get_categories.php',
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
                                                    '<h4>Productos</h4>' +
                                                '</div>' +
                                                '<div class="col-xs-8 text-right">' +
                                                    '<button class="btn btn-success hidden-xs" data-toggle="modal" data-target="#modal_new_product"><span class="fa fa-plus-circle"></span> Nuevo producto</button> ' +
                                                    '<button class="btn btn-success visible-xs-inline" data-toggle="modal" data-target="#modal_new_product"><span class="fa fa-plus-circle"></span></button> ' +
                                                    '<button class="btn btn-default" id="refresh_products"><span class="fa fa-refresh fa-fw"></span></button>' +
                                                '</div>' +
                                            '</div>' +
                                        '</div>' +
                                        '<div class="panel-body" >' +
                                            '<div id="no-more-tables">' +
                                                '<table id="tabla_productos" class="table">' +
                                                    '<thead>' +
                                                        '<tr>' +
                                                            '<th width="6%">Código</th>' +
                                                            '<th width="10%">Categoría</th>' +
                                                            '<th width="60%">Nombre</th>' +
                                                            '<th>PVP</th>' +
                                                            '<th width="5%">Stock</th>' +
                                                            '<th width="20%"></th>' +
                                                        '</tr>' +
                                                    '</thead>' +
                                                    '<tbody>';
                                                    $.each(respuesta.productos, function (indice, producto)
                                                    {
                                                        var rowOutStock = '';
                                                        if(producto.stock == 0)
                                                            rowOutStock = 'danger';
                                                        else if(producto.stock < 10)
                                                            rowOutStock = 'warning';
                                                        html += '<tr data-producto-list="' + producto.cod + '" class="' + rowOutStock + '">' +
                                                                    '<td data-title="Código"> ' + producto.cod + ' </td>' +
                                                                    '<td data-title="Categoría"> ' + producto.categoria + ' </td>' +
                                                                    '<td data-title="Nombre"> ' + producto.nombre + ' </td>' +
                                                                    '<td data-title="PVP" class="text-right"> ' + producto.pvp + ' </td>' +
                                                                    '<td data-title="Stock" class="text-right"> ' + producto.stock + ' </td>' +
                                                                    '<td class="text-right"> <button class="btn btn-default" type="button" data-toggle="modal" data-target="#details_product_' + producto.cod + '"><span class="fa fa-pencil fa-fw"></span></button> <button class="btn btn-danger" data-delete-product="' + producto.cod + '"><span class="fa fa-trash-o fa-fw"></span></button></td>' +
                                                                '</tr>';
                                                    });
                                html += '</tbody></table></div></div></div>';

                                $.each(respuesta.productos, function (indice, producto)
                                {
                                    html += '<div class="modal fade" id="details_product_' + producto.cod + '" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">' +
                                        '<div class="modal-dialog modal-lg"> ' +
                                            '<div class="modal-content">' +
                                                '<div class="modal-header">' +
                                                    '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
                                                    '<h4 class="modal-title">' + producto.nombre + '</h4>' +
                                                '</div>' +
                                                '<div class="modal-body">' +
                                                    '<ul class="nav nav-tabs">' +
                                                        '<li class="active"><a id="link_tab_info_producto_' + producto.cod + '" href="#tab_info_producto_' + producto.cod + '" data-toggle="tab" aria-expanded="true">Información</a></li>' +
                                                        '<li class=""><a id="link_tab_img_producto_' + producto.cod + '" href="#tab_img_producto_' + producto.cod + '" data-toggle="tab" aria-expanded="false">Imagen</a></li>' +
                                                    '</ul>' +
                                                    '<div class="tab-content">' +
                                                        '<div class="tab-pane fade active in" id="tab_info_producto_' + producto.cod + '" style="padding: 1em 0">' +
                                                            '<div class="row">' +
                                                                '<div class="col-xs-12">' +
                                                                    '<div class="form-group"> ' +
                                                                        '<label class="control-label" for="product_name_' + producto.cod + '">Nombre</label> ' +
                                                                        '<input class="form-control" id="product_name_' + producto.cod + '" type="text" value="' + producto.nombre + '"> ' +
                                                                        '<p class="help-block" id="product_name_help_' + producto.cod + '"></p>' +
                                                                    '</div>' +
                                                                    '<div class="form-group">' +
                                                                        '<label class="control-label" for="product_desc_' + producto.cod + '">Descripción</label>' +
                                                                        '<textarea class="form-control" rows="3" style="resize: vertical" id="product_desc_' + producto.cod + '">' + producto.descripcion + '</textarea>' +
                                                                        '<p class="help-block" id="product_desc_help_' + producto.cod + '"></p>' +
                                                                    '</div>' +
                                                                    '<div class="row">' +
                                                                        '<div class="col-xs-12 col-md-4">' +
                                                                            '<div class="form-group">' +
                                                                                '<label class="" for="categories_' + producto.cod + '">Categoría</label>' +
                                                                                '<select class="form-control" id="categories_' + producto.cod + '">';
                                                                                    var selected = '';
                                                                                    $.each(categorias, function (i, categoria)
                                                                                    {
                                                                                        if (categoria.nombre == producto.categoria)
                                                                                            selected = 'selected';
                                                                                        else
                                                                                            selected = '';
                                                                                        html += '<option value="' + categoria.cod + '" ' + selected + '>' + categoria.nombre + '</option>';
                                                                                    });
                                                                                    html += '</select>' +
                                                                                '<p class="help-block" id="product_categories_help_' + producto.cod + '"></p>' +
                                                                            '</div>' +
                                                                        '</div>' +
                                                                        '<div class="col-xs-12 col-md-4">' +
                                                                            '<div class="form-group">' +
                                                                                '<label class="" for="product_pvp_' + producto.cod + '">PVP</label>' +
                                                                                '<input class="form-control" type="text" id="product_pvp_' + producto.cod + '" value="' + producto.pvp + '"/>' +
                                                                                '<p class="help-block" id="product_pvp_help_' + producto.cod + '"></p>' +
                                                                            '</div>' +
                                                                        '</div>' +
                                                                        '<div class="col-xs-12 col-md-4">' +
                                                                            '<div class="form-group">' +
                                                                                '<label class="" for="product_stock_' + producto.cod + '">Stock</label>' +
                                                                                '<input onkeypress="return event.charCode >= 48 && event.charCode <= 57" class="form-control" type="text" id="product_stock_' + producto.cod + '" value="' + producto.stock + '"/>' +
                                                                                '<p class="help-block" id="product_stock_help_' + producto.cod + '"></p>' +
                                                                            '</div>' +
                                                                        '</div>' +
                                                                    '</div>' +
                                                                '</div>' +
                                                            '</div>' +
                                                        '</div> ' +
                                                        '<div class="tab-pane fade" id="tab_img_producto_' + producto.cod + '" style="padding: 1em 0"> ' +
                                                            '<div class="row">' +
                                                                '<div class="col-xs-12 col-md-4">' +
                                                                    '<label>Imagen actual</label>';
                                                                    if(producto.img != "")
                                                                        html += '<img src="../img/' +  producto.img + '" class="img-responsive img-rounded"> ';
                                                                    else
                                                                        html += '<img src="../img/no-image.jpg" class="img-responsive img-rounded"> ';
                                                                html += '</div>' +
                                                                '<div class="col-xs-12 col-md-8">' +
                                                                    '<form action="" id="upload_img_product_' + producto.cod + '" method="post" enctype="multipart/form-data">' +
                                                                        '<div class="form-group">' +
                                                                            '<label for="product_img_' + producto.cod + '">Subir imagen</label>' +
                                                                            '<input type="file" name="file" class="form-control" id="product_img_' + producto.cod + '"/>' +
                                                                            '<input type="hidden" name="cod_product" value="' + producto.cod + '"/>' +
                                                                            '<p class="help-block" id="product_img_help_' + producto.cod + '">Déjela en blanco si no desea cambiarla</p>' +
                                                                        '</div>' +
                                                                    '</form>' +
                                                                '</div>' +
                                                            '</div>' +
                                                        '</div> ' +
                                                    '</div>' +
                                                '</div>' +
                                                '<div class="modal-footer">' +
                                                    '<button type="button" data-loading-text="Guardando..." class="btn btn-primary" data-product-save="' + producto.cod + '">Guardar</button>' +
                                                '</div>' +
                                            '</div> ' +
                                        '</div> ' +
                                    '</div>';
                                });

                                html += '<div class="modal fade" tabindex="-1" role="dialog" id="modal_new_product" aria-hidden="true">' +
                                            '<div class="modal-dialog modal-lg">' +
                                                '<div class="modal-content">' +
                                                    '<div class="modal-header">' +
                                                        '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
                                                        '<h4 class="modal-title">Nuevo producto</h4>' +
                                                    '</div>' +
                                                    '<div class="modal-body">' +
                                                        '<ul class="nav nav-tabs">' +
                                                            '<li class="active"><a id="link_tab_info_producto_-1" href="#tab_info_producto_-1" data-toggle="tab" aria-expanded="true">Información</a></li>' +
                                                            '<li class=""><a id="link_tab_img_producto_-1" href="#tab_img_producto_-1" data-toggle="tab" aria-expanded="false">Imagen</a></li>' +
                                                        '</ul>' +
                                                        '<div class="tab-content">' +
                                                            '<div class="tab-pane fade active in" id="tab_info_producto_-1" style="padding: 1em 0">' +
                                                                '<div class="row">' +
                                                                    '<div class="col-xs-12">' +
                                                                        '<div class="form-group"> ' +
                                                                            '<label class="control-label" for="product_name_-1">Nombre</label> ' +
                                                                            '<input class="form-control" id="product_name_-1" type="text"> ' +
                                                                            '<p class="help-block" id="product_name_help_-1"></p>' +
                                                                        '</div>' +
                                                                        '<div class="form-group">' +
                                                                            '<label class="control-label" for="product_desc_-1">Descripción</label>' +
                                                                            '<textarea class="form-control" rows="3" style="resize: vertical" id="product_desc_-1"></textarea>' +
                                                                            '<p class="help-block" id="product_desc_help_-1"></p>' +
                                                                        '</div>' +
                                                                        '<div class="row">' +
                                                                            '<div class="col-xs-12 col-md-4">' +
                                                                                '<div class="form-group">' +
                                                                                    '<label class="" for="categories_-1">Categoría</label>' +
                                                                                    '<select class="form-control" id="categories_-1">' +
                                                                                        '<option value="a" selected>Seleccione...</option>';
                                                                                        $.each(categorias, function (indice, categoria)
                                                                                        {
                                                                                            html += '<option value="' + categoria.cod + '">' + categoria.nombre + '</option>';
                                                                                        });
                                                                                        html += '</select>' +
                                                                                        '<p class="help-block" id="product_categories_help_-1"></p>' +
                                                                                '</div>' +
                                                                            '</div>' +
                                                                            '<div class="col-xs-12 col-md-4">' +
                                                                                '<div class="form-group">' +
                                                                                    '<label class="" for="product_pvp_-1">PVP</label>' +
                                                                                    '<input class="form-control" type="text" id="product_pvp_-1">' +
                                                                                    '<p class="help-block" id="product_pvp_help_-1"></p>' +
                                                                                '</div>' +
                                                                            '</div>' +
                                                                            '<div class="col-xs-12 col-md-4">' +
                                                                                '<div class="form-group">' +
                                                                                    '<label class="" for="product_stock_-1">Stock</label>' +
                                                                                    '<input onkeypress="return event.charCode >= 48 && event.charCode <= 57" class="form-control" type="text" id="product_stock_-1"/>' +
                                                                                    '<p class="help-block" id="product_stock_help_-1"></p>' +
                                                                                '</div>' +
                                                                            '</div>' +
                                                                        '</div>' +
                                                                    '</div>' +
                                                                '</div>' +
                                                            '</div> ' +
                                                            '<div class="tab-pane fade" id="tab_img_producto_-1" style="padding: 1em 0"> ' +
                                                                '<div class="row">' +
                                                                    '<div class="col-xs-12">' +
                                                                        '<form action="" id="upload_img_product_-1" method="post" enctype="multipart/form-data">' +
                                                                            '<div class="form-group">' +
                                                                                '<label for="product_img_-1">Subir imagen</label>' +
                                                                                '<input type="file" name="file" class="form-control" id="product_img_-1"/>' +
                                                                                '<input type="hidden" name="cod_product" id="new_cod_product_hidden"/>' +
                                                                                '<p class="help-block" id="product_img_help_-1">Déjela en blanco si no desea cambiarla</p>' +
                                                                            '</div>' +
                                                                        '</form>' +
                                                                    '</div>' +
                                                                '</div>' +
                                                            '</div> ' +
                                                        '</div>' +
                                                    '</div>' +
                                                    '<div class="modal-footer">' +
                                                        '<button type="button" data-loading-text="Guardando..." class="btn btn-primary" data-product-save="-1">Guardar</button>' +
                                                    '</div>' +
                                                '</div>' +
                                            '</div>';

                                $('#contenido').html(html);

                                $('#refresh_products').click(cargarProductos);

                                $('[data-product-save]').click(guardarProducto);
                                $('[data-delete-product]').click(eliminarProducto);

                                $('#tabla_productos').DataTable({
                                    "language":
                                    {
                                        "url": "../js/spanish.json"
                                    }
                                });

                            }
                        });
                    }
                    else
                        toastr.error(respuesta.mensaje);
                }
                else
                    $('#contenido').html('<br><div class="alert alert-warning">No hay productos registrados</div>');
            },
            error: function (xhr)
            {
                toastr.error('Ha habido problemas para obtener los productos :(');
                $('#contenido').html('');
            }
        });
    }

    function cargarCategorias()
    {
        $.ajax({
            url: '../get_categories.php',
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
                                                    '<button class="btn btn-default" id="refresh_categories"><span class="fa fa-refresh fa-fw"></span></button>' +
                                                '</div>' +
                                            '</div>' +
                                        '</div>' +
                                        '<div class="panel-body">' +
                                            '<div id="no-more-tables">' +
                                                '<table id="tabla_categorias" class="table">' +
                                                    '<thead>' +
                                                        '<tr>' +
                                                            '<th>Cod.</th>' +
                                                            '<th>Nombre</th>' +
                                                            '<th></th>' +
                                                        '</tr>' +
                                                    '</thead>' +
                                                    '<tbody>';
                                                        $.each(respuesta.categorias, function (indice, categoria)
                                                        {
                                                            html += '<tr>' +
                                                                        '<td data-title="Cod.">' + categoria.cod + '</td>' +
                                                                        '<td data-title="Nombre">' + categoria.nombre + '</td>' +
                                                                        '<td data-title="">' +
                                                                            '<button class="btn btn-default" data-toggle="modal" data-target="#modal_categoria_' + categoria.cod + '"><span class="fa fa-pencil fa-fw"></span></button> ' +
                                                                            '<button class="btn btn-danger" data-delete-category="' + categoria.cod + '"><span class="fa fa-trash fa-fw"></span></button>' +
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
                                        html += '<div class="modal fade" id="modal_categoria_' + categoria.cod + '" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">' +
                                                    '<div class="modal-dialog">' +
                                                        '<div class="modal-content">' +
                                                            '<div class="modal-header">' +
                                                                '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
                                                                '<h4 class="modal-title" id="myModalLabel">' + categoria.nombre + '</h4>' +
                                                            '</div>' +
                                                            '<div class="modal-body">' +
                                                                '<form class="form-horizontal">' +
                                                                    '<div class="form-group">' +
                                                                        '<label for="name_category_' + categoria.cod + '" class="col-sm-3 control-label">Nombre</label>' +
                                                                        '<div class="col-sm-9">' +
                                                                            '<input id="name_category_' + categoria.cod + '" type="text" class="form-control" value="' + categoria.nombre + '"> ' +
                                                                        '</div>' +
                                                                        '<p class="help-block" id="name_category_help_' + categoria.cod + '"></p>' +
                                                                    '</div> ' +
                                                                '</form>' +
                                                            '</div>' +
                                                            '<div class="modal-footer">' +
                                                                '<button type="button" data-loading-text="Guardando..." class="btn btn-primary" data-category-save="' + categoria.cod + '">Guardar</button>' +
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
                                                        '<label for="name_category_-1" class="col-sm-3 control-label">Nombre</label>' +
                                                        '<div class="col-sm-9">' +
                                                            '<input id="name_category_-1" type="text" class="form-control"> ' +
                                                        '</div>' +
                                                        '<p class="help-block" id="name_category_help_-1"></p>' +
                                                    '</div> ' +
                                                '</form>' +
                                            '</div>' +
                                            '<div class="modal-footer">' +
                                                '<button type="button" data-loading-text="Guardando..." class="btn btn-primary" data-category-save="-1">Guardar</button>' +
                                            '</div>' +
                                        '</div>' +
                                    '</div>' +
                                '</div>';

                        $('#contenido').html(html);

                        $('[data-category-save]').click(guardarCategoria);

                        $('#refresh_categories').click(cargarCategorias);
                        $('[data-delete-category]').click(eliminarCategoria);

                        $('#tabla_categorias').DataTable({
                            "language":
                            {
                                "url": "../js/spanish.json"
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