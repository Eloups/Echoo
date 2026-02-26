<?php

namespace Api\Domain\Service;

use Api\Adapter\MusicDrivenAdapter;
use Api\Domain\Class\Music;
use Api\Domain\Class\Rating;
use Api\Domain\Ports\MusicServiceInterface;
use DateTime;
use Exception;
use Symfony\Component\HttpFoundation\Response;

/**
 * Classe de service des musiques
 */
class MusicService implements MusicServiceInterface
{
    /**
     * Action du listage des musiques
     * @return array
     */
    public function listMusics(int $idArtist): array
    {
        $driven = new MusicDrivenAdapter();

        $musics = $driven->getMusicList($idArtist);
        foreach ($musics as $music) {
            if (!$music instanceof Music) {
                throw new Exception("Les données ne sont pas du type Music");
            }
        }
        return $musics;
    }

    /**
     * Action de l'ajout d'un like sur une musique
     * @param string $id_user
     * @param int $id_music
     * @return void
     */
    public function likeMusic(string $id_user, int $id_music): void
    {
        $driven = new MusicDrivenAdapter();
        $driven->addLike($id_user, $id_music);
    }

    /**
     * Récupération des notes d'une musique
     * @param int $musicId
     * @param int $limit
     * @return array
     */
    public function getMusicsRatings(int $musicId, int $limit): array
    {
        $driven = new MusicDrivenAdapter();
        $ratings = $driven->getMusicsRatings($musicId, $limit);

        foreach ($ratings as $rate) {
            if (!$rate instanceof Rating) {
                throw new Exception("Les données ne sont pas du type Rating");
            }
        }

        return $ratings;
    }

    /**
     * Action de la récupération du cover file d'un projet à partir de l'id d'une musique
     * @param int $id_music
     * @return string
     */
    public function getCoverFileProject(int $id_music): string
    {
        $driven = new MusicDrivenAdapter();
        $cover_path = $driven->getCoverFileProject($id_music);

        return $cover_path;
    }

    /**
     * Action de la vérification si une musique est likée par un utilisateur
     * @param int $id_user
     * @param int $id_music
     * @return bool
     */
    public function getIsMusicLikeByUser(int $id_user, int $id_music): bool {
        $driven = new MusicDrivenAdapter();
        $isLike = $driven->getIsMusicLikeByUser($id_user, $id_music);
        return $isLike;
    }
}