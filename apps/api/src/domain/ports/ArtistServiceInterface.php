<?php

namespace Api\Domain\Ports;

use DateTime;

/**
 * Interface du service des artistes
 */
interface ArtistServiceInterface
{
    /**
     * Action du listage de la page artiste
     * @param int $idArtist
     * @return array
     */
    public function artistPage(int $idArtist, int $limit): array;

    /**
     * Action de l'ajout d'un like à un artiste
     * @param int $id_user
     * @param int $id_artist
     * @return void
     */
    public function likeArtist(int $id_user, int $id_artist): void;

    /**
     * Action de la récupération des artistes d'une library
     * @param int $id_library
     * @return array
     */
    public function getArtistsInLibrary(int $id_library): array;

    /**
     * action de récupération des albums d'un artiste
     * @param int $id_artist
     * @return array
     */
    public function getArtistAlbums(int $id_artist): array;

    /**
     * action de récupération des singles d'un artiste
     * @param int $id_artist
     * @return array
     */
    public function getArtistSingles(int $id_artist): array;
    /**
     * Action de récupération des artistes les plus écoutées du mois
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
}