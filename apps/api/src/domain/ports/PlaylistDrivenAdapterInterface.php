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

    /**
     * Méthode pour récupérer les playlists d'une library
     * @param int $id_library
     * @return array
     */
    public function getPlaylistsInLibrary(int $id_library): array;
}