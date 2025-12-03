<?php

namespace Api\Controller;

use Api\Adapter\ArtistDrivingAdapter;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Exception\ResourceNotFoundException;

/**
 * Controlleur des fonctions liées aux artistes
 */
class ArtistController implements ControllerInterface
{
    /**
     * Action à lancer pour le contrôleur
     * @var string
     */
    private string $action;

    /**
     * Récupérer les paramètres de la requête depuis le routeur
     * @var array
     */
    private array $params = [];

    /**
     * Constructeur du contrôlleur des artistes
     * @param string $action
     */
    public function __construct(string $action, array $params = [])
    {
        $this->action = $action;
        $this->params = $params;
    }

    /**
     * Lancement de l'action du contrôleur
     * @throws ResourceNotFoundException si l'action n'existe pas
     * @return Response
     */
    public function run(Request $request): Response
    {
        $adapter = new ArtistDrivingAdapter();
        $idArtist = $this->params["id"];
        $limit = $request->get('limit');
        if ($limit == null) {
            $limit = 6;
        }
        
        return match ($this->action) {
            'page' => $adapter->ArtistPage( $idArtist, $limit),
            default => throw new ResourceNotFoundException(),
        };
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