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
}