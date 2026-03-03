<?php

namespace Api\Domain\Service;

use Api\Adapter\ProjectDrivenAdapter;
use Api\Domain\Class\Project;
use Api\Domain\Ports\ProjectServiceInterface;
use Exception;

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

    /**
     * Action de la récupération des projets de la library
     * @param int $id_library
     * @throws Exception
     * @return array
     */
    public function getProjectsInLibrary(int $id_library): array
    {
        $driven = new ProjectDrivenAdapter();
        $projects = $driven->getProjectsInLibrary($id_library);
        foreach($projects as $project) {
            if (!$project instanceof Project) {
                throw new Exception("Les données ne sont pas du type Project");
            }
        }

        return $projects;
    }

    /**
     * Action de la récupération d'un projet et ses musiques avec son id
     * @param int $id_project
     * @throws Exception
     * @return Project
     */
    public function getOneProjectWithMusics(int $id_project): Project
    {
        $driven = new ProjectDrivenAdapter();
        $project = $driven->getOneProjectWithMusics($id_project);
        return $project;
    }

      /**
     * Action de la vérification si un artiste est liké
     * @param string $id_user
     * @param int $id_project
     * @return bool
     */
    public function isProjectLiked(string $id_user, int $id_project): bool {
        $driven = new ProjectDrivenAdapter();
        return $driven->isProjectLiked($id_user, $id_project);
    }
}