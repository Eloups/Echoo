<?php

namespace Api\Domain\Service;

use Api\Adapter\ArtistDrivenAdapter;
use Api\Domain\Ports\ArtistServiceInterface;
use Api\Adapter\DTO\ArtistPageDTO;
use Exception;
use Symfony\Component\HttpFoundation\Response;

/**
 * Classe de service des artistes
 */
class ArtistService implements ArtistServiceInterface {
    /**
     * Action des données de la page artiste
     * @return Response
     */
    public function artistPage(int $idArtist, int $limit): ArtistPageDTO {
        $driven = new ArtistDrivenAdapter();

        $artist = $driven->getArtistPage($idArtist, $limit);
            if (!$artist instanceof ArtistPageDTO) {
                throw new Exception("Les données ne sont pas du type ArtistDTO");
            }
        return $artist;
    }
}