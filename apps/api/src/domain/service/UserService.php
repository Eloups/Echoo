<?php

namespace Api\Domain\Service;

use Api\Adapter\UserDrivenAdapter;
use Api\Domain\Class\Music;
use Api\Domain\Class\Project;
use Api\Domain\Class\User;
use Api\Domain\Ports\UserServiceInterface;
use DateTime;
use Exception;

/**
 * Service des utilisateurs
 */
class UserService implements UserServiceInterface
{
    /**
     * Fonction pour récupérer les dernières musiques écoutées par un utilisateur
     * @param int $userId
     * @param int $limit
     * @throws Exception
     * @return array
     */
    public function getLastUserListenedMusics(int $userId, int $limit): array
    {
        $adapter = new UserDrivenAdapter();

        $musics = $adapter->getUserLastListenedMusics($userId, $limit);

        foreach ($musics as $music) {
            if (!$music instanceof Music) {
                throw new Exception('The returned datas in service are not musics');
            }
        }

        return $musics;
    }

    /**
     * Fonction pour ajouter une musique écoutée par un utilisateur
     * @param int $userId
     * @param int $musicId
     * @return void
     */
    public function addUserListenedMusic(int $userId, int $musicId): void
    {
        $adapter = new UserDrivenAdapter();
        $adapter->addUserListenedMusic($userId, $musicId);
    }

    /**
     * Fonction pour récupérer les dernères sorties des artistes suivis par un utilisateur
     * @param int $userId
     * @param int $limit
     * @return void
     */
    public function getUserArtistsLastsReleases(int $userId, int $limit): array
    {
        $adapter = new UserDrivenAdapter();
        $projects = $adapter->getUserArtistsLastsReleases($userId, $limit);

        foreach ($projects as $project) {
            if (!$project instanceof Project) {
                throw new Exception('The returned datas in service are not projects');
            }
        }

        return $projects;
    }

    /**
     * Méthode pour récupérer les musiques les plus écoutées par un utilisateur un mois
     * @param int $userId
     * @param int $limit
     * @param DateTime $date
     * @return array
     */
    public function getUserMostListenedMusicsOfMonth(int $userId, int $limit, DateTime $date): array
    {
        $adapter = new UserDrivenAdapter();
        $musics = $adapter->getUserMostListenedMusicsOfMonth($userId, $limit, $date);

        foreach ($musics as $music) {
            if (!$music instanceof Music) {
                throw new Exception('The returned datas in service are not musics');
            }
        }

        return $musics;
    }

    /**
     * Méthode pour créer un utilisateur
     * @param User $user
     * @return void
     */
    public function createUser(User $user): void
    {
        $adapter = new UserDrivenAdapter();
        $adapter->createUser($user);
    }
    /**
     * Méthode pour récupérer tous les utilisateurs
     * @return User[]
     */
    public function getAllUsers(): array
    {
        $adapter = new UserDrivenAdapter();

        $users = $adapter->getAllUsers();
        foreach ($users as $user) {
            if (!$user instanceof User) {
                throw new Exception('The returned datas in service are not users');
            }
        }

        return $users;
    }
    /**
     * Function to get one user
     * @param int $userId
     * @return User
     */
    public function getOneUser(int $userId): User
    {
        $adapter = new UserDrivenAdapter();

        $user = $adapter->getOneUser($userId);

        return $user;
    }
    /**
     * Update an user
     * @param User $user
     * @return void
     */
    public function updateUser(User $user): void
    {
        $adapter = new UserDrivenAdapter();
        $adapter->updateUser($user);
    }
    /**
     * Delete an user
     * @param int $userId
     * @return void
     */
    public function deleteUser(int $userId): void
    {
        $adapter = new UserDrivenAdapter();
        $adapter->deleteUser($userId);
    }
}