<?php

namespace Api\Domain\Ports;

/**
 * Interface de l'adaptateur piloté des utilisateurs
 */
interface UserDrivenAdapterInterface
{
    /**
     * Méthode de récupération des dernières musiques écoutées par un utilisateur
     * @param int $userId
     * @param int $limit
     * @return array
     */
    public function getUserLastListenedMusics(int $userId, int $limit): array;
}