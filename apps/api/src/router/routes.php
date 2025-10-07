<?php

use Symfony\Component\Routing\Route;
use Symfony\Component\Routing\RouteCollection;

$routes = new RouteCollection();

// On crée les routes ici
$routes->add('music|list', new Route('/musics', methods: 'GET'));

return $routes;