<?php

namespace Api\Domain\Ports;

/**
 * Interface du service de musique
 */
interface MusicServiceInterface {
    /**
     * Action du listage des musiques
     * @param int $idArtist
     * @return array
     */
    public function listMusics(int $idArtist): array;
}