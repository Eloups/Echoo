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

    /**
     * Méthode pour ajouter une musique à une playlist
     * @param int $id_playlist
     * @param int $id_music
     * @return array
     */
    public function addMusicInPlaylist(int $id_playlist, int $id_music): void;

    /** Méthode pour créer une library
     * @param int $id_library
     * @param string $title
     * @param bool $isPublic
     * @param string $description
     * @param string $cover_path
     * @param array $musics
     * @return void
     */
    public function addPlaylist(int $id_library, string $title, bool $isPublic, string $description, string $cover_path, array $musics);

    /**
     * Méthode pour supprimer une musique d'une playlist
     * @param int $id_playlist
     * @param int $id_music
     * @return array
     */
    public function deleteMusicInPlaylist(int $id_playlist, int $id_music): void;

    /**
     * Méthode pour supprimer une playlist
     * @param int $id_playlist
     * @return void
     */
    public function deletePlaylist(int $id_playlist): void;
}