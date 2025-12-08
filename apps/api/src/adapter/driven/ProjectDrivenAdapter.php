<?php

namespace Api\Adapter;

use Api\Database\PgsqlServer;
use Api\Database\Requests\PgsqlProjectRequests;
use Api\Domain\Ports\ProjectDrivenAdapterInterface;

/**
 * Classe Driven Adapter pour les musiques
 */
class ProjectDrivenAdapter implements ProjectDrivenAdapterInterface
{
    /**
     * Méthode pour ajouter un like à un projet
     * @param int $id_user
     * @param int $id_project
     * @return void
     */
    public function addLike(int $id_user, int $id_project): void
    {
        $pgslserver = new PgsqlServer();

        $pdo = $pgslserver->getConnection();
        $request = new PgsqlProjectRequests($pdo);

        // On exécute la requête
        $request->addLike($id_user, $id_project);
    }
}