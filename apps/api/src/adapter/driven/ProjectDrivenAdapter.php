<?php

namespace Api\Adapter;

use Api\Database\PgsqlServer;
use Api\Database\Requests\PgsqlProjectRequests;
use Api\Domain\Class\Project;
use Api\Domain\Ports\ProjectDrivenAdapterInterface;
use Api\Utils\ConvertUtils;

/**
 * Classe Driven Adapter pour les projets
 */
class ProjectDrivenAdapter implements ProjectDrivenAdapterInterface
{
    /**
     * Méthode pour ajouter un like à un projet
     * @param string $id_user
     * @param int $id_project
     * @return void
     */
    public function addLike(string $id_user, int $id_project): void
    {
        $pgslserver = new PgsqlServer();

        $pdo = $pgslserver->getConnection();
        $request = new PgsqlProjectRequests($pdo);

        // On exécute la requête
        $request->addLike($id_user, $id_project);
    }

    /**
     * Méthode pour récupérer les projets d'une library
     * @param int $id_library
     * @return array
     */
    public function getProjectsInLibrary(int $id_library): array
    {
        $pgslserver = new PgsqlServer();
        
        $pdo = $pgslserver->getConnection();
        $request = new PgsqlProjectRequests($pdo);

        $rows = $request->getProjectsInLibrary($id_library);

        $projects = [];
        foreach ($rows as $row) {
            array_push($projects, ConvertUtils::ConvertRowToProject($row));
        }
        return $projects;
    }

    /**
     * Méthode pour récupérer un projet avec ses musiques
     * @param int $id_project
     * @return Project
     */
    public function getOneProjectWithMusics(int $id_project): Project
    {
        $pgslserver = new PgsqlServer();
        
        $pdo = $pgslserver->getConnection();
        $request = new PgsqlProjectRequests($pdo);

        $rows = $request->getOneProject($id_project);
        $avgRate = $request->getAvgRatesOfProject($id_project);

        $project = ConvertUtils::ConvertRowsToProjectWithAvgRate($rows, floatval($avgRate['average_rating'] ?? -1));
        return $project;
    }

    /**
     * Méthode pour vérifier si un projet est liké
     * @param string $id_user
     * @param int $id_project
     * @return bool
     */
    public function isProjectLiked(string $id_user, int $id_project): bool {
        $pgslserver = new PgsqlServer();

        $pdo = $pgslserver->getConnection();
        $requests = new PgsqlProjectRequests($pdo);

        return $requests->isProjectLiked($id_user, $id_project);
    }
}