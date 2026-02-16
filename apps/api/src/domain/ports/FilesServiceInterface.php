<?php

namespace Api\Domain\Ports;

use Symfony\Component\HttpFoundation\Response;

/**
 * Interface du service de fichiers
 */
interface FilesServiceInterface
{
    /**
     * Action de la récupération de fichier image
     * @param string $fileName
     * @return Response
     */
    public function getImageFile(string $fileName): Response;

    /**
     * Action d'ajouter une image au serveur de fichier
     * @param string $fileContent
     * @param string $contentType
     * @return Response
     */
    public function addImageFile(string $fileContent, string $contentType): Response;
}