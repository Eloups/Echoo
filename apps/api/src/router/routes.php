<?php

use Symfony\Component\Routing\Route;
use Symfony\Component\Routing\RouteCollection;

$routes = new RouteCollection();

// On crée les routes ici
$routes->add('getMusics', new Route('/musics', methods: 'GET'));

return $routes;