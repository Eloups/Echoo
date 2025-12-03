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
    
        [$artist, $likes, $popularMusics, $lastReleases] = $service->artistPage($idArtist, $limit);

        $artistPageDTO = new ArtistPageDTO($artist->getId(), $artist->getName(), $artist->getIsVerified(), $artist->getDescription(), $artist->getImagePath(), $likes, $popularMusics, $lastReleases);

        return new Response(SerializerUtils::get()->serialize(['artist' => $artistPageDTO], "json"), 200);
    }
}