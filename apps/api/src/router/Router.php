<?php

namespace Api;

use Api\Controller\ArtistController;
use Api\Controller\ControllerInterface;
use Api\Controller\MusicController;
use Api\Controller\PlaylistController;
use Api\Controller\ProjectController;
use Api\Controller\StreamingController;
use Exception;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Exception\ResourceNotFoundException;
use Symfony\Component\Routing\Exception\RuntimeException;
use Symfony\Component\Routing\Matcher\UrlMatcher;
use Symfony\Component\Routing\RequestContext;
use Symfony\Component\Routing\RouteCollection;

/**
 * Routeur de l'API
 */
class Router
{
    /**
     * Collection de routes du routeur
     * @var RouteCollection
     */
    private RouteCollection $routeCollection;
    /**
     * Matcher d'URL de requête avec les routes
     * @var UrlMatcher
     */
    private UrlMatcher $urlMatcher;

    /**
     * Constructeur du routeur
     * @param RouteCollection $routes
     * @param Request $request
     * @throws RuntimeException si la construction rate
     */
    public function __construct(RouteCollection $routes, Request $request)
    {
        try {
            // Ajout des routes au routeur
            $this->routeCollection = $routes;

            // Création du contexte à partir de la requête
            $context = new RequestContext();
            $context->fromRequest($request);

            // Création du matcher d'URL
            $this->urlMatcher = new UrlMatcher($routes, $context);
        } catch (Exception $e) {
            throw new RuntimeException('Error while creating the router', 500);
        }
    }

    /**
     * Fonction pour matcher la requête et renvoyer le bon contrôleur
     * @param Request $request
     * @return MusicController
     */
    public function matchController(Request $request): ControllerInterface
    {
        // Utilisation du matcher pour la correspondance
        $match = $this->urlMatcher->matchRequest($request);

        // Récupération du use case et de l'action
        [$useCase, $action] = explode('|', $match['_route'], 2);

        // Renvoie vers la bonne route
        return match ($useCase) {
            'music' => new MusicController($action, $match),
            'stream' => new StreamingController($action, $match),
            'files' => new StreamingController($action, $match),
            'artist' => new ArtistController($action, $match),
            'playlist' => new PlaylistController($action, $match),
            'project' => new ProjectController($action, $match),
            default => throw new ResourceNotFoundException(),
        };
    }

    /**
     * Accesseur de la collection de routes
     * @return RouteCollection
     */
    public function getRouteCollection(): RouteCollection
    {
        return $this->routeCollection;
    }

    /**
     * Accesseur du matcher d'URL
     * @return UrlMatcher
     */
    public function getUrlMatcher(): UrlMatcher
    {
        return $this->urlMatcher;
    }
}