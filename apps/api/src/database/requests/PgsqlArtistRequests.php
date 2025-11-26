<?php

namespace Api\Database\Requests;

use Api\Utils\RequestUtils;
use PDO;

/**
 * Classe permettant de lancer des requêtes SQL sur les artistes de la base de données
 */
class PgsqlArtistRequests
{
    /**
     * Connection à la base de données
     * @var PDO
     */
    private PDO $pdo;

    /**
     * Constructeur de la classe PgsqlArtistRequests.
     * @param PDO $pdo
     */
    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    /**
     * Requête pour récupérer les données des artistes
     * @return array
     */
    public function getArtist(int $idArtist): array
    {
        $getArtist = "SELECT * FROM artist WHERE id = :id_artist";
        $request = $this->pdo->prepare($getArtist);
        $request->execute([":id_artist" => $idArtist]);
        $result = $request->fetchAll();
        return $result;
    }

    public function getLikesArtist(int $idArtist) : array {
        $getLikes = "SELECT COUNT(*) AS likes
        FROM library_artist
        WHERE id_artist = :artistId;";
        $request = $this->pdo->prepare($getLikes);
        $request->execute([":id_artist" => $idArtist]);
        $result = $request->fetchAll();
        return $result;
    }
}