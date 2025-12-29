<?php

namespace Api\Domain\Service;

use Api\Adapter\FilesDrivenAdapter;
use Api\Domain\Ports\FilesServiceInterface;
use Symfony\Component\HttpFoundation\Response;

/**
 * Service de fichiers
 */
class FilesService implements FilesServiceInterface
{
    /**
     * Action de la récupération de fichier image
     * @param string $fileName
     * @return void
     */
    public function getImageFile(string $fileName): Response
    {
        $adapter = new FilesDrivenAdapter();

        return $adapter->getImageFile($fileName);
    }

    /**
     * Fonction pour ajouter une image au serveur de fichier
     * @param string $fileContent
     * @param string $contentType
     * @return Response
     */
    public function addImageFile(string $fileContent, string $contentType): Response
    {
        $adapter = new FilesDrivenAdapter();

        return $adapter->addImageFile($fileContent, $contentType);
    }
}