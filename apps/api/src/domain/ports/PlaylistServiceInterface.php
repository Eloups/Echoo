<?php

namespace Api\Domain\Ports;

use Api\Domain\Class\Playlist;

/**
 * Interface du service des playlists
 */
interface PlaylistServiceInterface {
    /**
     * Action du listage d'une playlist
     * @param int $idPlaylist
     * @return array
     */
    public function getOnePlaylist(int $idPlaylist): Playlist;
}