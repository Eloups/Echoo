<?php

namespace Api\Domain\Ports;

/**
 * Interface du service de streaming
 */
interface StreamingServiceInterface
{
    /**
     * Action de récupération d'un fichier de musique en stream
     * @param string $fileName Nom du fichier
     * @return void
     */
    public function getMusicFile(string $fileName): void;
}