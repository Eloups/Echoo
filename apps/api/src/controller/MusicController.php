<?php

namespace Api\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Exception\ResourceNotFoundException;

/**
 * Controlleur des fonctions liées aux musiques
 */
class MusicController implements ControllerInterface
{
    /**
     * Action à lancer pour le contrôleur
     * @var string
     */
    private string $action;

    /**
     * Constructeur du contrôlleur de musiques
     * @param string $action
     */
    public function __construct(string $action)
    {
        $this->action = $action;
    }

    /**
     * Lancement de l'action du contrôleur
     * @throws ResourceNotFoundException si l'action n'existe pas
     * @return Response
     */
    public function run(): Response
    {
        $response = match ($this->action) {
            'list' => new Response(json_encode(['code' => 200, 'message' => 'Réussi']), 200), //! Remplacer par la bonne fonction driving adapter
            default => throw new ResourceNotFoundException(),
        };

        return $response;
    }

    /**
     * Accesseur de l'action du contrôleur
     * @return string
     */
    public function getAction(): string
    {
        return $this->action;
    }
}