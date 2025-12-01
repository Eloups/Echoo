<?php

namespace Api\Adapter;

use Api\Database\PgsqlServer;
use Api\Database\Requests\PgsqlArtistRequests;
use Api\Domain\Class\Artist;
use Api\Domain\Ports\ArtistDrivenAdapterInterface;
use Api\Utils\ConvertUtils;
use Api\Adapter\DTO\ArtistPageDTO;

/**
 * Classe Driven Adapter pour les musiques
 */
class ArtistDrivenAdapter implements ArtistDrivenAdapterInterface {
    /**
     * Méthode pour récupérer les données de la page artiste
     * @return Artist[]
     */
    public function getArtistPage(int $idArtist): ArtistPageDTO {
        $pgslserver = new PgsqlServer();
        
        $pdo = $pgslserver->getConnection();
        $request = new PgsqlArtistRequests($pdo);

        $rows = $request->getArtist($idArtist);
 
        $artist = ConvertUtils::ConvertRowToArtist($rows[0]);
        $likes = self::getLikesArtist($idArtist);

        $popularMusics = $request->getPopularMusics($idArtist, 2);
        $lastReleases = $request->getLastReleasesArtist($idArtist, 2);
        
        $artistDTO = new ArtistPageDTO($artist->getId(), $artist->getName(), $artist->getIsVerified(), $artist->getDescription(), $artist->getImagePath(), $likes, $popularMusics, $lastReleases);

        return $artistDTO;
    }

    public function getLikesArtist(int $idArtist): int {

        $pgslserver = new PgsqlServer();
        $pdo = $pgslserver->getConnection();
        $request = new PgsqlArtistRequests($pdo);

        $rows = $request->getLikesArtist($idArtist);
        $like = $rows[0]["likes"];

        return $like;
    }
}