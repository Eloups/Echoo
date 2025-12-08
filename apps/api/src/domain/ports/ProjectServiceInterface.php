<?php

namespace Api\Domain\Ports;

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
}