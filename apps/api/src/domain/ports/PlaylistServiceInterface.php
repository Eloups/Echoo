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

    /**
     * Action du listage des playlists d'une library
     * @param int $id_library
     * @return array
     */
    public function getPlaylistsInLibrary(int $id_library): array;

    /**
     * Action de l'ajout d'une musique à une playlist
     * @param int $id_playlist
     * @param int $id_music
     * @return array
     */
    public function addMusicInPlaylist(int $id_playlist, int $id_music): void;
}