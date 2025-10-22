<?php

namespace Api\Adapter;

use Api\Domain\Service\MusicService;
use Api\Utils\SerializerUtils;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;


/**
 * Classe pour l'adaptateur des musiques
 */
class MusicDrivingAdapter {
    /**
     * Récupération des données de la requête puis lancement du service des musiques avec la bonne fonction
     * @param Request $request
     * @return Response
     */
    public function listMusics(Request $request): Response {

        var_dump($request->attributes->get("id"));
        
        $service = new MusicService();
    
        $musics = $service->listMusics();

        return new Response(SerializerUtils::get()->serialize(['musics' => $musics], "json"), 200);
    }
}