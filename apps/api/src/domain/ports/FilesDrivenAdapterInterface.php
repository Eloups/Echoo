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
}