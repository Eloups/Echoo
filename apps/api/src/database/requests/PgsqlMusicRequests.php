<?php

namespace Api\Database\Requests;

use Api\Utils\RequestUtils;
use PDO;

/**
 * Classe permettant de lancer des requêtes SQL sur les musiques de la base de données
 */
class PgsqlMusicRequests
{
    /**
     * Connection à la base de données
     * @var PDO
     */
    private PDO $pdo;

    /**
     * Constructeur de la classe PgsqlMusicRequests.
     * @param PDO $pdo
     */
    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    /**
     * Requête pour récupérer toutes les musiques
     * @return array
     */
    public function getAllMusics(): array
    {
        $getAllMusics = "
            SELECT 
            m.id AS music_id,
            m.title AS music_title,
            m.duration AS music_duration,
            m.release AS music_release,
            m.nb_streams AS music_streams,
            m.file_path AS music_path,
            g.id AS genre_id,
            g.name AS genre_name,
            r.id AS rate_id,
            r.rate AS rate_rate,
            r.comment AS rate_comment
            FROM music m
            LEFT JOIN music_genre mg
                ON m.id = mg.id_music
            LEFT JOIN genre g
                ON mg.id_genre = g.id
            LEFT JOIN rating r
                ON m.id = r.id_music
            ORDER BY m.id;";
        $request = $this->pdo->prepare($getAllMusics);
        $request->execute();
        $result = $request->fetchAll();
        return $result;
    }
}