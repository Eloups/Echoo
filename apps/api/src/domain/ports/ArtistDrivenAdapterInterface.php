<?php 

namespace Api\Domain\Ports;

use Api\Adapter\DTO\ArtistPageDTO;

/**
 * Interface pour le MusicDrivenAdapter
 */
interface ArtistDrivenAdapterInterface {
    /**
     * Méthode pour récupérer les données de la page d'un artiste
     * @param int $idArtist
     * @return void
     */
    public function getArtistPage(int $idArtist, int $limit): ArtistPageDTO;
}