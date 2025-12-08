<?php 

namespace Api\Domain\Ports;

use Api\Domain\Class\Artist;
use Api\Domain\Class\Music;

/**
 * Interface pour le ArtistDrivenAdapter
 */
interface ArtistDrivenAdapterInterface {
    /**
     * Méthode pour récupérer les données d'un artiste
     * @param int $idArtist
     * @return void
     */
    public function getArtist(int $idArtist): Artist;

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
    public function getPopularMusicsByArtist(int $idArtist, int $limit): array;

    /**
     * Méthode pour récupérer les dernières musiques publiées d'un artiste
     * @param int $idArtist
     * @param int $limit
     * @return Music[]
     */
    public function getLastReleaseByArtist(int $idArtist, int $limit): array;

    /**
     * Méthode pour ajouter un like à un artiste
     * @param int $id_user
     * @param int $id_artist
     * @return void
     */
    public function addLike(int $id_user, int $id_artist): void;
}