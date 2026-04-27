<?php
include 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $usuario = $_POST['usuario'];
    $password = $_POST['password']; 

    $sql = "INSERT INTO usuarios (usuario, password) VALUES ('$usuario', '$password')";

    if (mysqli_query($conexion, $sql)) {
        echo "Cuenta guardada exitosamente.";
    } else {
        echo "Error MySQL: " . mysqli_error($conexion);
    }
}
?>