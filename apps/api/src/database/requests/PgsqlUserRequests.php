<?php

namespace Api\Database\Requests;

use Api\Domain\Class\User;
use Api\Exception\ApiCustomException;
use DateInterval;
use DateTime;
use Exception;
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
        if (!$this->pdo->beginTransaction()) {
            throw new Exception("Error: can't start DB transaction");
        }

        try {
            $sql = "INSERT INTO log_user_music(id_user, id_music, listened_at)
                VALUES (:userId, :musicId, NOW());";
            $request = $this->pdo->prepare($sql);

            $request->execute([
                ":userId" => $userId,
                ":musicId" => $musicId
            ]);

            $sql = "UPDATE music
                SET nb_streams = nb_streams + 1
                WHERE id = :musicId;";

            $request = $this->pdo->prepare($sql);

            $request->execute([
                ":musicId" => $musicId
            ]);

            $this->pdo->commit();
        } catch (Exception $e) {
            $this->pdo->rollBack();
            throw $e;
        }
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

    /**
     * Fonction pour récupérer les IDs des musiques les plus écoutées par un utilisateur un mois
     * @param int $userId
     * @param int $limit
     * @param DateTime $date
     * @return void
     */
    public function getUserMostListenedMusicsOfMonth(int $userId, int $limit, DateTime $date): array
    {
        $afterDate = $date->format('Y-m-01');
        $beforeDate = $date->add(new DateInterval('P1M'))->format('Y-m-01');

        $sql = 'SELECT lum.id_user, lum.id_music, COUNT(lum.id_music) nb_listen FROM log_user_music lum
            WHERE lum.listened_at >= :afterDate AND lum.listened_at < :beforeDate
            GROUP BY lum.id_music, lum.id_user
            HAVING lum.id_user = :userId
            ORDER BY nb_listen DESC
            LIMIT :limit;';

        $request = $this->pdo->prepare($sql);

        $request->execute([
            ":afterDate" => $afterDate,
            ":beforeDate" => $beforeDate,
            ":userId" => $userId,
            ":limit" => $limit
        ]);

        return $request->fetchAll();
    }

    /**
     * Fonction pour récupérer plusieurs musiques avec leurs IDs
     * @param array $ids
     * @return array
     */
    public function getMusicsFromIds(array $musicsIds): array
    {
        $placeholders = [];
        foreach ($musicsIds as $i => $id) {
            $placeholders[] = ":id$i";
        }
        $placeholdersString = implode(', ', $placeholders);

        $sql = 'SELECT m.id, m.title, m.duration, m."release", m.nb_streams, m.file_path, a."name" artist_name FROM music m
            JOIN project_music pm ON m.id = pm.id_music
            JOIN project p ON pm.id_project = p.id
            JOIN artist_project ap ON p.id = ap.id_project 
            JOIN artist a ON ap.id_artist = a.id
            WHERE m.id IN (' . $placeholdersString . ');';

        $params = [];
        foreach ($musicsIds as $i => $id) {
            $params[":id$i"] = $id;
        }

        $request = $this->pdo->prepare($sql);
        $request->execute($params);
        return $request->fetchAll();
    }

    /**
     * Function to create a new User and his Library
     * @param User $user
     * @return void
     */
    public function createUser(User $user): void
    {
        $sql = 'SELECT id FROM "user" u
            WHERE u.id = :id;';

        $request = $this->pdo->prepare($sql);

        $request->execute([
            ":id" => $user->getLibrary()->getId()
        ]);

        $result = $request->fetchAll();

        if (!empty($result)) {
            throw new ApiCustomException("User already exists", 409);
        }

        $this->pdo->beginTransaction();

        try {
            // We create the Library
            $sql = 'INSERT INTO "library" (id) VALUES (:id);';

            $request = $this->pdo->prepare($sql);

            $request->execute([
                ":id" => $user->getLibrary()->getId()
            ]);

            // We create the User
            $sql = 'INSERT INTO "user" (id, username, email, password, image_path, id_library, id_role) VALUES
                (:id, :username, :email, :password, :imagePath, :idLibrary, :idRole);';

            $request = $this->pdo->prepare($sql);

            $request->execute([
                ":id" => $user->getId(),
                ":username" => $user->getUsername(),
                ":email" => $user->getEmail(),
                ":password" => $user->getPassword(),
                ":imagePath" => $user->getImagePath(),
                ":idLibrary" => $user->getLibrary()->getId(),
                ":idRole" => $user->getUserRole()->getId()
            ]);

            $this->pdo->commit();
        } catch (Exception $e) {
            $this->pdo->rollBack();
            throw $e;
        }
    }
}