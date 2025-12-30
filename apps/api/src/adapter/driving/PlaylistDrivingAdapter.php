<?php

namespace Api\Adapter;

use Api\Domain\Service\PlaylistService;
use Api\Utils\SerializerUtils;
use Api\Utils\VerifyUtils;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;


/**
 * Classe pour l'adaptateur des playlists
 */
class PlaylistDrivingAdapter
{
    /**
     * Récupération des données de la requête puis lancement du service des playlists avec la bonne fonction
     * @param Request $request
     * @return Response
     */
    public function getOnePlaylist(int $idPlaylist): Response
    {

        $service = new PlaylistService();

        $playlist = $service->getOnePlaylist($idPlaylist);

        return new Response(SerializerUtils::get()->serialize(['playlist' => $playlist], "json"), 200);
    }

    public function getPlaylistInLibrary(int $id_library): Response
    {
        $service = new PlaylistService();

        $playlists = $service->getPlaylistsInLibrary($id_library);

        return new Response(SerializerUtils::get()->serialize(['playlists' => $playlists], "json"), 200);
    }

    /**
     * Méthode pour ajouter une musique à une playlist
     * @param string $requestBody
     * @return Response
     */
    public function addMusicInPlaylist(string $requestBody): Response {
        $body = VerifyUtils::verifyJsonRequestBody($requestBody, ['id_playlist', 'id_music']);

        $service = new PlaylistService();
        $service->addMusicInPlaylist($body['id_playlist'], $body['id_music']);
        return new Response(json_encode(['code' => 200, 'message' => 'musique ajoutée à la playlist avec succès']));
    }

    public function deletePlaylist(int $id_playlist): Response {
        $service = new PlaylistService();
        $service->deletePlaylist($id_playlist);
        return new Response(json_encode(['code' => 200, 'message' => 'playlist supprimée avec succès']));
    }
}