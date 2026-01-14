<?php

namespace Api\Controller;

use Api\Adapter\UserDrivingAdapter;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Exception\ResourceNotFoundException;

/**
 * Contrôleur des actions sur les utilisateurs
 */
class UserController implements ControllerInterface
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
     * Constructeur du contrôlleur des projets
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

        $adapter = new UserDrivingAdapter();

        $response = match ($this->action) {
            'listenedMusics' => $adapter->getUserListenedMusics($this->params['id'], $request->get('limit') ?? 6),
            'addListenedMusics' => $adapter->addUserListenedMusic($request->getContent()),
            'artistsLastsReleases' => $adapter->getUserArtistsLastsReleases($this->params['id'], $request->get('limit') ?? 6),
            'mostListenedMusicsOfTheMonth' => $adapter->getUserMostListenedMusicsOfTheMonth($this->params['id'], $request->get('limit') ?? 6),
            'create' => $adapter->createUser($request->getContent()),
            'getAll' => $adapter->getAllUsers(),
            'getOne' => $adapter->getOneUser($this->params['id']),
            'update' => $adapter->updateUser($this->params['id'], $request->getContent()),
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