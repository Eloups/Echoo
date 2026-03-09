<?php

namespace Api\Domain\Service;

use Api\Adapter\PlaylistDrivenAdapter;
use Api\Domain\Class\Playlist;
use Api\Domain\Ports\PlaylistServiceInterface;
use Exception;

/**
 * Classe de service des playlists
 */
class PlaylistService implements PlaylistServiceInterface
{
    /**
     * Action des données d'une playlist
     * @return Playlist
     */
    public function getOnePlaylist(int $idPlaylist): Playlist
    {
        $driven = new PlaylistDrivenAdapter();

        $playlist = $driven->getPlaylist($idPlaylist);

        return $playlist;
    }

    /**
     * Action du listage des playlists d'une library
     * @param string $id_library
     * @return array
     */
    public function getPlaylistsInLibrary(string $id_library): array
    {
        $driven = new PlaylistDrivenAdapter();

        $playlists = $driven->getPlaylistsInLibrary($id_library);
        foreach ($playlists as $playlist) {
            if (!$playlist instanceof Playlist) {
                throw new Exception("Les données ne sont pas du type Playlist");
            }
        }

        return $playlists;
    }

    /**
     * Action de l'ajout d'une musique à une playlist
     * @param int $id_playlist
     * @param int $id_music
     * @return void
     */
    public function addMusicInPlaylist(int $id_playlist, int $id_music): void
    {
        $driven = new PlaylistDrivenAdapter();
        $driven->addMusicInPlaylist($id_playlist, $id_music);
    }

    /** Action de la création d'une playlist
     * @param string $id_library
     * @param string $title
     * @param bool $isPublic
     * @param string $description
     * @param string $cover_path
     * @param array $musics
     * @return void
     */
    public function addPlaylist(string $id_library, string $title, bool $isPublic, string $description, string $cover_path, array $musics)
    {
        $driven = new PlaylistDrivenAdapter();
        $driven->addPlaylist($id_library, $title, $isPublic, $description, $cover_path, $musics);
    }

    /**
     * Action de la suppression d'une playlist
     * @param int $id_playlist
     * @return void
     */
    public function deletePlaylist(int $id_playlist): void
    {
        $driven = new PlaylistDrivenAdapter();
        $driven->deletePlaylist($id_playlist);
    }

    /**
     * Action de la suppression d'une musique d'une playlist
     * @param int $id_playlist
     * @param int $id_music
     * @return void
     */
    public function deleteMusicInPlaylist(int $id_playlist, int $id_music): void
    {
        $driven = new PlaylistDrivenAdapter();
        $driven->deleteMusicInPlaylist($id_playlist, $id_music);
    }

    /**
     * Action de la modification d'une playlist
     * @param int $id_playlist
     * @param string $title
     * @param bool $isPublic
     * @param string $description
     * @param string $cover_path
     * @return void
     */
    public function updatePlaylist(int $id_playlist, string $title, bool $isPublic, string $description, string $cover_path)
    {
        $driven = new PlaylistDrivenAdapter();
        $driven->updatePlaylist($id_playlist, $title, $isPublic, $description, $cover_path);
    }
}