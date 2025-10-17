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
    public function getAllMusics(): array
    {
        $request = $this->pdo->prepare(RequestUtils::$getAllMusics);
        $request->execute();
        $result = $request->fetchAll();
        return $result;
    }
}