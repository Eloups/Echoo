<?php

namespace Api\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Exception\ResourceNotFoundException;

/**
 * Interface des controlleurs de l'API
 */
interface ControllerInterface
{
    /**
     * Constructeur du controlleur
     * @param string $action
     */
    public function __construct(string $action, array $params = []);

    /**
     * Lancement de l'action du contrôleur
     * @throws ResourceNotFoundException si l'action n'existe pas
     * @return Response
     */
    public function run(Request $request): Response;

    /**
     * Accesseur de l'action du contrôleur
     * action est un attribut privé du contrôleur
     * @return void
     */
    public function getAction(): string;
}