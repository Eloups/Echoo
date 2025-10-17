<?php

namespace Api\Domain\Service;

use Api\Adapter\MusicDrivenAdapter;
use Api\Domain\Class\Music;
use Api\Domain\Ports\MusicServiceInterface;
use DateTime;
use Exception;
use Symfony\Component\HttpFoundation\Response;

/**
 * Classe de service des musiques
 */
class MusicService implements MusicServiceInterface {
    /**
     * Action du listage des musiques
     * @return Response
     */
    public function listMusics(): array {
        $driven = new MusicDrivenAdapter();

        $musics = $driven->getMusicList();
        foreach ($musics as $music) {
            if (!$music instanceof Music) {
                throw new Exception("Les données ne sont pas du type Music");
            }
        }
        return $musics;
    }
}