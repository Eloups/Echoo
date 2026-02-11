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
    public function addLike(int $id_user, int $id_project): void
    {
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

    /**
     * Requête pour récupérer les projets d'une library
     * @param int $id_library
     * @return array
     */
    public function getProjectsInLibrary(int $id_library): array
    {
        $getArtistsInLibrary = 'SELECT p.id, p.title, p.release, p.color1, p.color2, p.cover_path, pt.name AS project_type, a.name AS artist_name
            FROM "library" l
            JOIN library_project lp ON l.id = lp.id_library
            JOIN project p ON lp.id_project = p.id 
            JOIN project_type pt ON p.id_type = pt.id
            JOIN artist_project ap ON p.id = ap.id_project
            JOIN artist a ON ap.id_artist = a.id
            WHERE l.id = :id_library;';

        $request = $this->pdo->prepare($getArtistsInLibrary);
        $request->execute([":id_library" => $id_library]);
        $result = $request->fetchAll();
        return $result;
    }

    /**
     * Requête pour récupérer la moyenne des notes d'un projet
     * @param int $id_project
     * @return array
     */
    public function getAvgRatesOfProject(int $id_project): array
    {
        $getAvgRatesOfProject = "SELECT AVG(rating) AS average_rating
        FROM project_rating
        WHERE id_project = :id_project;";

        $request = $this->pdo->prepare($getAvgRatesOfProject);
        $request->execute([":id_project" => $id_project]);
        $result = $request->fetch();
        return $result;
    }

    public function getOneProject(int $id_project): array
    {
        $getOneProject = "SELECT
            p.id AS project_id,
            p.title AS project_title,
            p.release AS project_release,
            p.color1,
            p.color2,
            p.cover_path,

            m.id AS music_id,
            m.title AS music_title,
            m.duration,
            m.release AS music_release,
            m.nb_streams,
            m.file_path,
            pt.name AS project_type

        FROM project p
        LEFT JOIN project_music pm 
            ON p.id = pm.id_project
        LEFT JOIN music m 
            ON pm.id_music = m.id
        LEFT JOIN project_type pt 
            ON p.id_type = pt.id

        WHERE p.id = :id_project;";

        $request = $this->pdo->prepare($getOneProject);
        $request->execute([":id_project" => $id_project]);
        $result = $request->fetchAll();
        return $result;
    }
}