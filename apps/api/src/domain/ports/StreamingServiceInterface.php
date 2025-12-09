<?php

namespace Api\Domain\Ports;

use Symfony\Component\HttpFoundation\StreamedResponse;

/**
 * Interface du service de streaming
 */
interface StreamingServiceInterface
{
    /**
     * Action de récupération d'un fichier de musique en stream
     * @param string $fileName Nom du fichier
     * @return StreamedResponse
     */
    public function getMusicFile(string $fileName): StreamedResponse;
}