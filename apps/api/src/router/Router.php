<?php

namespace Api;

use Exception;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
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
     * Fonction pour utiliser le routeur
     * @param Request $request
     * @throws ResourceNotFoundException si la requête ne correspond à aucune routes
     * @return Response
     */
    public function useRoute(Request $request): Response
    {
        try {
            // Utilisation du matcher pour la correspondance
            $match = $this->urlMatcher->matchRequest($request);

            // Renvoie vers la bonne route
            match ($match['_route']) {
                'getMusic' => $response = new Response(json_encode(['code' => 200, 'message' => 'Réussi']), 200),
                default => throw new ResourceNotFoundException(),
            };
        } catch (ResourceNotFoundException $e) {
            $response = new Response(json_encode(['code' => 404, 'message' => 'Route introuvable'], 404));
        } catch (Exception $e) {
            print_r($e);
            $response = new Response(json_encode(['code' => 500, 'message' => 'Internal server error']));
        }

        return $response;
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