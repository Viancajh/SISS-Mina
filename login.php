<?php
// Reporte de errores para que nos diga qué falla exactamente
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include 'db.php';

// Verificar si la conexión existe
if (!isset($conexion)) {
    die("Error: No se encontró la variable de conexión.");
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $user = $_POST['usuario'] ?? '';
    $pass = $_POST['password'] ?? '';

    if (empty($user) || empty($pass)) {
        die("Error: Usuario o contraseña vacíos.");
    }

    $query = "SELECT * FROM usuarios WHERE usuario = '$user'";
    $resultado = mysqli_query($conexion, $query);

    if ($resultado && mysqli_num_rows($resultado) > 0) {
        $fila = mysqli_fetch_assoc($resultado);
        if ($pass == $fila['password']) {
            echo "¡Bienvenido!";
        } else {
            echo "Contraseña incorrecta.";
        }
    } else {
        echo "El usuario no existe.";
    }
} else {
    echo "Servicio de Login Activo (Esperando POST)";
}
?>