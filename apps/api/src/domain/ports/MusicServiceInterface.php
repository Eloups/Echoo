<?php

namespace Api\Domain\Ports;

/**
 * Interface du service de musique
 */
interface MusicServiceInterface {
    /**
     * Action du listage des musiques
     * @return array
     */
    public function listMusics(): array;
}