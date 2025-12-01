<?php

namespace Api\Domain\Ports;

use Symfony\Component\HttpFoundation\StreamedResponse;

/**
 * Interface pour le StreamingDrivenAdapter
 */
interface StreamingDrivenAdapterInterface
{
    /**
     * Méthode pour streamer un fichier de musique
     * @param string $fileName
     * @return StreamedResponse
     */
    public function streamMusicFile(string $fileName): StreamedResponse;
}