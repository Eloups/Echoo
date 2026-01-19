<?php

namespace Api\Adapter;

use Api\Database\PgsqlServer;
use Api\Database\Requests\PgsqlMusicRequests;
use Api\Database\Requests\PgsqlUserRequests;
use Api\Domain\Class\Music;
use Api\Domain\Class\User;
use Api\Domain\Ports\UserDrivenAdapterInterface;
use Api\Utils\ConvertUtils;
use DateTime;

/**
 * Adaptateur piloté des utilisateurs
 */
class UserDrivenAdapter implements UserDrivenAdapterInterface
{
    /**
     * Fonction de récupération des dernières musqieus écoutées
     * @param int $userId
     * @param int $limit
     * @return array
     */
    public function getUserLastListenedMusics(int $userId, int $limit): array
    {
        $pgslserver = new PgsqlServer();

        $pdo = $pgslserver->getConnection();
        $userRequests = new PgsqlUserRequests($pdo);

        $musicsRows = $userRequests->getLastListenedMusics($userId);

        $musicsToReturn = [];
        foreach ($musicsRows as $musicRow) {
            if (count($musicsToReturn) >= $limit) {
                break;
            }
            if (!in_array($musicRow, $musicsToReturn)) {
                array_push($musicsToReturn, $musicRow);
            }
        }

        $musics = ConvertUtils::convertRowToMusics($musicsToReturn, $pdo);

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
        $pgslserver = new PgsqlServer();

        $pdo = $pgslserver->getConnection();
        $userRequests = new PgsqlUserRequests($pdo);

        $userRequests->addUserListenedMusic($userId, $musicId);
    }

    /**
     * Fonction pour récupérer les dernères sorties des artistes suivis par un utilisateur
     * @param int $userId
     * @param int $limit
     * @return void
     */
    public function getUserArtistsLastsReleases(int $userId, int $limit): array
    {
        $pgslserver = new PgsqlServer();

        $pdo = $pgslserver->getConnection();
        $userRequests = new PgsqlUserRequests($pdo);

        $artistsRows = $userRequests->getUserLikedArtistsIds($userId);
        $artists = ConvertUtils::convertRowsToArtistsIds($artistsRows);

        $projectsRows = $userRequests->getUserLikedArtistlastReleases($artists, $limit);
        $projects = ConvertUtils::convertRowsToProjects($projectsRows);

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
        $pgslserver = new PgsqlServer();

        $pdo = $pgslserver->getConnection();
        $userRequests = new PgsqlUserRequests($pdo);

        $musicsIdsRows = $userRequests->getUserMostListenedMusicsOfMonth($userId, $limit, $date);
        $musicsIds = ConvertUtils::convertRowsToMusicsIds($musicsIdsRows);

        $musicsRows = $userRequests->getMusicsFromIds($musicsIds);
        $musics = ConvertUtils::convertRowsToMusics($pdo, $musicsRows);

        return $musics;
    }

    /**
     * Fonction pour créer un utilisateur
     * @param User $user
     * @return void
     */
    public function createUser(User $user): void
    {
        $pgslserver = new PgsqlServer();

        $pdo = $pgslserver->getConnection();
        $userRequests = new PgsqlUserRequests($pdo);

        $userRequests->createUser($user);
    }
    /**
     * Fonction qui récupère tous les utilisateurs
     * @return User[]
     */
    public function getAllUsers(): array
    {
        $pgslserver = new PgsqlServer();

        $pdo = $pgslserver->getConnection();
        $userRequests = new PgsqlUserRequests($pdo);

        $userRows = $userRequests->getAllUsers();
        $users = ConvertUtils::convertRowsToUsers($userRows);

        return $users;
    }
    /**
     * Function to get one user
     * @param int $userId
     * @return User
     */
    public function getOneUser(int $userId): User
    {
        $pgslserver = new PgsqlServer();

        $pdo = $pgslserver->getConnection();
        $userRequests = new PgsqlUserRequests($pdo);

        $userFriendsRows = $userRequests->getUserFriends($userId);
        $userFriends = ConvertUtils::convertRowsToUserFriends($userFriendsRows, $userId);

        $userConversationsRows = $userRequests->getUserConversations($userId);
        $userConversations = ConvertUtils::convertRowsToConversations($userConversationsRows);

        $userRow = $userRequests->getOneUser($userId);
        $user = ConvertUtils::convertRowToUser($userRow, $userFriends, $userConversations);

        return $user;
    }
    /**
     * Update an user
     * @param User $user
     * @return void
     */
    public function updateUser(User $user): void
    {
        $pgslserver = new PgsqlServer();

        $pdo = $pgslserver->getConnection();
        $userRequests = new PgsqlUserRequests($pdo);

        $userRequests->updateUser($user);
    }
    /**
     * Delete an user
     * @param int $userId
     * @return void
     */
    public function deleteUser(int $userId): void
    {
        $pgslserver = new PgsqlServer();

        $pdo = $pgslserver->getConnection();
        $userRequests = new PgsqlUserRequests($pdo);

        $userRequests->deleteUser($userId);
    }
}