<?php

namespace Api\Domain\Service;

use Api\Adapter\MusicDrivenAdapter;
use Api\Domain\Class\Music;
use Api\Domain\Ports\MusicServiceInterface;
use DateTime;
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
        return $musics;
    }
}