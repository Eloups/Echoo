<?php

namespace Api\Domain\Service;

use Api\Adapter\ProjectDrivenAdapter;
use Api\Domain\Ports\ProjectServiceInterface;

/**
 * Classe de service des projets
 */
class ProjectService implements ProjectServiceInterface {
    /**
     * Action de l'ajout d'un like à un projet
     * @param int $id_user
     * @param int $id_project
     * @return void
     */
    public function likeProject(int $id_user, int $id_project): void {
        $driven = new ProjectDrivenAdapter();
        $driven->addLike($id_user, $id_project);
    }
}