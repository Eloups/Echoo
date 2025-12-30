<?php

namespace Api\Controller;

use Api\Adapter\FilesDrivingAdapter;
use Api\Controller\ControllerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Exception\ResourceNotFoundException;

class FilesController implements ControllerInterface
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
     * @param array $params
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
        $adapter = new FilesDrivingAdapter();

        return match ($this->action) {
            'getImage' => $adapter->getImageFile($this->params['fileName']),
            'addImage' => $adapter->addImageFile($request->getContent(), $request->headers->all()),
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