<?php

namespace Api\Domain\Ports;

/**
 * Interface pour le StreamingDrivenAdapter
 */
interface StreamingDrivenAdapterInterface
{
    /**
     * Méthode pour streamer un fichier de musique
     * @param string $fileName
     * @return void
     */
    public function streamMusicFile(string $fileName);
}