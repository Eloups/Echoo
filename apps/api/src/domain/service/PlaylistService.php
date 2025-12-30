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

    /**
     * Action du listage des playlists d'une library
     * @param int $id_library
     * @return array
     */
    public function getPlaylistsInLibrary(int $id_library): array
    {
        $driven = new PlaylistDrivenAdapter();

        $playlists = $driven->getPlaylistsInLibrary($id_library);
        foreach($playlists as $playlist) {
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

    public function addPlaylist(int $id_library, string $title, bool $isPublic, string $description, string $cover_path, array $musics)
    {
        $driven = new PlaylistDrivenAdapter();
        $driven->addPlaylist($id_library, $title, $isPublic, $description, $cover_path, $musics);
    }
}