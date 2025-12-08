<?php

namespace Api\Adapter;

use Api\Adapter\DTO\ArtistPageDTO;
use Api\Domain\Service\ArtistService;
use Api\Utils\SerializerUtils;
use Exception;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;


/**
 * Classe pour l'adaptateur des artistes
 */
class ArtistDrivingAdapter {
    /**
     * Récupération des données de la requête puis lancement du service des artistes avec la bonne fonction
     * @param Request $request
     * @return Response
     */
    public function ArtistPage(int $idArtist, int $limit): Response {
        
        $service = new ArtistService();
    
        [$artist, $likes, $popularMusics, $lastReleases] = $service->artistPage($idArtist, $limit);

        $artistPageDTO = new ArtistPageDTO($artist->getId(), $artist->getName(), $artist->getIsVerified(), $artist->getDescription(), $artist->getImagePath(), $likes, $popularMusics, $lastReleases);

        return new Response(SerializerUtils::get()->serialize(['artist' => $artistPageDTO], "json"), 200);
    }

    /**
     * Récupération des données de la requête puis lancement du service des projets pour ajouter un like à un projet
     * @param string $requestBody
     * @return Response
     */
    public function likeArtist(string $requestBody): Response {
        // Vérification du JSON
        if (!json_validate($requestBody)) {
            return new Response(json_encode(['code' => 422, 'message' => "Le json n'est pas valide"]));
        }
        $body = json_decode($requestBody, true);

        if (!is_array($body)) {
            throw new Exception("Le body doit être un JSON valide.");
        }

        // Vérification des clés obligatoires
        $requiredKeys = ['id_user', 'id_artist'];
        foreach ($requiredKeys as $key) {
            if (!array_key_exists($key, $body)) {
                throw new Exception("Le body doit contenir la clé '$key'.");
            }
        }

        // Vérification des types
        if (!is_int($body['id_user']) || !is_int($body['id_artist'])) {
            throw new Exception("Les champs 'id_user' et 'id_artist' doivent être des entiers.");
        }
        $service = new ArtistService();
        $service->likeArtist($body['id_user'], $body['id_artist']);
        return new Response(json_encode(['code' => 200, 'message' => 'Like ajouté avec succès']));
    }
}