<?php
//Temporal hasta que lo pase a smarty
?>
<footer class="footer">
    <div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="col-md-6">
                    <h3>Nuestro objetivo</h3>
                    <p>Esta web esta dedicada a encontrar lugares en el pueblo en los que poder salir a entretenernos.</p>
                    <p>Si conoces algun lugar que creas que deba estar en la web no dudes en comentarnoslo y lo añadiremos lo antes posible.</p>
                    <a href="contacto.html">Contacta con nosotros</a>
                    <address>
                    </address>
                </div>

                <div class="col-md-6 instagram-photos">
                    <h3>Siguenos en Instagram</h3>
                    <p>Allí avisamos cada vez que agregamos un nuevo lugar</P>
                    <!-- place your instagram widget below -->
                    <a href="#"><img src="http://placehold.it/100x100" alt=""></a>
                    <a href="#"><img src="http://placehold.it/100x100" alt=""></a>
                    <a href="#"><img src="http://placehold.it/100x100" alt=""></a>
                    <a href="#"><img src="http://placehold.it/100x100" alt=""></a>
                    <a href="#"><img src="http://placehold.it/100x100" alt=""></a>
                </div>
            </div>
        </div>
    </div>
    <div class="text-right">
        <a href="#home"><i class="fa fa-arrow-up"></i></a>
    </div>
    <div class="footer-bottom">
        <div class="container">
            <div class="row">
                <div class="col-md-6">
                    <p>&copy; 2016 — Diseñado por Rogelio Ramos Bellido</p>
                </div>
                <div class="col-md-6 footer-menu text-right">
                    <ul class="list-inline">
                        <li><a href="index.html" <?php if($pagina=="mapa") echo "class='active'"; ?>>Mapa Moñi</a></li>
                        <li><a href="locales.html" <?php if($pagina=="local") echo "class='active'"; ?>>Locales</a></li>
                        <li><a href="contacto.html" <?php if($pagina=="contacto") echo "class='active'"; ?>>Contacta con nosotros</a></li>
                        <li><a href="usuario.html" <?php if($pagina=="usuario") echo "class='active'"; ?>>Usuario</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</footer>
