<?php

use Symfony\Component\Routing\Route;
use Symfony\Component\Routing\RouteCollection;

$routes = new RouteCollection();

// On crée les routes ici
//* test
$routes->add('getMusic', new Route('/music', methods: ['GET', 'POST']));

return $routes;