<?php

namespace Api\Database\Requests;

use Api\Utils\ConvertUtils;
use Api\Utils\RequestUtils;
use PDO;

/**
 * Classe permettant de lancer des requêtes SQL sur les playlists de la base de données
 */
class PgsqlPlaylistRequests
{
    /**
     * Connection à la base de données
     * @var PDO
     */
    private PDO $pdo;

    /**
     * Constructeur de la classe PgsqlPlaylistRequests.
     * @param PDO $pdo
     */
    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    /**
     * Requête pour récupérer les données d'une playlist
     * @return array
     */
    public function getPlaylist(int $idPlaylist): array
    {
        $getPlaylist = "SELECT
            p.id AS playlist_id,
            p.title AS playlist_title,
            p.isPublic AS playlist_public,
            p.description AS playlist_description,
            p.cover_path AS playlist_cover,

            m.id AS music_id,
            m.title AS music_title,
            m.duration AS music_duration,
            m.release AS music_release,
            m.nb_streams AS music_streams,
            m.file_path AS music_path,

            a.name AS artist_name

        FROM playlist p
        LEFT JOIN playlist_music pm
            ON p.id = pm.id_playlist
        LEFT JOIN music m
            ON pm.id_music = m.id

        LEFT JOIN project_music prm
            ON m.id = prm.id_music

        LEFT JOIN project pr
            ON prm.id_project = pr.id

        LEFT JOIN artist_project ap
            ON pr.id = ap.id_project

        LEFT JOIN artist a
            ON ap.id_artist = a.id

        WHERE p.id = :id_playlist

        ORDER BY m.id;";
        $request = $this->pdo->prepare($getPlaylist);
        $request->execute([":id_playlist" => $idPlaylist]);
        $result = $request->fetchAll();
        return $result;
    }

    /**
     * Requête pour récupérer les playlists d'une library
     * @param int $id_library
     * @return array
     */
    public function getPlaylistsInLibrary(int $id_library): array
    {
        $getPlaylistsInLibrary = "SELECT 
        p.id AS playlist_id,
        p.title AS playlist_title,
        p.isPublic AS playlist_public,
        p.description AS playlist_description,
        p.cover_path AS playlist_cover 
        FROM playlist p
        INNER JOIN library_playlist 
            ON p.id = library_playlist.id_playlist 
        WHERE library_playlist.id_library = :id_library
        GROUP BY p.id;";

        $request = $this->pdo->prepare($getPlaylistsInLibrary);
        $request->execute([":id_library" => $id_library]);
        $result = $request->fetchAll();
        return $result;
    }

    public function getPlaylistMusics(int $id_playlist): int
    {
        $sql = "SELECT COUNT(m.id) AS nb_musics
            FROM playlist_music AS pm
            JOIN music AS m ON pm.id_music = m.id
            WHERE pm.id_playlist = :playlistId;";

        $request = $this->pdo->prepare($sql);
        $request->execute([':playlistId' => $id_playlist]);
        $result = $request->fetch();
        return $result['nb_musics'];
    }
}