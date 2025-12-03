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
    public function getAllMusics(int $idArtist): array
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
            r.rating AS rate_rate,
            r.comment AS rate_comment,
            p.id AS project_id,
            p.title AS project_title
        FROM artist a
        JOIN artist_project ap
            ON a.id = ap.id_artist
        JOIN project p
            ON ap.id_project = p.id
        JOIN project_music pm
            ON p.id = pm.id_project
        JOIN music m
            ON pm.id_music = m.id
        LEFT JOIN music_genre mg
            ON m.id = mg.id_music
        LEFT JOIN genre g
            ON mg.id_genre = g.id
        LEFT JOIN music_rating r
            ON m.id = r.id_music
        WHERE a.id = :id_artist
        ORDER BY p.id, m.id;
        ";
        $request = $this->pdo->prepare($getAllMusics);
        $request->execute([":id_artist" => $idArtist]);
        $result = $request->fetchAll();
        return $result;
    }

    public function addLike(int $id_user, int $id_music) {
        $addLike = "START TRANSACTION;

        INSERT INTO playlist (name, id_user)
        SELECT 'liked', :id_user
        WHERE NOT EXISTS (
            SELECT 1 FROM playlist 
            WHERE name = 'liked' AND id_user = :id_user
        );

        INSERT INTO playlist_music (id_playlist, id_music)
        SELECT p.id, :id_music
        FROM playlist p
        WHERE p.name = 'liked'
        AND p.id_user = :id_user
        ON DUPLICATE KEY UPDATE id_music = id_music; -- évite les doublons

        COMMIT;";
    }
}