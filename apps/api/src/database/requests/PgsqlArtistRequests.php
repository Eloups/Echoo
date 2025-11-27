<?php

namespace Api\Database\Requests;

use Api\Utils\ConvertUtils;
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
        WHERE id_artist = :id_artist;";
        $request = $this->pdo->prepare($getLikes);
        $request->execute([":id_artist" => $idArtist]);
        $result = $request->fetchAll();
        return $result;
    }

    public function getPopuparMusics(int $idArtist, int $limit) {
        $getPopuparMusics = "SELECT 
            m.id AS music_id,
            m.title AS music_title,
            m.duration AS music_duration,
            m.release AS music_release,
            m.nb_streams AS music_streams,
            m.file_path AS music_path
        FROM artist a
        JOIN artist_project ap
            ON a.id = ap.id_artist
        JOIN project p
            ON ap.id_project = p.id
        JOIN project_music pm
            ON p.id = pm.id_project
        JOIN music m
            ON pm.id_music = m.id
        WHERE a.id = :id_artist
        GROUP BY m.id
        ORDER BY m.nb_streams DESC
        LIMIT :limit;";

        $request = $this->pdo->prepare($getPopuparMusics);
        $request->execute([":id_artist" => $idArtist, ":limit" => $limit]);
        $result = $request->fetchAll();

        $popularMusics = ConvertUtils::convertRowToMusic($result);
        var_dump($popularMusics);
        return $popularMusics;
    }
}