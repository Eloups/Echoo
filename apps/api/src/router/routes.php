<?php

use Symfony\Component\Routing\Route;
use Symfony\Component\Routing\RouteCollection;

$routes = new RouteCollection();

// On crée les routes ici
// Musiques
$routes->add('music|list', new Route('/musics/artist/{id}', methods: 'GET'));

// Streaming
$routes->add('stream|getFile', new Route('/stream/{fileName}', methods: 'GET'));

// Interractions file server
$routes->add('files|getImage', new Route('/images/{fileName}', methods: 'GET'));

// Artiste
$routes->add('artist|page', new Route('/artist/{id}/page', methods: 'GET'));

$routes->add('playlist|getOnePlaylist', new Route('/playlist/{id}', methods: 'GET'));

return $routes;