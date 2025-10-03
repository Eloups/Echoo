<?php

use Api\Router;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Matcher\UrlMatcher;
use Symfony\Component\Routing\RequestContext;
use Symfony\Component\Routing\Route;
use Symfony\Component\Routing\RouteCollection;
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
        $routes = new RouteCollection();
        $routes->add('music', new Route('/music', methods: ['GET', 'POST']));
        $routes->add('artist', new Route('/artist', methods: 'PUT'));
        $routes->add('users', new Route('/users', methods: 'GET'));
        $routes->add('user', new Route('/users/{id}', ['id' => 55], methods: 'GET'));

        $request = Request::create('/users/', 'GET');

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
    public function test_useRoutes(): void
    {
        // Création des données de tests
        $routes = new RouteCollection();
        $routes->add('getMusic', new Route('/music', methods: ['GET', 'POST']));
        $routes->add('artist', new Route('/artist', methods: 'PUT'));
        $routes->add('users', new Route('/users', methods: 'GET'));
        $routes->add('user', new Route('/users/{id}', ['id' => 55], methods: 'GET'));

        $request = Request::create('/music', 'GET');

        // Création du routeur
        $router = new Router($routes, $request);

        // Test de la requête
        $response = $router->useRoutes($request);

        // Test de l'utilisation du routeur
        $this->assertEquals(200, $response->getStatusCode());
        $this->assertEquals('{"code":200,"message":"R\u00e9ussi"}', $response->getContent());
    }
}