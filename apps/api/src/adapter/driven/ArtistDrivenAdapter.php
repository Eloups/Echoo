<?php

namespace Api\Adapter;

use Api\Database\PgsqlServer;
use Api\Database\Requests\PgsqlArtistRequests;
use Api\Domain\Class\Artist;
use Api\Domain\Ports\ArtistDrivenAdapterInterface;
use Api\Utils\ConvertUtils;
use DateTime;

/**
 * Classe Driven Adapter pour les musiques
 */
class ArtistDrivenAdapter implements ArtistDrivenAdapterInterface {
    /**
     * Méthode pour récupérer les données de la page artiste
     * @return Artist[]
     */
    public function getArtistPage(int $idArtist): array {
        $pgslserver = new PgsqlServer();
        
        $pdo = $pgslserver->getConnection();
        $request = new PgsqlArtistRequests($pdo);

        $rows = $request->getArtist($idArtist);
 
        $artist = ConvertUtils::ConvertRowToArtist($rows[0]);
        return [$artist];
    }

    public function getLikesArtist(int $idArtist): int {

        $pgslserver = new PgsqlServer();
        $pdo = $pgslserver->getConnection();
        $request = new PgsqlArtistRequests($pdo);

        //$rows = $request->getArtist($idArtist);
    }
}