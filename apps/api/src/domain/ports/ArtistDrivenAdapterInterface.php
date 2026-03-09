<?php

namespace Api\Domain\Ports;

use Api\Domain\Class\Artist;
use Api\Domain\Class\Music;
use DateTime;

/**
 * Interface pour le ArtistDrivenAdapter
 */
interface ArtistDrivenAdapterInterface
{
    /**
     * Méthode pour récupérer les données d'un artiste
     * @param int $idArtist
     * @return Artist
     */
    public function getArtist(int $idArtist): Artist;

    /**
     * Méthode pour récupérer les likes d'un artiste
     * @param int $idArtist
     * @return int
     */
    public function getLikesArtist(int $idArtist): int;

    /**
     * Méthode pour récupérer les musiques les plus populaires d'un artiste
     * @param int $idArtist
     * @param int $limit
     * @return Music[][]
     */
    public function getPopularMusicsByArtist(int $idArtist, int $limit): array;

    /**
     * Méthode pour récupérer les dernières musiques publiées d'un artiste
     * @param int $idArtist
     * @param int $limit
     * @return Music[][]
     */
    public function getLastReleaseByArtist(int $idArtist, int $limit): array;

    /**
     * Méthode pour ajouter un like à un artiste
     * @param string $id_user
     * @param int $id_artist
     * @return void
     */
    public function addLike(string $id_user, int $id_artist): void;

    /**
     * Méthode pour récupérer les artistes d'une library
     * @param string $id_library
     * @return array
     */
    public function getArtistsInLibrary(string $id_library): array;

    /**
     * Méthode pour récupérer les ids des albums d'un artiste
     * @param int $id_artist
     * @return array
     */
    public function getArtistAlbums(int $id_artist): array;

    /**
     * Méthode pour récupérer les singles d'un artiste
     * @param int $id_artist
     * @return array
     */
    public function getArtistSingles(int $id_artist): array;
    /**
     * Méthode pour récupérer les artistes les plus écoutées du mois
     * @param DateTime $date
     * @param int $limit
     * @return array
     */
    public function getMostListenedArtistsOfMonth(DateTime $date, int $limit): array;
    /**
     * search artists, projects and musics
     * @param string $search
     * @param int $limit
     * @return array
     */
    public function searchArtists(string $search, int $limit): array;

    /**
     * Méthode pour vérifier si un artiste est liké
     * @param string $id_user
     * @param int $id_artist
     * @return bool
     */
    public function isArtistLiked(string $id_user, int $id_artist): bool;
}