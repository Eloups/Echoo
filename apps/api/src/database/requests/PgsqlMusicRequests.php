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
        $getAllMusics = "SELECT 
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
            p.title AS project_title,
            a.name AS artist_name
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

    /**
     * Requête pour ajouter un like à une musique
     * @param int $id_user
     * @param int $id_music
     * @return void
     */
    public function addLike(int $id_user, int $id_music): void
    {
        $getIdPlaylistLiked = "SELECT playlist.id
        FROM \"user\"
        INNER JOIN library 
            ON \"user\".id_library = library.id 
        INNER JOIN library_playlist 
            ON library.id = library_playlist.id_library
        INNER JOIN playlist 
            ON library_playlist.id_playlist = playlist.id
        WHERE playlist.title = 'liked'
        AND \"user\".id = :id_user;";

        $request = $this->pdo->prepare($getIdPlaylistLiked);
        $request->execute([":id_user" => $id_user]);
        $idPlaylistLiked = intval($request->fetchAll());

        $request = $this->pdo->prepare("
            INSERT INTO playlist_music (id_playlist, id_music)
            VALUES (:id_playlist, :id_music)
        ");

        $request->execute([
            ":id_playlist" => $idPlaylistLiked,
            ":id_music" => $id_music
        ]);
    }

    /**
     * Requête pour récupérer les genres d'une musique
     * @param int $musicId
     * @return array
     */
    public function getMusicsGenres(int $musicId): array
    {
        $sql = "SELECT g.id, g.name
        FROM music_genre AS mg
        JOIN genre AS g ON mg.id_genre = g.id
        WHERE mg.id_music = :musicId;";

        $request = $this->pdo->prepare($sql);
        $request->execute([":musicId" => $musicId]);
        return $request->fetchAll();
    }

    /**
     * Requête pour récupérer l'artiste d'une musique
     * @param int $musicId
     * @return array
     */
    public function getMusicArtist(int $musicId): array
    {
        $sql = "SELECT a.name 
        FROM artist a
        JOIN artist_project ap
            ON a.id = ap.id_artist
        JOIN project p
            ON ap.id_project = p.id
        JOIN project_music pm
            ON p.id = pm.id_project
        JOIN music m
            ON pm.id_music = :musicId";

        $request = $this->pdo->prepare($sql);
        $request->execute([":musicId" => $musicId]);
        return $request->fetchAll();
    }

    /**
     * Récupération des notes d'une musique
     * @param int $musicId
     * @param int $limit
     * @return array
     */
    public function getMusicsRatings(int $musicId, int $limit): array
    {
        $sql = 'SELECT mr.id, mr.rating, mr.created_at, mr.comment, mr.id_user, mr.id_music FROM music_rating mr
            WHERE mr.id_music = :musicId
            LIMIT :limit;';

        $request = $this->pdo->prepare($sql);
        $request->execute([":musicId" => $musicId, ":limit" => $limit]);

        return $request->fetchAll();
    }

    /**
     * Requête pour récupérer le cover_path d'un projet à partir de l'id d'une musique
     * @param int $id_music
     * @return array
     */
    public function getCoverFileProject(int $id_music): array {
        $getCoverFileProject = "SELECT p.cover_path
        FROM project p
        JOIN project_music pm ON pm.id_project = p.id
        WHERE pm.id_music = :id_music LIMIT 1;";

        $request = $this->pdo->prepare(query: $getCoverFileProject);
        $request->execute([":id_music" => $id_music]);

        return $request->fetchAll();
    }
}