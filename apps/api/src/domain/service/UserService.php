<?php

namespace Api\Domain\Service;

use Api\Adapter\UserDrivenAdapter;
use Api\Domain\Class\Music;
use Api\Domain\Class\Playlist;
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
     * @param string $userId
     * @param int $limit
     * @throws Exception
     * @return array
     */
    public function getLastUserListenedMusics(string $userId, int $limit): array
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
     * @param string $userId
     * @param int $musicId
     * @return void
     */
    public function addUserListenedMusic(string $userId, int $musicId): void
    {
        $adapter = new UserDrivenAdapter();
        $adapter->addUserListenedMusic($userId, $musicId);
    }

    /**
     * Fonction pour récupérer les dernères sorties des artistes suivis par un utilisateur
     * @param string $userId
     * @param int $limit
     * @return array
     */
    public function getUserArtistsLastsReleases(string $userId, int $limit): array
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
     * @param string $userId
     * @param int $limit
     * @param DateTime $date
     * @return array
     */
    public function getUserMostListenedMusicsOfMonth(string $userId, int $limit, DateTime $date): array
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
     * @param string $userId
     * @return User
     */
    public function getOneUser(string $userId): User
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
     * @param string $userId
     * @return void
     */
    public function deleteUser(string $userId): void
    {
        $adapter = new UserDrivenAdapter();
        $adapter->deleteUser($userId);
    }

    /**
     * Get an user liked playlist
     * @param string $userId
     * @return Playlist
     */
    public function getLikedPlaylist(string $userId): Playlist
    {
        $adapter = new UserDrivenAdapter();
        return $adapter->getLikedPlaylist($userId);
    }
}