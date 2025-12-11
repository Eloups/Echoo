<?php

namespace Api\Adapter;

use Api\Domain\Service\PlaylistService;
use Api\Utils\SerializerUtils;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;


/**
 * Classe pour l'adaptateur des playlists
 */
class PlaylistDrivingAdapter {
    /**
     * Récupération des données de la requête puis lancement du service des playlists avec la bonne fonction
     * @param Request $request
     * @return Response
     */
    public function getOnePlaylist(int $idPlaylist): Response {

        $service = new PlaylistService();

        $playlist = $service->getOnePlaylist($idPlaylist);

        return new Response(SerializerUtils::get()->serialize(['playlist' => $playlist], "json"), 200);
    }

    public function getPlaylistInLibrary(int $id_library) : Response {
        $service = new PlaylistService();

        $playlists = $service->getPlaylistsInLibrary($id_library);

        return new Response(SerializerUtils::get()->serialize(['playlists' => $playlists], "json"), 200);
    }
}