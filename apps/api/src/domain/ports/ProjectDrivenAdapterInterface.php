<?php 

namespace Api\Domain\Ports;

use Api\Domain\Class\Project;

/**
 * Interface pour le ProjectDrivenAdapter
 */
interface ProjectDrivenAdapterInterface {
    /**
     * Méthode pour ajouter un like à un projet par un utilisateur
     * @param int $id_user
     * @param int $id_project
     * @return void
     */
    public function addLike(int $id_user, int $id_project): void;

    /**
     * Méthode pour récupérer les projets d'une library
     * @param int $id_library
     * @return array
     */
    public function getProjectsInLibrary(int $id_library): array;

    /**
     * Méthode pour récupérer un projet et ses musiques à partir de son id
     * @param int $id_project
     * @return Project
     */
    public function getOneProjectWithMusics(int $id_project): Project;

    /**
     * Méthode pour vérifier si un projet est liké
     * @param string $id_user
     * @param int $id_project
     * @return bool
     */
    public function isProjectLiked(string $id_user, int $id_project): bool;
}