<?php

namespace Api\Adapter;

use Api\Domain\Service\MusicService;
use Api\Utils\SerializerUtils;
use Exception;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;


/**
 * Classe pour l'adaptateur des musiques
 */
class MusicDrivingAdapter
{
    /**
     * Récupération des données de la requête puis lancement du service des musiques avec la bonne fonction
     * @param Request $request
     * @return Response
     */
    public function listMusics(int $idArtist): Response
    {

        $service = new MusicService();

        $musics = $service->listMusics($idArtist);

        return new Response(SerializerUtils::get()->serialize(['musics' => $musics], "json"), 200);
    }

    public function likeMusic(string $requestBody) {
        $body = json_decode($requestBody, true);

        // Vérification du JSON
        if (!is_array($body)) {
            throw new Exception("Le body doit être un JSON valide.");
        }

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

        return new Response(json_encode(['code' => 200, 'message' => 'Like ajouté avec succès']));
    }
}