<?php 

namespace Api\Domain\Ports;

use Api\Domain\Class\Playlist;

/**
 * Interface pour le PlaylistDrivenAdapter
 */
interface PlaylistDrivenAdapterInterface {
    /**
     * Méthode pour récupérer une playlist
     * @param int $idPlaylist
     * @return Playlist
     */
    public function getPlaylist(int $idPlaylist): Playlist;
}