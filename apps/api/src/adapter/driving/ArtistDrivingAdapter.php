<?php

namespace Api\Adapter;

use Api\Adapter\DTO\ArtistPageDTO;
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
    public function ArtistPage(int $idArtist, int $limit): Response {
        
        $service = new ArtistService();
    
        $data = $service->artistPage($idArtist, $limit);

        $artistPageDTO = new ArtistPageDTO($data[0]->getId(), $data[0]->getName(), $data[0]->getIsVerified(), $data[0]->getDescription(), $data[0]->getImagePath(), $data[1], $data[2], $data[3]);

        return new Response(SerializerUtils::get()->serialize(['artist' => $artistPageDTO], "json"), 200);
    }
}