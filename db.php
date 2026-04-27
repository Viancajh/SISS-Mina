<?php
$host = "sql211.infinityfree.com"; 
$user = "if0_41763857";            
$pass = "u"; 
$db   = "if0_41763857_siss_db";    

$conexion = mysqli_connect($host, $user, $pass, $db);

if (!$conexion) {
    die("Error de conexión: " . mysqli_connect_error());
}
?>