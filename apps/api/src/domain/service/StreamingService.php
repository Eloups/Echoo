<?php

namespace Api\Domain\Service;

use Api\Adapter\StreamingDrivenAdapter;
use Api\Domain\Ports\StreamingServiceInterface;

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
    public function getMusicFile(string $fileName): void
    {
        $drivenAdapter = new StreamingDrivenAdapter();

        $drivenAdapter->streamMusicFile($fileName);
    }
}