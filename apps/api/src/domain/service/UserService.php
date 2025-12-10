<?php

namespace Api\Domain\Service;

use Api\Adapter\UserDrivenAdapter;
use Api\Domain\Class\Music;
use Api\Domain\Ports\UserServiceInterface;
use Exception;

class UserService implements UserServiceInterface
{
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
}