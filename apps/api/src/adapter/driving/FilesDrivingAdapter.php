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
}