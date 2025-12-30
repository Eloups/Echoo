<?php

namespace Api\Adapter;

use Api\Domain\Service\FilesService;
use Symfony\Component\HttpFoundation\Response;

/**
 * Adaptateur pilote pour les fichiers
 */
class FilesDrivingAdapter
{
    /**
     * Action de récupération d'un fichier d'image
     * @param string $fileName
     * @return Response
     */
    public function getImageFile(string $fileName): Response
    {
        $service = new FilesService();

        return $service->getImageFile($fileName);
    }

    /**
     * Fonction pour ajouter une image au serveur de fichier
     * @param string $requestContent
     * @param array $requestHeaders
     * @return Response
     */
    public function addImageFile(string $requestContent, array $requestHeaders): Response
    {
        if (!array_key_exists('content-type', $requestHeaders)) {
            return new Response(json_encode(['code' => 400, 'message' => 'header content-type manquant']), 400);
        }
        if (empty($requestContent)) {
            return new Response(json_encode(['code' => 400, 'message' => 'fichier à ajouter manquant']), 400);
        }

        $service = new FilesService();

        return $service->addImageFile($requestContent, $requestHeaders['content-type'][0]);
    }
}