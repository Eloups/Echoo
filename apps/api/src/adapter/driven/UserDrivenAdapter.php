<?php

namespace Api\Adapter;

use Api\Database\PgsqlServer;
use Api\Database\Requests\PgsqlMusicRequests;
use Api\Database\Requests\PgsqlUserRequests;
use Api\Domain\Class\Music;
use Api\Domain\Ports\UserDrivenAdapterInterface;
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

        $musicRequests = new PgsqlMusicRequests($pdo);

        $musics = [];
        foreach ($musicsToReturn as $musicToReturn) {
            $genres = [];
            $genresData = $musicRequests->getMusicsGenres($musicToReturn['id']);
            foreach ($genresData as $genreData) {
                array_push($genres, $genreData['name']);
            }

            array_push($musics, new Music(
                $musicToReturn['id'],
                $musicToReturn['title'],
                $musicToReturn['duration'],
                new DateTime($musicToReturn['release']),
                $musicToReturn['file_path'],
                $genres,
                $musicToReturn['nb_streams'],
                null
            ));
        }

        return $musics;
    }
}