<?php

namespace Api\Domain\Service;

use Api\Adapter\UserDrivenAdapter;
use Api\Domain\Class\Music;
use Api\Domain\Ports\UserServiceInterface;
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

    public function addUserListenedMusic(int $userId, int $musicId): void
    {
        $adapter = new UserDrivenAdapter();
        $adapter->addUserListenedMusic($userId, $musicId);
    }
}