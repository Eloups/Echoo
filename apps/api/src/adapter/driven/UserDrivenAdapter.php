<?php

namespace Api\Adapter;

use Api\Database\PgsqlServer;
use Api\Database\Requests\PgsqlMusicRequests;
use Api\Database\Requests\PgsqlUserRequests;
use Api\Domain\Class\Music;
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
}