<?php

namespace Api\Domain\Ports;

/**
 * Interface du service des utilisateurs
 */
interface UserServiceInterface
{
    /**
     * Action de récupération des dernières musiques écoutées
     * @param int $userId
     * @param int $limit
     * @return array
     */
    public function getLastUserListenedMusics(int $userId, int $limit): array;
}