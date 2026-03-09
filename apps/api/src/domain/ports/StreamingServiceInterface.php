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
     * @param ?string $range Partie du fichier que l'on veut streamer
     * @return StreamedResponse
     */
    public function getMusicFile(string $fileName, ?string $range): StreamedResponse;
}