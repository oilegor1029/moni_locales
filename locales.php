<!DOCTYPE html>
<html lang="es">
<head>
    <?php include "head.php"; ?>
</head>
<body>
    <?php include "header.php"; ?>

    <!-- portfolio section -->
    <section class="works text-center">
        <div class="container">
            <div class="row">
                <div class="col-md-12">
                    <h2>Categorias</h2>
                    <ul class="list-inline">
                        <li class="filter active" data-filter=".todos">Todos</li>
                        <li class="filter" data-filter=".bares-restaurantes">Bares y Restaurantes</li>
                        <li class="filter" data-filter=".pubs-discotecas">Pubs y discotecas</li>
                        <li class="filter" data-filter=".hoteles">Hoteles y hostales</li>
                        <li class="filter" data-filter=".otros">Otros</li>
                    </ul>
                </div>
                <!-- single portfolio item -->
                <div class="col-md-4 col-sm-6 mix web-development all" data-myorder="2">
                    <div class="single-work">
                        <img src="img/works/1.jpg" alt="#">
                        <div class="overlay">
                            <h3>Project Title Here</h3>
                            <a href="#" type="button" data-toggle="modal" data-target="#myModal1"><i class="fa fa-search-plus"></i></a>
                            <!-- Modal -->
                            <div class="modal fade" id="myModal1" role="dialog">
                                <div class="modal-dialog">

                                    <!-- Modal content-->
                                    <div class="modal-content text-center">
                                        <div class="modal-header">
                                            <button type="button" class="close" data-dismiss="modal">&times;</button>
                                            <h4>Project title</h4>
                                        </div>
                                        <div class="col-md-12">
                                            <div class="modal-body col-md-8 col-md-offset-2">
                                                <img src="img/works/1.jpg" alt="#">
                                                <ul class="list-inline">
                                                    <li>Client: Shaped Theme</li>
                                                    <li>Finished Date: November 15, 2015 </li>
                                                    <li>Technology: HTML, CSS, JS and Bootstrap 3</li>
                                                </ul>
                                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Pariatur accusantium in, provident officiis labore, iste fugiat quas ratione error accusamus possimus dolor aliquid ipsum hic! Quibusdam recusandae, voluptatem totam fugit ad, est nulla necessitatibus expedita amet molestias dignissimos, praesentium sequi. A reprehenderit, vitae ducimus facere sequi, pariatur repudiandae voluptates earum reiciendis veniam blanditiis. Sapiente quos animi numquam incidunt totam delectus voluptates illum ullam tempora labore, earum perferendis ab cupiditate facere quia eaque error id placeat blanditiis qui amet odio ipsam, unde? Maiores enim minima omnis sequi ipsum vel eum mollitia, sapiente totam deleniti culpa libero temporibus non consequatur qui in.</p>
                                            </div>
                                        </div>
                                        <div class="modal-footer">
                                            <button type="button" class="btn btn-default" data-dismiss="modal">Close<i class="fa fa-times"></i></button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section><!-- end of portfolios -->

    <!-- script tags
        ============================================================= -->
    <script src="js/jquery-2.1.1.js"></script>
    <script src="js/jquery.mixitup.js"></script>
    <script src="js/smoothscroll.js"></script>
    <script src="js/bootstrap.min.js"></script>
    <script src="js/custom.js"></script>
</body>
</html>
