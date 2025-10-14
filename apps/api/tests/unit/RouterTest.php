<?php

use Api\Controller\MusicController;
use Api\Router;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Matcher\UrlMatcher;
use Symfony\Component\Routing\RequestContext;
use PHPUnit\Framework\TestCase;

/**
 * Tests de la classe Router.php
 */
class RouterTest extends TestCase
{
    /**
     * Test du constructeur du routeur
     * @return void
     */
    public function test_build(): void
    {
        // Création des données de tests
        $routes = include __DIR__ . '/../../src/router/routes.php';

        $request = Request::create('/test', 'GET');

        $context = new RequestContext();
        $context->fromRequest($request);

        // Création du routeur
        $router = new Router($routes, $request);

        // Tests de la construction des données
        $this->assertEquals($routes, $router->getRouteCollection());
        $this->assertEquals(new UrlMatcher($routes, $context), $router->getUrlMatcher());
    }

    /**
     * Test des routes du routeur
     * @return void
     */
    public function test_match_controller(): void
    {
        // Création des données de tests
        $routes = include __DIR__ . '/../../src/router/routes.php';

        // Test d'une requête de musique
        $request = Request::create('/musics', 'GET');
        $router = new Router($routes, $request);
        $controller = $router->matchController($request);

        $this->assertInstanceOf(MusicController::class, $controller);
    }
}