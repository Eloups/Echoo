<?php

namespace Api\Domain\Service;

use Api\Adapter\PlaylistDrivenAdapter;
use Api\Domain\Class\Playlist;
use Api\Domain\Ports\PlaylistServiceInterface;
use Exception;
use Symfony\Component\HttpFoundation\Response;

/**
 * Classe de service des playlists
 */
class PlaylistService implements PlaylistServiceInterface {
    /**
     * Action des données d'une playlist
     * @return Response
     */
    public function getOnePlaylist(int $idPlaylist): Playlist {
        $driven = new PlaylistDrivenAdapter();

        $playlist = $driven->getPlaylist($idPlaylist);

        return $playlist;
    }
}