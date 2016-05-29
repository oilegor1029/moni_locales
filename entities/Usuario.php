<?php

class Usuario
{
    private $id, $email, $nombre, $apellidos, $descripcion, $admin;

    function __construct($id, $email, $nombre, $apellidos, $descripcion, $admin)
    {
        $this->id = $id;
        $this->email = $email;
        $this->nombre = $nombre;
        $this->apellidos = $apellidos;
        $this->descripcion = $descripcion;
        $this->admin = $admin;
    }

    public function getId()
    {
        return $this->id;
    }

    public function getEmail()
    {
        return $this->email;
    }

    public function getNombre()
    {
        return $this->nombre;
    }

    public function getApellidos()
    {
        return $this->apellidos;
    }

    public function getDescripcion()
    {
        return $this->descripcion;
    }

    public function getAdmin()
    {
        return $this->admin;
    }
}