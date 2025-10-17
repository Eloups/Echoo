<?php

namespace Api\Database\Requests;

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
     * Ceci est une requête d'exemple
     * @return void
     */
    public function getAllMusics(): array
    {
        $request = $this->pdo->prepare("SELECT id, title, duration, release, nb_streams, file_path FROM music");
        $request->execute();
        $result = $request->fetchAll();
        return $result;
    }
}