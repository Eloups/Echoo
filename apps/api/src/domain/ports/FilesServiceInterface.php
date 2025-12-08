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
     * @return void
     */
    public function getImageFile(string $fileName): Response;
}