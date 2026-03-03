<?php

namespace Api\Controller;

use Api\Adapter\ArtistDrivingAdapter;
use Api\Utils\AuthUtils;
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
        // Authentification
        AuthUtils::authenticate($request);

        $adapter = new ArtistDrivingAdapter();
        $limit = $request->get('limit');
        if ($limit == null) {
            $limit = 6;
        }

        return match ($this->action) {
            'page' => $adapter->ArtistPage($this->params["id"], $limit),
            'like' => $adapter->likeArtist($request->getContent()),
            'artistInLibrary' => $adapter->getArtistsInLibrary($this->params["id"]),
            'albums' => $adapter->getArtistAlbums($this->params["id"]),
            'singles' => $adapter->getArtistSingles($this->params["id"]),
            'mostMistenedMonth' => $adapter->getMostListenedArtistsOfTheMonth($limit),
            'search' => $adapter->searchArtists($this->params['search'], $limit),
            'isArtistLiked' => $adapter->isArtistLiked($request->getContent()),
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

    /**
     * Accesseur des paramètres données au contrôleur
     * @return array
     */
    public function getParams(): array
    {
        return $this->params;
    }
}