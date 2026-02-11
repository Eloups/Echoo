<?php

use Api\Exception\ApiCustomException;
use Api\Router;
use Api\Utils\AuthUtils;
use Api\Utils\EnvironmentUtils;
use Symfony\Component\Dotenv\Dotenv;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Exception\MethodNotAllowedException;
use Symfony\Component\Routing\Exception\ResourceNotFoundException;

// On lance l'autoload de composer
require_once __DIR__ . '/../vendor/autoload.php';

// On charge les variables d'environnement
$dotenv = new Dotenv();
$dotenv->loadEnv(__DIR__ . '/../.env', overrideExistingVars: true);

try {
    // On récupère la requête utilisateur
    $request = Request::createFromGlobals();

    // Authentification
    AuthUtils::authenticate($request);

    // On récupère la collection de routes pour le routeur
    $routeCollection = include __DIR__ . '/../src/router/routes.php';

    // On crée le routeur de l'API
    $router = new Router($routeCollection, $request);

    // On demande le bon controlleur au routeur avec la request
    $controller = $router->matchController($request);

    // On lance l'action du controlleur
    $response = $controller->run($request);
} catch (ResourceNotFoundException $e) {
    $response = new Response(json_encode(['code' => 404, 'message' => 'Route introuvable']), 404);
    $response->headers->set('Content-Type', 'application/json;charset=UTF-8');
} catch (MethodNotAllowedException $e) {
    $response = new Response(json_encode(['code' => 405, 'message' => 'Méthode interdite']), 405);
    $response->headers->set('Content-Type', 'application/json;charset=UTF-8');
} catch (ApiCustomException $e) {
    $response = $e->intoResponse();
    $response->headers->set('Content-Type', 'application/json;charset=UTF-8');
} catch (Exception $e) {
    $response = new Response(json_encode(['code' => 500, 'message' => 'Internal server error : ' . $e->getMessage()]), 500);
    $response->headers->set('Content-Type', 'application/json;charset=UTF-8');
}

// Envoie de la réponse
$response->send();
