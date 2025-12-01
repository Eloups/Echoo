<?php

namespace Api\Domain\Ports;

use Api\Adapter\DTO\ArtistPageDTO;

/**
 * Interface du service de musique
 */
interface ArtistServiceInterface {
    /**
     * Action du listage des musiques
     * @param int $idArtist
     * @return array
     */
    public function artistPage(int $idArtist): ArtistPageDTO;
}