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

    /**
     * Requête pour ajouter une musique à une playlist
     * @param int $id_playlist
     * @param int $id_music
     * @return void
     */
    public function addMusicInPlaylist(int $id_playlist, int $id_music)
    {
        $addMusicInPlaylist = "INSERT INTO 
            playlist_music (id_playlist, id_music) 
            VALUES (:id_playlist, :id_music);";

        $request = $this->pdo->prepare($addMusicInPlaylist);
        $request->execute([':id_playlist' => $id_playlist, ':id_music' => $id_music]);
    }


    /** Requête pour ajouter une playlist dans une library
     * @param string $title
     * @param bool $isPublic
     * @param string $description
     * @param string $cover_path
     * @param array $musics
     * @param int $id_library
     * @return void
     */
    public function addPlaylist(int $id_library, string $title, bool $isPublic, string $description, string $cover_path, array $musics): void
    {
        $addPlaylist = "INSERT INTO playlist (title, ispublic, description, cover_path)
            VALUES (:title, :isPublic, :description, :cover_path)
            RETURNING id;";

        $request = $this->pdo->prepare($addPlaylist);
        $request->bindValue(':title', $title, PDO::PARAM_STR);
        $request->bindValue(':isPublic', $isPublic, PDO::PARAM_BOOL);
        $request->bindValue(':description', $description, PDO::PARAM_STR);
        $request->bindValue(':cover_path', $cover_path, PDO::PARAM_STR);

        $request->execute();
        $id_playlist = $request->fetchColumn();

        $linkToPlaylist = "INSERT INTO library_playlist (id_library, id_playlist) 
        VALUES (:id_library, :id_playlist);";
        $request = $this->pdo->prepare($linkToPlaylist);
        $request->execute([':id_library' => $id_library, ':id_playlist' => $id_playlist]);

        foreach ($musics as $music) {
            $request = $this->pdo->prepare("INSERT INTO playlist_music (id_playlist, id_music) VALUES (:id_playlist, :id_music);");
            $request->execute([':id_playlist' => $id_playlist, ':id_music' => $music]);
        }
    }

    /**
     * Requête pour supprimer une musique d'une playlist
     * @param int $id_playlist
     * @param int $id_music
     * @return void
     */
    public function deleteMusicInPlaylist(int $id_playlist, int $id_music)
    {
        $deleteMusicInPlaylist = "DELETE FROM 
            playlist_music WHERE id_playlist = :id_playlist 
            AND id_music = :id_music;";

        $request = $this->pdo->prepare($deleteMusicInPlaylist);
        $request->execute([':id_playlist' => $id_playlist, ':id_music' => $id_music]);
    }

    /**
     * Requête pour supprimer une playlist
     * @param int $id_playlist
     * @return void
     */
    public function deletePlaylist(int $id_playlist): void
    {
        $sqlDeletePlaylistMusic = "DELETE FROM playlist_music
            WHERE id_playlist = :id_playlist;";

        $request = $this->pdo->prepare($sqlDeletePlaylistMusic);
        $request->bindValue(':id_playlist', $id_playlist, PDO::PARAM_INT);
        $request->execute();

        $sqlDeleteLibraryPlaylist = "DELETE FROM library_playlist
            WHERE id_playlist = :id_playlist;";

        $request = $this->pdo->prepare($sqlDeleteLibraryPlaylist);
        $request->bindValue(':id_playlist', $id_playlist, PDO::PARAM_INT);
        $request->execute();

        $sqlDeletePlaylist = "DELETE FROM playlist
            WHERE id = :id_playlist;";

        $request = $this->pdo->prepare($sqlDeletePlaylist);
        $request->bindValue(':id_playlist', $id_playlist, PDO::PARAM_INT);
        $request->execute();
    }

    /**
     * Requête pour modifier une playlist
     * @param int $id_playlist
     * @param string $title
     * @param bool $isPublic
     * @param string $description
     * @param string $cover_path
     * @return void
     */
    public function updatePlaylist(int $id_playlist, string $title, bool $isPublic, string $description, string $cover_path)
    {
        $uplatePlaylist = "UPDATE playlist 
        SET title = :title, isPublic = :isPublic, description = :description, cover_path = :cover_path
        WHERE id = :id_playlist;";

        $request = $this->pdo->prepare($uplatePlaylist);
        $request->bindValue(':id_playlist', $id_playlist, PDO::PARAM_INT);
        $request->bindValue(':title', $title, PDO::PARAM_STR);
        $request->bindValue(':isPublic', $isPublic, PDO::PARAM_BOOL);
        $request->bindValue(':description', $description, PDO::PARAM_STR);
        $request->bindValue(':cover_path', $cover_path, PDO::PARAM_STR);
        $request->execute();
    }
}