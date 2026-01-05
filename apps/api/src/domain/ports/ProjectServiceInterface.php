<?php

namespace Api\Domain\Ports;

use Api\Domain\Class\Project;

/**
 * Interface du service de musique
 */
interface ProjectServiceInterface {

    /**
     * Action de l'ajout d'un like sur un projet par un utilisateur
     * @param int $id_user
     * @param int $id_project
     * @return void
     */
    public function likeProject(int $id_user, int $id_project): void;

    /**
     * Action de la récupération des projets d'une library
     * @param int $id_library
     * @return array
     */
    public function getProjectsInLibrary(int $id_library): array;

    /**
     * Action de la récupération d'un projet avec ses musiques
     * @param int $id_project
     * @return Project
     */
    public function getOneProjectWithMusics(int $id_project): Project;
}