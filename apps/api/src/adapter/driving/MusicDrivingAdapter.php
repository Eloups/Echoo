<?php

namespace Api\Adapter;

use Api\Domain\Service\MusicService;
use Api\Utils\SerializerUtils;
use Exception;
use Symfony\Component\HttpFoundation\Response;


/**
 * Classe pour l'adaptateur des musiques
 */
class MusicDrivingAdapter
{
    /**
     * Récupération des données de la requête puis lancement du service des musiques pour lister les musiques d'un artiste
     * @param int $idArtist
     * @return Response
     */
    public function listMusics(int $idArtist): Response
    {

        $service = new MusicService();

        $musics = $service->listMusics($idArtist);

        return new Response(SerializerUtils::get()->serialize(['musics' => $musics], "json"), 200);
    }

    /**
     * Récupération des données de la requête puis lancement du service des musiques pour ajouter un like à une musique
     * @param string $requestBody
     * @return Response
     */
    public function likeMusic(string $requestBody): Response
    {
        // Vérification du JSON
        if (!json_validate($requestBody)) {
            return new Response(json_encode(['code' => 422, 'message' => "Le json n'est pas valide"]));
        }
        $body = json_decode($requestBody, true);

        // Vérification des clés obligatoires
        $requiredKeys = ['id_user', 'id_music'];
        foreach ($requiredKeys as $key) {
            if (!array_key_exists($key, $body)) {
                throw new Exception("Le body doit contenir la clé '$key'.");
            }
        }

        // Vérification des types
        if (!is_int($body['id_user']) || !is_int($body['id_music'])) {
            throw new Exception("Les champs 'id_user' et 'id_music' doivent être des entiers.");
        }
        $service = new MusicService();
        $service->likeMusic($body['id_user'], $body['id_music']);
        return new Response(json_encode(['code' => 200, 'message' => 'Like ajouté avec succès']));
    }

    /**
     * Récupération des notes d'une musique
     * @param int $musicId
     * @param int $limit
     * @return Response
     */
    public function getMusicsRatings(int $musicId, int $limit): Response
    {
        $service = new MusicService();
        $ratings = $service->getMusicsRatings($musicId, $limit);

        return new Response(SerializerUtils::get()->serialize(['ratings' => $ratings], "json"));
    }

    /**
     * Récupération du cover file d'un projet à partir de l'id musique
     * @param int $id_music
     * @return Response
     */
    public function getCoverFileProject(int $id_music): Response
    {
        $service = new MusicService();
        $cover_path = $service->getCoverFileProject($id_music);

        return new Response(SerializerUtils::get()->serialize(['cover_path' => $cover_path], "json"));
    }
}