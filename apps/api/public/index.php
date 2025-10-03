<?php

use Api\Router;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

// On lance l'autoload de composer
require_once __DIR__ . '/../vendor/autoload.php';

try {
    // On récupère la requête utilisateur
    $request = Request::createFromGlobals();

    // On récupère la collection de routes pour le routeur
    $routeCollection = include __DIR__ . '/../src/router/routes.php';

    // On crée le routeur de l'API
    $router = new Router($routeCollection, $request);

    // On utilise le routeur avec la request
    $response = $router->useRoute($request);
} catch (Exception $e) {
    $response = new Response(json_encode(['code' => 500, 'message' => 'Internal server error']), 500);
}

// Envoie de la réponse
$response->headers->set('Content-Type', 'application/json;charset=UTF-8');
$response->send();
