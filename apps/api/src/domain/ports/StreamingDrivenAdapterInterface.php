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
     * @param ?string $range Partie du fichier que l'on veut streamer
     * @return StreamedResponse
     */
    public function streamMusicFile(string $fileName, ?string $range): StreamedResponse;
}