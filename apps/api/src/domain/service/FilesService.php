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
}