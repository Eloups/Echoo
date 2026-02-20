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
     * @param string $idUser
     * @param int $limit
     * @return array
     */
    public function getLastListenedMusics(string $userId): array
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

    public function addUserListenedMusic(string $userId, int $musicId): void
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
     * @param string $userId
     * @return array
     */
    public function getUserLikedArtistsIds(string $userId): array
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
     * @param string $userId
     * @param int $limit
     * @param DateTime $date
     * @return void
     */
    public function getUserMostListenedMusicsOfMonth(string $userId, int $limit, DateTime $date): array
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
            $sql = 'INSERT INTO "user" (id, username, email, image_path, id_library, id_role) VALUES
                (:id, :username, :email, :imagePath, :idLibrary, :idRole);';

            $request = $this->pdo->prepare($sql);

            $request->execute([
                ":id" => $user->getId(),
                ":username" => $user->getUsername(),
                ":email" => $user->getEmail(),
                ":imagePath" => $user->getImagePath(),
                ":idLibrary" => $user->getLibrary()->getId(),
                ":idRole" => $user->getUserRole()->getId()
            ]);

            // we create the liked playlist
            $sql = 'INSERT INTO playlist (title, ispublic, description, cover_path) VALUES (\'liked\', false, \'Playlist des titres likés\', \'/liked.png\') RETURNING id;';

            $request = $this->pdo->prepare($sql);
            $request->execute();
            $idPlaylist = $request->fetch();

            // We bind the user with the playlist

            $sql = 'INSERT INTO library_playlist (id_library, id_playlist) VALUES (:idLibrary, :idPlaylist);';

            $request = $this->pdo->prepare($sql);
            $request->execute([
                ':idLibrary' => $user->getLibrary()->getId(),
                ':idPlaylist' => $idPlaylist['id']
            ]);

            $this->pdo->commit();
        } catch (Exception $e) {
            $this->pdo->rollBack();
            throw $e;
        }
    }

    /**
     * Fonction qui récupère tous les utilisateurs
     * @return array
     */
    public function getAllUsers(): array
    {
        $sql = 'SELECT u.id, u.username, u.email, u.image_path, u.id_library, r.id id_role, r."name" role, a.id id_artist, a.name artist_name, a.isverified, a.description, a.image_path artist_image_path FROM "user" u
            JOIN "role" r ON u.id_role = r.id
            LEFT JOIN artist a ON u.id_artist = a.id
            ORDER BY u.id ASC;';

        $request = $this->pdo->query($sql);

        return $request->fetchAll();
    }
    /**
     * function to get one user
     * @param string $userId
     * @return array
     */
    public function getOneUser(string $userId): array
    {
        $sql = 'SELECT u.id, u.username, u.email, u.image_path, u.id_library, r.id id_role, r."name" role, a.id id_artist, a.name artist_name, a.isverified, a.description, a.image_path artist_image_path FROM "user" u
            JOIN "role" r ON u.id_role = r.id
            LEFT JOIN artist a ON u.id_artist = a.id
            WHERE u.id = :userId;';

        $request = $this->pdo->prepare($sql);

        $request->execute([
            ":userId" => $userId
        ]);

        $user = $request->fetch();

        if (!$user) {
            throw new ApiCustomException("user nor found", 404);
        }

        return $user;
    }
    /**
     * Get user friends
     * @param string $userId
     * @return array
     */
    public function getUserFriends(string $userId): array
    {
        $sql = 'SELECT f.user1, f.user2, u1.id u1_id, u1.username u1_username, u1.email u1_email, u1.image_path u1_image_path, u1.id_library u1_id_library, r1.id u1_id_role, r1."name" u1_role, u2.id u2_id, u2.username u2_username, u2.email u2_email, u2.image_path u2_image_path, u2.id_library u2_id_library, r2.id u2_id_role, r2."name" u2_role FROM friendship f 
            JOIN "user" u1 ON f.user1 = u1.id
            JOIN "role" r1 ON u1.id_role = r1.id
            JOIN "user" u2 ON f.user2 = u2.id
            JOIN "role" r2 ON u2.id_role = r2.id
            WHERE f.user1 = :userId OR f.user2 = :userId;';

        $request = $this->pdo->prepare($sql);

        $request->execute([
            ":userId" => $userId
        ]);

        return $request->fetchAll();
    }
    /**
     * Get user conversations
     * @param string $userId
     * @return array
     */
    public function getUserConversations(string $userId): array
    {
        $sql = 'SELECT c.id, c.created_at, c."name", c.image_path FROM user_conversation uc 
            JOIN conversation c ON uc.id_conversation = c.id 
            WHERE uc.id_user = :userId;';

        $request = $this->pdo->prepare($sql);

        $request->execute([
            ":userId" => $userId
        ]);

        return $request->fetchAll();
    }
    /**
     * Update an user
     * @param User $user
     * @return void
     */
    public function updateUser(User $user): void
    {
        $sql = 'UPDATE "user" SET
            username = :username,
            email = :email,
            image_path = :imagePath,
            id_role = :idRole
            WHERE id = :userId;';

        $request = $this->pdo->prepare($sql);

        $request->execute([
            ":username" => $user->getUsername(),
            ":email" => $user->getEmail(),
            ":imagePath" => $user->getImagePath(),
            ":idRole" => $user->getUserRole()->getId(),
            ":userId" => $user->getId()
        ]);
    }

    public function deleteUser(string $userId): void
    {
        $sql = 'SELECT u.id FROM "user" u
            WHERE u.id = :userId;';

        $request = $this->pdo->prepare($sql);

        $request->execute([
            ":userId" => $userId
        ]);

        $user = $request->fetch();

        if (!$user) {
            throw new ApiCustomException("user nor found", 404);
        }

        $sql = 'DELETE FROM "user" 
            WHERE id = :userId;';

        $request = $this->pdo->prepare($sql);

        $request->execute([
            ":userId" => $userId
        ]);
    }

    /**
     * Function to get an user 'liked' playlist
     * @param string $userId
     * @return array
     */
    public function getLikedPlaylist(string $userId): array
    {
        $sql = 'SELECT p.id as playlist_id, p.title as playlist_title, p.ispublic as playlist_public, p.description as playlist_description, p.cover_path as playlist_cover, m.id music_id, m."release" music_release, m.title music_title, m.duration music_duration, m.file_path music_path, m.nb_streams music_streams, a."name" artist_name FROM "library" l 
            JOIN library_playlist lp ON l.id = lp.id_library 
            JOIN playlist p ON lp.id_playlist = p.id
            JOIN playlist_music pm ON p.id = pm.id_playlist
            JOIN music m ON pm.id_music = m.id
            JOIN project_music prm ON m.id = prm.id_music
            JOIN project pr ON prm.id_project = pr.id
            JOIN artist_project ap ON pr.id = ap.id_project
            JOIN artist a ON ap.id_artist = a.id
            WHERE l.id = :userId AND p.title = \'liked\';';

        $request = $this->pdo->prepare($sql);
        $request->execute([':userId' => $userId]);

        return $request->fetchAll();
    }
}