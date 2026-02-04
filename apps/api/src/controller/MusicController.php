<?php

namespace Api\Controller;

use Api\Adapter\MusicDrivingAdapter;
use Symfony\Component\HttpFoundation\Request;
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
     * Récupérer les paramètres de la requête depuis le routeur
     * @var array
     */
    private array $params = [];

    /**
     * Constructeur du contrôlleur de musiques
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
        $adapter = new MusicDrivingAdapter();
        $response = match ($this->action) {
            'list' => $adapter->listMusics($this->params["id"]),
            'like' => $adapter->likeMusic($request->getContent()),
            'ratings' => $adapter->getMusicsRatings($this->params["id"], $request->get('limit') ?? 6),
            'coverPathProject' => $adapter->getCoverFileProject($this->params["id"]),
            default => throw new ResourceNotFoundException(),
        };

        $response->headers->set('Content-Type', 'application/json;charset=UTF-8');
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

    /**
     * Accesseur des paramètres données au contrôleur
     * @return array
     */
    public function getParams(): array
    {
        return $this->params;
    }
}