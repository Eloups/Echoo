<?php

namespace Api\Adapter;

use Api\Database\PgsqlServer;
use Api\Database\Requests\PgsqlArtistRequests;
use Api\Domain\Class\Artist;
use Api\Domain\Ports\ArtistDrivenAdapterInterface;
use Api\Utils\ConvertUtils;

/**
 * Classe Driven Adapter pour les musiques
 */
class ArtistDrivenAdapter implements ArtistDrivenAdapterInterface {
    /**
     * Méthode pour récupérer les données de la page artiste
     * @return Artist[]
     */
    public function getArtist(int $idArtist, int $limit): Artist {
        $pgslserver = new PgsqlServer();
        
        $pdo = $pgslserver->getConnection();
        $request = new PgsqlArtistRequests($pdo);

        $rows = $request->getArtist($idArtist);
 
        $artist = ConvertUtils::ConvertRowToArtist($rows[0]);

        return $artist;
    }

    public function getLikesArtist(int $idArtist): int {

        $pgslserver = new PgsqlServer();
        $pdo = $pgslserver->getConnection();
        $request = new PgsqlArtistRequests($pdo);

        $rows = $request->getLikesArtist($idArtist);
        $like = $rows[0]["likes"];

        return $like;
    }

    public function getPopularMusicsByArtist($idArtist, $limit): array {
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

        

    public function getLastReleaseByArtist($idArtist, $limit): array {
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
}