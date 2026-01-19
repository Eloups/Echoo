<?php

namespace Api\Adapter;

use Api\Database\PgsqlServer;
use Api\Database\Requests\PgsqlArtistRequests;
use Api\Domain\Class\Artist;
use Api\Domain\Class\Music;
use Api\Domain\Ports\ArtistDrivenAdapterInterface;
use Api\Utils\ConvertUtils;
use DateTime;

/**
 * Classe Driven Adapter pour les musiques
 */
class ArtistDrivenAdapter implements ArtistDrivenAdapterInterface
{
    /**
     * Méthode pour récupérer les données d'un artiste
     * @return Artist[]
     */
    public function getArtist(int $idArtist): Artist
    {
        $pgslserver = new PgsqlServer();

        $pdo = $pgslserver->getConnection();
        $request = new PgsqlArtistRequests($pdo);

        $rows = $request->getArtist($idArtist);

        $artist = ConvertUtils::ConvertRowToArtist($rows[0]);

        return $artist;
    }

    /**
     * Méthode pour récupérer les likes d'un artiste
     * @param int $idArtist
     * @return void
     */
    public function getLikesArtist(int $idArtist): int
    {

        $pgslserver = new PgsqlServer();
        $pdo = $pgslserver->getConnection();
        $request = new PgsqlArtistRequests($pdo);

        $rows = $request->getLikesArtist($idArtist);
        $like = $rows[0]["likes"];

        return $like;
    }

    /**
     * Méthode pour récupérer les musiques les plus populaires d'un artiste
     * @param int $idArtist
     * @param int $limit
     * @return Music[]
     */
    public function getPopularMusicsByArtist(int $idArtist, int $limit): array
    {
        $pgslserver = new PgsqlServer();

        $pdo = $pgslserver->getConnection();
        $request = new PgsqlArtistRequests($pdo);

        $idPopularMusics = $request->getIdPopularMusics($idArtist, $limit);

        $popularMusics = [];
        foreach ($idPopularMusics as $id) {
            array_push($popularMusics, $request->getMusicsWithRatingAndGenres($id["music_id"]));
        }
        return $popularMusics;
    }

    /**
     * Méthode pour récupérer les dernières musiques publiées d'un artiste
     * @param int $idArtist
     * @param int $limit
     * @return Music[]
     */
    public function getLastReleaseByArtist(int $idArtist, int $limit): array
    {
        $pgslserver = new PgsqlServer();

        $pdo = $pgslserver->getConnection();
        $request = new PgsqlArtistRequests($pdo);

        $idLastReleases = $request->getIdLastReleasesArtist($idArtist, $limit);

        $lastReleases = [];
        foreach ($idLastReleases as $id) {
            array_push($lastReleases, $request->getMusicsWithRatingAndGenres($id["music_id"]));
        }
        return $lastReleases;
    }

    /**
     * Méthode pour ajouter un like à un artiste
     * @param int $id_user
     * @param int $id_artist
     * @return void
     */
    public function addLike(int $id_user, int $id_artist): void
    {
        $pgslserver = new PgsqlServer();

        $pdo = $pgslserver->getConnection();
        $request = new PgsqlArtistRequests($pdo);

        // On exécute la requête
        $request->addLike($id_user, $id_artist);
    }

    /**
     * Méthode pour récupérer les artistes d'une library
     * @param int $id_library
     * @return array
     */
    public function getArtistsInLibrary(int $id_library): array
    {
        $pgslserver = new PgsqlServer();

        $pdo = $pgslserver->getConnection();
        $request = new PgsqlArtistRequests($pdo);

        $rows = $request->getArtistsInLibrary($id_library);

        $artists = [];
        foreach ($rows as $row) {
            array_push($artists, ConvertUtils::ConvertRowToArtist($row));
        }
        return $artists;
    }

    /**
     * Méthode pour récupérer les albums d'un artiste
     * @param int $id_artist
     * @return array
     */
    public function getArtistAlbums(int $id_artist): array
    {
        $pgslserver = new PgsqlServer();

        $pdo = $pgslserver->getConnection();
        $request = new PgsqlArtistRequests($pdo);

        $ids = $request->getArtistIdAlbums($id_artist);
        $albums = [];
        foreach ($ids as $id) {
            array_push($albums, $request->getAlbumsWithRates(intval($id)));
        }

        return $albums;
    }

    /**
     * Méthode pour récupérer les singles d'un artiste
     * @param int $id_artist
     * @return array
     */
    public function getArtistSingles(int $id_artist): array
    {
        $pgslserver = new PgsqlServer();

        $pdo = $pgslserver->getConnection();
        $request = new PgsqlArtistRequests($pdo);

        $ids = $request->getArtistIdSingles($id_artist);
        $singles = [];
        foreach ($ids as $id) {
            array_push($singles, $request->getAlbumsWithRates(intval($id['project_id'])));
        }

        return $singles;
    }

    /**
     * Méthode pour récupérer les artistes les plus écoutées du mois
     * @param DateTime $date
     * @param int $limit
     * @return array
     */
    public function getMostListenedArtistsOfMonth(DateTime $date, int $limit): array
    {
        $pgslserver = new PgsqlServer();

        $pdo = $pgslserver->getConnection();
        $request = new PgsqlArtistRequests($pdo);

        $artistsRows = $request->getMostListenedArtistsOfMonth($date, $limit);
        $artists = ConvertUtils::convertRowsToArtists($artistsRows);

        return $artists;
    }

    /**
     * search artists, projects and musics
     * @param string $search
     * @param int $limit
     * @return array
     */
    public function searchArtists(string $search, int $limit): array
    {
        $pgslserver = new PgsqlServer();

        $pdo = $pgslserver->getConnection();
        $requests = new PgsqlArtistRequests($pdo);

        $artistsRows = $requests->searchArtists($search, $limit);
        $artists = ConvertUtils::convertRowsToArtists($artistsRows);

        $projectsRows = $requests->searchProjects($search, $limit);
        $projects = ConvertUtils::convertRowsToProjects($projectsRows);

        $musicsRows = $requests->searchMusics($search, $limit);
        $musics = ConvertUtils::convertRowToMusics($musicsRows, $pdo);

        return [$artists, $projects, $musics];
    }
}