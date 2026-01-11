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

    /**
     * Action de la suppression d'une playlist
     * @param int $id_playlist
     * @return void
     */
    public function deletePlaylist(int $id_playlist): void;

    /** Action de la création d'une playlist
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
     * Action de la suppression d'une musique d'une playlist
     * @param int $id_playlist
     * @param int $id_music
     * @return array
     */
    public function deleteMusicInPlaylist(int $id_playlist, int $id_music): void;

    /**
     * Action de modification d'une playlist
     * @param int $id_playlist
     * @param string $title
     * @param bool $isPublic
     * @param string $description
     * @param string $cover_path
     * @return void
     */
    public function updatePlaylist(int $id_playlist, string $title, bool $isPublic, string $description, string $cover_path);
}