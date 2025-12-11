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
}