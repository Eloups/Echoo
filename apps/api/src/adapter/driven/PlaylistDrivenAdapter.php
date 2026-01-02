<?php

namespace Api\Adapter;

use Api\Database\PgsqlServer;
use Api\Database\Requests\PgsqlPlaylistRequests;
use Api\Domain\Class\Playlist;
use Api\Domain\Ports\PlaylistDrivenAdapterInterface;
use Api\Utils\ConvertUtils;

/**
 * Classe Driven Adapter pour les playlists
 */
class PlaylistDrivenAdapter implements PlaylistDrivenAdapterInterface
{
    /**
     * Méthode pour récupérer les données d'un playlist
     * @return Playlist
     */
    public function getPlaylist(int $idPlaylist): Playlist
    {
        $pgslserver = new PgsqlServer();

        $pdo = $pgslserver->getConnection();
        $request = new PgsqlPlaylistRequests($pdo);

        $rows = $request->getPlaylist($idPlaylist);

        $playlist = ConvertUtils::convertRowToPlaylist($rows);

        return $playlist;
    }

    /**
     * Méthode pour récupérer les playlists d'une library
     * @param int $id_library
     * @return array
     */
    public function getPlaylistsInLibrary(int $id_library): array
    {
        $pgslserver = new PgsqlServer();

        $pdo = $pgslserver->getConnection();
        $request = new PgsqlPlaylistRequests($pdo);

        $rows = $request->getPlaylistsInLibrary($id_library);

        $playlists = [];
        foreach ($rows as $row) {
            $nbPlaylistMusics = $request->getPlaylistMusics($row['playlist_id']);
            array_push($playlists, ConvertUtils::ConvertRowToPlaylists($row, $nbPlaylistMusics));
        }
        return $playlists;
    }

    /**
     * Méthode pour ajouter une musique à une playlist
     * @param int $id_playlist
     * @param int $id_music
     * @return void
     */
    public function addMusicInPlaylist(int $id_playlist, int $id_music): void
    {
        $pgslserver = new PgsqlServer();

        $pdo = $pgslserver->getConnection();
        $request = new PgsqlPlaylistRequests($pdo);

        $request->addMusicInPlaylist($id_playlist, $id_music);
    }

    /** 
     * Méthode pour créer une nouvelle playlist
     * @param int $id_library
     * @param string $title
     * @param bool $isPublic
     * @param string $description
     * @param string $cover_path
     * @param array $musics
     * @return void
     */
    public function addPlaylist(int $id_library, string $title, bool $isPublic, string $description, string $cover_path, array $musics)
    {
        $pgslserver = new PgsqlServer();

        $pdo = $pgslserver->getConnection();
        $request = new PgsqlPlaylistRequests($pdo);

        $request->addPlaylist($id_library, $title, $isPublic, $description, $cover_path, $musics);
    }

    /**
     * Méthode pour supprimer une musique d'une playlist
     * @param int $id_playlist
     * @param int $id_music
     * @return void
     */
    public function deleteMusicInPlaylist(int $id_playlist, int $id_music): void
    {
        $pgslserver = new PgsqlServer();

        $pdo = $pgslserver->getConnection();
        $request = new PgsqlPlaylistRequests($pdo);

        $request->deleteMusicInPlaylist($id_playlist, $id_music);
    }

    /**
     * Méthode pour supprimer une playlist
     * @param int $id_playlist
     * @return void
     */
    public function deletePlaylist(int $id_playlist): void
    {
        $pgslserver = new PgsqlServer();

        $pdo = $pgslserver->getConnection();
        $request = new PgsqlPlaylistRequests($pdo);

        $request->deletePlaylist($id_playlist);
    }
}