<?php 

namespace Api\Domain\Ports;

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
}