<?php

class DB extends PDO
{
    private static $instancia = null;
    private $dbh = null;

    public function getDbh()
    {
        return $this->dbh;
    }

    function __construct()
    {
        $this->conectar('mysql:host=localhost;charset=utf8;dbname=ociolp', 'root', '');
    }
    public static function getInstancia()
    {
        if(!isset(self::$instancia))
            self::$instancia = new DB();
        return self::$instancia;
    }
    private function conectar($dsn, $usuario, $pass)
    {
        try
        {
            $this->dbh = new PDO($dsn, $usuario, $pass);
            $this->dbh->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            return true;
        }
        catch(PDOException $e)
        {
            return false;
        }
    }
    public function desconectar()
    {
        $this->dbh = null;
    }
        public function __clone()
    {
        throw new Exception("No se puede clonar esta instancia.");
    }
    public function crearEstructura()
    {
        if($this->dbh != null)
        {
            if(!$this->dbh->query('CREATE TABLE IF NOT EXISTS usuario (
                  id INT NOT NULL AUTO_INCREMENT,
                  email VARCHAR (200) NOT NULL,
                  pass VARCHAR (255) NOT NULL,
                  nombre VARCHAR (100),
                  apellidos VARCHAR (200),
                  descripcion VARCHAR (200),
                  admin BOOLEAN DEFAULT FALSE,
                  UNIQUE (email),
                  PRIMARY KEY (id)
                  )'
                )
            )
                return false;

            if($res = $this->dbh->query('SELECT * FROM usuario'))
            {
                if($res->rowCount() == 0)
                {
                    $sql = 'INSERT INTO usuario VALUES ("id", "admin@olp.com", "' . sha1('12345678') . '", "Rogelio", "Ramos Bellido", "Soy el creador de la web Ocio Los Palacios", true)';
                    if(!$this->dbh->query($sql))
                        return false;
                    $sql = 'INSERT INTO usuario VALUES ("id", "cliente@olp.com", "' . sha1('12345678') . '", "Ruben", "Ramos Bellido", "Soy el primer cliente de la web Ocio Los Palacios")';
                    if(!$this->dbh->query($sql))
                        return false;
                }
            }

            if(!$this->dbh->query('CREATE TABLE IF NOT EXISTS categoria (
                id INT NOT NULL AUTO_INCREMENT, 
                nombre VARCHAR(200), 
                PRIMARY KEY (id))'))
                return false;

            if($res = $this->dbh->query('SELECT * FROM categoria'))
            {
                if($res->rowCount() == 0)
                {
                    $sql = 'INSERT INTO categoria VALUES
                                          (NULL, "Bares y restaurantes"),
                                          (NULL, "Pubs y discotecas"),
                                          (NULL, "Hoteles y hostales"),
                                          (NULL, "Otros")';
                    if(!$this->dbh->query($sql))
                        return false;
                }
            }

            if(!$this->dbh->query('CREATE TABLE local (
                        id INT NOT NULL AUTO_INCREMENT,
                        nombre VARCHAR(50),
                        breve_descripcion TEXT,
                        descripcion TEXT,
                        direccion VARCHAR(255) NOT NULL,
                        lat FLOAT(10,6) NOT NULL,
                        lng FLOAT(10,6) NOT NULL,
                        categoria INT,
                        img VARCHAR(255),
                        PRIMARY KEY (id),
                        FOREIGN KEY (categoria) REFERENCES categoria(id) ON DELETE SET NULL ON UPDATE CASCADE
                    );'
                )
            )
                return false;

            if($res = $this->dbh->query('SELECT * FROM producto'))
            {
                if($res->rowCount() == 0)
                {
                    $sql = 'INSERT INTO producto VALUES (
                                                        NULL,
                                                        "Bar Manolo Mayo",
                                                        "El Bar/Restaurante Manolo Mayo es un establecimiento que apuesta por la mezcla de lo tradicional junto a las novedades en la cocina tradicional.Cuenta con hotel en la planta superior",
                                                        "Nuestro restaurante, que hoy en día abandera el conjunto de establecimientos que defienden a ultranza las buenas y cada vez más apreciadas maneras de la cocina tradicional. Contundente y segura en la concepción, nuestra carta, repleta de recetas caseras como siempre se ha cocinado en cualquier hogar andaluz; al amos de la lumbre; pero aplicando en ciertos casos, apreciables técnicas actuales. Queda reflejado en nuestras propuestas tradicionales, como nuestros afamados Arrocez con Perdiz, Bogavante, Carabinero, etc… También se manifiesta en nuestras formas, llegando a sorprender platos como el Bombón de Atún sobre berenjena rebozada, Croquetas de Rape envueltas en Kikos y miel de caña…",
                                                        "Avenida de Sevilla, 29",
                                                        37.161997,
                                                        -5.924168,
                                                        1,
                                                        "bar-manolo-mayo.jpg"
                                                        ),
                                                        (
                                                        NULL,
                                                        "Hotel Manolo Mayo",
                                                        "El Hotel Manolo Mayo es un establecimiento que cuenta con 45 habitaciones totalmente acomodadas. Tiene un restaurante en el edificio con mismo nombre.",
                                                        "El antiguo hotel Manolo Mayo se inauguró en 1985. En el año 2004 se lleva a cabo la obra de reconstrucción integral sobre el edificio originario; sin embargo, este nuevo establecimiento hotelero, de líneas modernas, mantiene intacto su espíritu familiar.El hotel Manolo Mayo dispone de 45 habitaciones, entre dobles e individuales, dotadas de baño, TV, minibar, aire acondicionado frio/calor y conexión continua a internet. Las 45 habitaciones, amuebladas y muy confortables, están bien orientadas y son tranquilas y luminosas.La decoración general es sobria, combinando la madera con tonos en crema y azul, muy elegantes.",
                                                        "Avenida de Sevilla, 29",
                                                        37.161997,
                                                        -5.924168,
                                                        3,
                                                        "hotel-manolo-mayo.jpg"
                                                        ),
                                                        (
                                                        NULL,
                                                        "Pub Bávaro",
                                                        "Pub/Terraza durante el día, Discoteca por la noche. Ven a bávaro si te gusta disfrutar en todo momento."
                                                        "El Pub/Discoteca Bávaro abrió sus puertas en 2015, comenzó siendo una discoteca por las noches pero pronto se expandió abriendo durante el día. Un Reconocido lugar en el pueblo para pasarlo bien."
                                                        "Avenida Parque Norte, 1",
                                                        37.168020,
                                                        -5.928805,
                                                        2,
                                                        "bavaro.jpg"
                                                        ),
                                                        (
                                                        NULL,
                                                        "El Garito",
                                                        "El Garito es el lugar en el que pasarlo bien por las noches no es una opción, es una regla."
                                                        "El Garito es un pub nocturo situado junto a la Plaza de Santa Lucía, frente a la zona de botellón. Es el sitio en el que a la gran mayoría de jovenes le gusta acabar sus noches, y tanta gente no puede estar equivocada así que ven y visitanos, no te arrepentirás."
                                                        "Plaza Santa Lucía, 3",
                                                        37.168782,
                                                        -5.929063,
                                                        2,
                                                        "el-garito.jpg"
                                                        ),
                                                        (
                                                        NULL,
                                                        "Parque de las Marismas",
                                                        "El primer parque natural de Los Palacios situado en la parte sur del pueblo."
                                                        "El parque de las marismas es un sitio perfecto para echar el día con la familia, pareja o amigos. Cuenta con mucho terreno abierto rodeado de verde en el que se te pasará el tiempo sin que te des cuenta."
                                                        "Avenida de las Marismas, 21A",
                                                        37.155377,
                                                        -5.927862,
                                                        4,
                                                        "parque-marismas.jpg"
                                                        )';
                    if(!$this->dbh->query($sql))
                        return false;
                }
            }

