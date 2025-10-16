<?php

namespace Api\Database\Requests;

use PDO;

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
     * Ceci est une requête d'exemple
     * @return void
     */
    public function getAllMusics(): array
    {
        // $this->pdo->beginTransaction();

        $request = $this->pdo->prepare("SELECT * FROM music");
        // $request->bindParam(':exemple', $exemple, PDO::PARAM_STR);
        $request->execute();

        $result = $request->fetchAll();

        // $this->pdo->commit();

        return $result;
    }
}