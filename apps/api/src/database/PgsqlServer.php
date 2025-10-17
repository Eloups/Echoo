<?php

namespace Api\Database;

use Exception;
use PDO;
use PDOException;

/**
 * Classe permettant d'interagir avec une base de données PostgreSQL.
 */
class PgsqlServer
{
    /**
     * Adresse du serveur PostgreSQL.
     * @var string
     */
    private string $host;

    /**
     * Port du serveur PostgreSQL.
     * @var string
     */
    private string $port;

    /**
     * Nom de la base de données
     * @var string
     */
    private string $dbName;

    /**
     * Nom d'utilisateur pour se connecter à la base de données.
     * @var string
     */
    private string $username;

    /**
     * Mot de passe pour se connecter à la base de données.
     * @var string
     */
    private string $password;

    /**
     * Instance PDO pour la connexion à la base de données.
     * @var PDO
     */
    private PDO $pdo;

    /**
     * Constructeur de la classe PostgresSqlServer.
     */
    public function __construct()
    {
        $this->host = $_ENV["DB_HOST"];
        $this->port = $_ENV["DB_PORT"];
        $this->dbName = $_ENV["DB_NAME"];
        $this->username = $_ENV["DB_USER"];
        $this->password = $_ENV["DB_PASSWORD"];
    }

    /**
     * Fonction de récupération de la connexion à la base de données (PDO).
     * @throws Exception si la connexion échoue.
     * @return PDO
     */
    public function getConnection(): PDO
    {
        // Le PDO n'est pas encore initialisé, on le crée
        if (!isset($this->pdo)) {
            try {
                $dsn = "pgsql:host={$this->host};dbname={$this->dbName};port={$this->port}";
                $options = [
                    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION, // Activer les exceptions pour les erreurs
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC, // Récupérer les résultats sous forme de tableau associatif
                    PDO::ATTR_EMULATE_PREPARES => false, // Désactiver l'émulation des requêtes préparées
                ];

                $this->pdo = new PDO($dsn, $this->username, $this->password, $options);
            } catch (PDOException $e) {
                throw new Exception('Erreur de connexion à la base de données : ' . $e->getMessage());
            }
        }

        return $this->pdo;
    }
}