            if($res = $this->dbh->query('SELECT * FROM producto'))
            {
                if($res->rowCount() == 0)
                {
                    $sql = 'INSERT INTO producto VALUES (
                                                        NULL,
                                                        "Canapé de madera Abatible Canadá",
                                                        "El canapé Canadá es el modelo ideal para los que buscan lo cómodo y lo estético como base de su decoración. Su gran capacidad le permite almacena todo tipo de artículos, y además combina a la perfección el espacio con la resistencia. Ideal para pisos con poco espacio de almacenamiento. Éste canapé, que apoya en el suelo se comporta como un mueble más, sin necesidad de moverlo.",
                                                        289.50,
                                                        3,
                                                        16,
                                                        "canape-de-madera-abatible-canada.jpg"
                                                        ),
                                                        (
                                                        NULL,
                                                        "Canapé de madera Abatible 3D",
                                                        "El modelo Canapé 3D es el modelo de madera más económico del mercado. Sus acabados te permiten garantizar la máxima resistencia con las mejores prestaciones. Es un Canapé que permite la posibilidad de limpiar por bajo, ya que no va a suelo y además existe la opción de ponerle ruedas para facilitar su desplazamiento.",
                                                        199.00,
                                                        3,
                                                        7,
                                                        "canape-abatible-canada.jpg"
                                                        ),
                                                        (
                                                        NULL,
                                                        "Canapé Abatible Multiláminas",
                                                        "Canapé abatible modelo Multiláminas. Muy útil cuando tenemos poco espacio en nuestra habitación. Precio imbatible! Y calidad insuperable! DIVAN ABATIBLE MOD.605 DE MADERA MULTILAMINAS DISEÑO, FLEXIBILIDAD Y FIRMEZA",
                                                        217.00,
                                                        3,
                                                        21,
                                                        "canape-abatible-multilaminas.jpg"
                                                        ),
                                                        (
                                                        NULL,
                                                        "Canapé Abatible Javea",
                                                        "Si quieres lo mejor, y lo quieres ya,  solo tienes que pedirlo éste es tu modelo. El canapé Jávea  engloba lo mejor de la casa, su acabado de madera, le confiere firmeza, resistencia y durabilidad, y su terminación el polipiel le confiere, belleza, modernidad y practicidad. Es un canapé con líneas rectas, modernas y minimalistas. ",
                                                        389.00,
                                                        3,
                                                        0,
                                                        "canape-abatible-javea.jpg"
                                                        ),
                                                        (
                                                        NULL,
                                                        "Almohada Fibra Baby",
                                                        "Para los más peques de la casa desde 1 a 8 años , o para los amantes de las almohadas extremadamente suaves.",
                                                        11.00,
                                                        2,
                                                        59,
                                                        "almohada-fibra-baby.jpg"
                                                        ),
                                                        (
                                                        NULL,
                                                        "Colchón Viscoelástico Visconet",
                                                        "Diseñado para los que buscan un colchón apto para todos los públicos. El modelo Visconet, de venta sólo en internet, con su tecnología exclusiva, maximiza el descanso de calidad, gracias a su sistema de amortiguación interno, que consigue la máxima adaptación para todos los públicos.",
                                                        136.21,
                                                        1,
                                                        0,
                                                        "colchon-viscoelastico-visconet.jpg"
                                                        ),
                                                        (
                                                        NULL,
                                                        "Colchón Viscoelástico Cadet",
                                                        "El colchón Cadet está especialmente indicado para camas nido y literas, ya que por su altura es perfecto para este tipo de descanso.",
                                                        129.00,
                                                        1,
                                                        12,
                                                        "colchon-viscoelastico-cadet.jpg"
                                                        ),
                                                        (
                                                        NULL,
                                                        "Colchón Viscoelástico Indico",
                                                        "Diseñado para los que buscan un colchón extra firme de primera calidad, con tratamiento aloe vera. El modelo Indico,  con su tecnología exclusiva, maximiza el descanso firme, gracias a su sistema de amortiguación interno, que consigue la máxima adaptación con la mayor firmeza.",
                                                        168.00,
                                                        1,
                                                        12,
                                                        "colchon-viscoelastico-indico.jpg"
                                                        )';
                    if(!$this->dbh->query($sql))
                        return false;
                }
            }

            if(!$this->dbh->query('CREATE TABLE comentario (
                        id INT NOT NULL AUTO_INCREMENT,
                        usuario INT NOT NULL,
                        local INT NOT NULL,
                        texto TEXT,
                        PRIMARY KEY (id),
                        FOREIGN KEY (usuario) REFERENCES usuario(id),
                        FOREIGN KEY (local) REFERENCES local(id)
                    );'
                )
            )
                return false;

            if(!$this->dbh->query('CREATE TABLE votacion (
                        id INT NOT NULL AUTO_INCREMENT,
                        usuario INT NOT NULL,
                        local INT NOT NULL,
                        puntuacion FLOAT,
                        PRIMARY KEY (id),
                        FOREIGN KEY (usuario) REFERENCES usuario(id),
                        FOREIGN KEY (local) REFERENCES local(id)
                    );'
                )
            )
                return false;

            if(!$this->dbh->query('CREATE TABLE IF NOT EXISTS pedido
                (
                  num_pedido INT NOT NULL AUTO_INCREMENT,
                  dni VARCHAR(9),
                  fecha DATE,
                  total_pedido DECIMAL(10,2),
                  PRIMARY KEY (num_pedido),
                  FOREIGN KEY (dni) REFERENCES usuario(dni) ON DELETE CASCADE ON UPDATE CASCADE
                )')
            )
                return false;
            if(!$this->dbh->query('CREATE TABLE IF NOT EXISTS linea
                (
                  num_linea INT NOT NULL AUTO_INCREMENT,
                  num_pedido INT,
                  num_producto INT,
                  num_cantidad_producto INT,
                  PRIMARY KEY (num_linea),
                  FOREIGN KEY (num_pedido) REFERENCES pedido(num_pedido) ON DELETE CASCADE ON UPDATE CASCADE ,
                  FOREIGN KEY (num_producto) REFERENCES producto(cod)
                )')
            )
                return false;

            return true;
        }
        else
            return false;
    }
}
