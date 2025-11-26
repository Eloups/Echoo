<?php

namespace Api\Domain\Service;

use Api\Adapter\MusicDrivenAdapter;
use Api\Domain\Class\Music;
use Api\Domain\Ports\ArtistServiceInterface;
use DateTime;
use Exception;
use Symfony\Component\HttpFoundation\Response;

/**
 * Classe de service des musiques
 */
class ArtistService implements ArtistServiceInterface {
    /**
     * Action du listage des musiques
     * @return Response
     */
    public function artistPage(int $idArtist): array {
        // $driven = new MusicDrivenAdapter();

        // $musics = $driven->getMusicList($idArtist);
        // foreach ($musics as $music) {
        //     if (!$music instanceof Music) {
        //         throw new Exception("Les données ne sont pas du type Music");
        //     }
        // }
        // return $musics;
    }
}