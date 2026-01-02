<?php

namespace Api\Controller;

use Api\Adapter\ArtistDrivingAdapter;
use Api\Adapter\PlaylistDrivingAdapter;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Exception\ResourceNotFoundException;

/**
 * Controlleur des fonctions liées aux playlists
 */
class PlaylistController implements ControllerInterface
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
        $adapter = new PlaylistDrivingAdapter();

        return match ($this->action) {
            'getOnePlaylist' => $adapter->getOnePlaylist($this->params["id"]),
            'getPlaylistsOfLibrary' => $adapter->getPlaylistInLibrary($this->params["id"]),
            'addMusicToPlaylist' => $adapter->addMusicInPlaylist($request->getContent()),
            'deletePlaylist' => $adapter->deletePlaylist($this->params["id"]),
            'addPlaylist' => $adapter->addPlaylist($request->getContent()),
            'deleteMusicToPlaylist' => $adapter->deleteMusicInPlaylist($request->getContent()),
            'updatePlaylist' => $adapter->updatePlaylist($this->params["id"], $request->getContent()),
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