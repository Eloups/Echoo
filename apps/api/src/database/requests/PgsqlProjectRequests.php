<?php

namespace Api\Database\Requests;

use Api\Utils\RequestUtils;
use PDO;

/**
 * Classe permettant de lancer des requêtes SQL sur les projets de la base de données
 */
class PgsqlProjectRequests
{
    /**
     * Connection à la base de données
     * @var PDO
     */
    private PDO $pdo;

    /**
     * Constructeur de la classe PgsqlProjectRequests
     * @param PDO $pdo
     */
    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    /**
     * Requête pour ajouter un like à un projet
     * @param int $id_user
     * @param int $id_project
     * @return void
     */
    public function addLike(int $id_user, int $id_project): void {
        $getIdLibrary = "SELECT id_library
        FROM \"user\"
        WHERE \"user\".id = :id_user;";

        $request = $this->pdo->prepare($getIdLibrary);
        $request->execute([":id_user" => $id_user]);
        $idLibrary = intval($request->fetchAll());

        $request = $this->pdo->prepare("
            INSERT INTO library_project (id_library, id_project)
            VALUES (:id_library, :id_project)
        ");
        
        $request->execute([
            ":id_library" => $idLibrary,
            ":id_project" => $id_project
        ]);
    }
}