<?php

namespace Api\Database\Requests;

use PDO;

/**
 * Classe des requêtes postgresql sur les utilisateurs
 */
class PgsqlUserRequests
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
     * Requête pour récupérer les dernières musiques écoutées par un utilisateur
     * @param int $idUser
     * @param int $limit
     * @return array
     */
    public function getLastListenedMusics(int $userId): array
    {
        $requestContent = "SELECT
            m.id,
            m.title,
            m.duration,
            m.release,
            m.nb_streams,
            m.file_path
            FROM log_user_music AS lum
            LEFT JOIN music AS m ON lum.id_music = m.id
            WHERE lum.id_user = :userId
            ORDER BY lum.listened_at DESC;";

        $request = $this->pdo->prepare($requestContent);
        $request->execute([':userId' => $userId]);
        $result = $request->fetchAll();
        return $result;
    }

    public function addUserListenedMusic(int $userId, int $musicId): void
    {
        $sql = "INSERT INTO log_user_music(id_user, id_music, listened_at)
            VALUES (:userId, :musicId, NOW());";
        $request = $this->pdo->prepare($sql);

        $request->execute([
            ":userId" => $userId,
            ":musicId" => $musicId
        ]);
    }

    /**
     * Fonction qui récupère les ID des artistes likés par un utilisateur
     * @param int $userId
     * @return array
     */
    public function getUserLikedArtistsIds(int $userId): array
    {
        $sql = 'SELECT la.id_artist from "user" u
            JOIN "library" l ON u.id_library = l.id
            JOIN library_artist la ON l.id = la.id_library
            WHERE u.id = :userId;';

        $request = $this->pdo->prepare($sql);
        $request->execute([':userId' => $userId]);
        return $request->fetchAll();
    }

    public function getUserLikedArtistlastReleases(array $artistIds, int $limit): array
    {
        $placeholders = [];
        foreach ($artistIds as $i => $id) {
            $placeholders[] = ":id$i";
        }
        $placeholdersString = implode(', ', $placeholders);

        $sql = 'SELECT p.id, p.title, p.release, p.color1, p.color2, p.cover_path, pt.name project_type FROM "artist" a
            JOIN "artist_project" ap ON a.id = ap.id_artist
            JOIN "project" p ON ap.id_project = p.id
            JOIN "project_type" pt ON p.id_type = pt.id
            WHERE a.id IN (' . $placeholdersString . ')
            ORDER BY p.release DESC
            LIMIT :limit;';

        $params = [':limit' => $limit];
        foreach ($artistIds as $i => $id) {
            $params[":id$i"] = $id;
        }

        $request = $this->pdo->prepare($sql);
        $request->execute($params);
        return $request->fetchAll();
    }
}