<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['file_content']) && isset($_POST['file_name'])) {
    $uploadDir = '/usr/share/nginx/html/images/';
    $targetPath = $uploadDir . $_POST['file_name'];

    $fileContent = base64_decode($_POST['file_content']);

    if (file_put_contents($targetPath, $fileContent)) {
        echo "Success";
    } else {
        echo "File creation error";
    }
} else {
    echo "Unauthorized method or missing informations";
}
