<?php

use Symfony\Component\Routing\Route;
use Symfony\Component\Routing\RouteCollection;

$routes = new RouteCollection();

// On crée les routes ici
// Musiques
$routes->add('music|list', new Route('/musics/artist/{id}', methods: 'GET'));
$routes->add('music|like', new Route('/music/like', methods: 'POST'));

// Streaming
$routes->add('stream|getFile', new Route('/stream/{fileName}', methods: 'GET'));

// Interractions file server
$routes->add('files|getImage', new Route('/images/{fileName}', methods: 'GET'));

// Artiste
$routes->add('artist|page', new Route('/artist/{id}/page', methods: 'GET'));
$routes->add('artist|like', new Route('/artist/like', methods: 'POST'));
$routes->add('artist|artistInLibrary', new Route('/artist/library/{id}/all', methods: 'GET'));
$routes->add('artist|albums', new Route('/artist/{id}/albums', methods: 'GET'));
$routes->add('artist|singles', new Route('/artist/{id}/singles', methods: 'GET'));

// Playlist
$routes->add('playlist|getOnePlaylist', new Route('/playlist/{id}', methods: 'GET'));
$routes->add('playlist|getPlaylistsOfLibrary', new Route('/playlist/library/{id}/all', methods: 'GET'));

// Projet
$routes->add('project|like', new Route('/project/like', methods: 'POST'));
$routes->add('project|projectsInLibrary', new Route('/project/library/{id}/all', methods: 'GET'));

// User
$routes->add('user|listenedMusics', new Route('/user/{id}/listened/musics', methods: 'GET'));
$routes->add('user|addListenedMusics', new Route('/user/listened/musics/add', methods: 'POST'));

return $routes;