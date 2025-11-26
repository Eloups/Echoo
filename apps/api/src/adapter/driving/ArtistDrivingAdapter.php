<?php

namespace Api\Adapter;

use Api\Domain\Service\ArtistService;
use Api\Utils\SerializerUtils;
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
    public function ArtistPage(int $idArtist): Response {
        
        $service = new ArtistService();
    
        $artist = $service->artistPage($idArtist);

        return new Response(SerializerUtils::get()->serialize(['artist' => $artist], "json"), 200);
    }
}