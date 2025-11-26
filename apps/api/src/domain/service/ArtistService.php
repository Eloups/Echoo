<?php

namespace Api\Domain\Service;

use Api\Adapter\ArtistDrivenAdapter;
use Api\Domain\Class\Artist;
use Api\Domain\Ports\ArtistServiceInterface;
use DateTime;
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
    public function artistPage(int $idArtist): array {
        $driven = new ArtistDrivenAdapter();

        $artist = $driven->getArtistPage($idArtist);
            if (!$artist[0] instanceof Artist) {
                throw new Exception("Les données ne sont pas du type Artist");
            }
        return $artist;
    }
}