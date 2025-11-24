<?php

use Symfony\Component\Routing\Route;
use Symfony\Component\Routing\RouteCollection;

$routes = new RouteCollection();

// On crée les routes ici
$routes->add('music|list', new Route('/artist/{id}/musics', methods: 'GET'));

$routes->add('artist|page', new Route('/artist/{id}/page', methods: 'GET'));

return $routes;