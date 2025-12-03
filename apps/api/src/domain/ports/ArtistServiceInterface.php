<?php

namespace Api\Domain\Ports;

/**
 * Interface du service des artistes
 */
interface ArtistServiceInterface {
    /**
     * Action du listage de la page artiste
     * @param int $idArtist
     * @return array
     */
    public function artistPage(int $idArtist, int $limit): array;
}