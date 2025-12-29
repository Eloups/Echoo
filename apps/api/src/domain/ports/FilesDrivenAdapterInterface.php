<?php

namespace Api\Domain\Ports;

use Symfony\Component\HttpFoundation\Response;

/**
 * Interface de l'adaptateur piloté des fichiers
 */
interface FilesDrivenAdapterInterface
{
    /**
     * Méthode de récupération d'un fichier image
     * @param string $fileName
     * @return Response
     */
    public function getImageFile(string $fileName): Response;

    /**
     * Méthode pour ajouter une image au serveur de fichier
     * @param string $fileContent
     * @param string $contentType
     * @return void
     */
    public function addImageFile(string $fileContent, string $contentType): Response;
}