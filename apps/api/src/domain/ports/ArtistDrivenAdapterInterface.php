<?php 

namespace Api\Domain\Ports;

use Api\Domain\Class\Artist;
use Api\Domain\Class\Music;

/**
 * Interface pour le MusicDrivenAdapter
 */
interface ArtistDrivenAdapterInterface {
    /**
     * Méthode pour récupérer les données d'un artiste
     * @param int $idArtist
     * @return void
     */
    public function getArtist(int $idArtist, int $limit): Artist;

    /**
     * Méthode pour récupérer les likes d'un artiste
     * @param int $idArtist
     * @return void
     */
    public function getLikesArtist(int $idArtist): int;

    /**
     * Méthode pour récupérer les musiques les plus populaires d'un artiste
     * @param int $idArtist
     * @param int $limit
     * @return Music[]
     */
    public function getPopularMusicsByArtist($idArtist, $limit): array;

    /**
     * Méthode pour récupérer les dernières musiques publiées d'un artiste
     * @param int $idArtist
     * @param int $limit
     * @return Music[]
     */
    public function getLastReleaseByArtist($idArtist, $limit): array;
}