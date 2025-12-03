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
     * @return void
     */
    public function getMusicFile(string $fileName): StreamedResponse
    {
        $drivenAdapter = new StreamingDrivenAdapter();
        return $drivenAdapter->streamMusicFile($fileName);
    }
}