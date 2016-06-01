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
        $this->conectar('mysql:host=localhost;charset=utf8;dbname=ociolp', 'root', 'vertrigo');
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
                  admin BOOLEAN NOT NULL DEFAULT 0,
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
                    $sql = 'INSERT INTO usuario VALUES ("", "admin@olp.com", "' . sha1('12345678') . '", "Rogelio", "Ramos Bellido", "Soy el creador de la web Ocio Los Palacios", true)';
                    if(!$this->dbh->query($sql))
                        return false;
                    $sql = 'INSERT INTO usuario VALUES ("", "cliente@olp.com", "' . sha1('12345678') . '", "Ruben", "Ramos Bellido", "Soy el primer cliente de la web Ocio Los Palacios", false)';
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

            if($res = $this->dbh->query('SELECT * FROM local'))
            {
                if($res->rowCount() == 0)
                {
                    $sql = 'INSERT INTO local VALUES
                                (
                                    "",
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
                                    "",
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
                                    "",
                                    "Bávaro",
                                    "Pub/Terraza durante el día, Discoteca por la noche. Ven a bávaro si te gusta disfrutar en todo momento.",
                                    "El Pub/Discoteca Bávaro abrió sus puertas en 2015, comenzó siendo una discoteca por las noches pero pronto se expandió abriendo durante el día. Un Reconocido lugar en el pueblo para pasarlo bien.",
                                    "Avenida Parque Norte, 1",
                                    37.168020,
                                    -5.928805,
                                    2,
                                    "bavaro.jpg"
                                ),
                                (
                                    "",
                                    "El Garito",
                                    "Algo nuevo, donde podrás acabar tus noches de viernes y sábados con la mejor música y en la mejor compañia.",
                                    "En El Garito pasarlo bien no es una opción, es una regla. Frente a la zona de botellón es el sitio en el que a la gran mayoría de jovenes le gusta acabar sus noches, y tanta gente no puede estar equivocada así que ven y visitanos, no te arrepentirás.",
                                    "Plaza Santa Lucía, 3",
                                    37.168782,
                                    -5.929063,
                                    2,
                                    "el-garito.jpg"
                                ),
                                (
                                    "",
                                    "Parque de las Marismas",
                                    "El primer parque natural de Los Palacios situado en la parte sur del pueblo.",
                                    "El parque de las marismas es un sitio perfecto para echar el día con la familia, pareja o amigos. Cuenta con mucho terreno abierto rodeado de verde en el que se te pasará el tiempo sin que te des cuenta.",
                                    "Avenida de las Marismas, 21A",
                                    37.155377,
                                    -5.927862,
                                    4,
                                    "parque-de-las-marismas.jpg"
                                ),
                                (
                                    "",
                                    "Parque de los Hermanamientos",
                                    "Uno de los dos parques grandes del pueblo, situado en la parte norte de este.",
                                    "El parque de los Hermanamientos es un bonito parque que cuenta con buenas zonas para tumbarte en el cesped y un pequeño bar para tomar unos refrescos si te apetece. A este parque suele ir tambien mucha gente para hacer footing",
                                    "Avenida de Sevilla, 109",
                                    37.155377,
                                    -5.927862,
                                    4,
                                    "parque-de-los-hermanamientos.jpg"
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

            return true;
        }
        else
            return false;
    }
}
