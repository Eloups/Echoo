<?php

namespace Api\Domain\Ports;

use Api\Domain\Class\User;
use DateTime;

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
    /**
     * Fonction pour ajouter une musique écoutée par un utilisateur
     * @param int $userId
     * @param int $musicId
     * @return void
     */
    public function addUserListenedMusic(int $userId, int $musicId): void;
    /**
     * Fonction pour récupérer les dernères sorties des artistes suivis par un utilisateur
     * @param int $userId
     * @param int $limit
     * @return void
     */
    public function getUserArtistsLastsReleases(int $userId, int $limit): array;
    /**
     * Méthode pour récupérer les musiques les plus écoutées par un utilisateur un mois
     * @param int $userId
     * @param int $limit
     * @param DateTime $date
     * @return array
     */
    public function getUserMostListenedMusicsOfMonth(int $userId, int $limit, DateTime $date): array;
    /**
     * Méthode pour créer un utilisateur
     * @param User $user
     * @return void
     */
    public function createUser(User $user): void;
    /**
     * Méthode pour récupérer tous les utilisateurs
     * @return User[]
     */
    public function getAllUsers(): array;
    /**
     * Function to get one user
     * @param string $userId
     * @return User
     */
    public function getOneUser(string $userId): User;
    /**
     * Update an user
     * @param User $user
     * @return void
     */
    public function updateUser(User $user): void;
    /**
     * Delete an user
     * @param string $userId
     * @return void
     */
    public function deleteUser(string $userId): void;
}