<?php

namespace Api\Domain\Service;

use Api\Adapter\StreamingDrivenAdapter;
use Api\Domain\Ports\StreamingServiceInterface;
use Symfony\Component\HttpFoundation\StreamedResponse;

/**
 * Service de streaming
 */
class StreamingService implements StreamingServiceInterface
{
    /**
     * Fonction de récupération d'un fichier de musique en stream
     * @param string $fileName Nom du fichier
     * @param ?string $range Partie du fichier que l'on veut streamer
     * @return void
     */
    public function getMusicFile(string $fileName, ?string $range): StreamedResponse
    {
        $drivenAdapter = new StreamingDrivenAdapter();
        return $drivenAdapter->streamMusicFile($fileName, $range);
    }
}