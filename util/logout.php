<?php
session_start();
unset($_SESSION['usuario']);
echo json_encode(array('estado' => 'ok'));