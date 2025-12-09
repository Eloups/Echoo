<?php

namespace Api\Domain\Service;

use Api\Adapter\ArtistDrivenAdapter;
use Api\Domain\Class\Artist;
use Api\Domain\Ports\ArtistServiceInterface;
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
    public function artistPage(int $idArtist, int $limit): array {
        $driven = new ArtistDrivenAdapter();

        $artist = $driven->getArtist($idArtist);
        $likes = $driven->getLikesArtist($idArtist);
        $popularMusics = $driven->getPopularMusicsByArtist($idArtist, $limit);
        $lastReleases = $driven->getLastReleaseByArtist($idArtist, $limit);

        return [$artist, $likes, $popularMusics, $lastReleases];
    }

    /**
     * Action de l'ajout d'un like à un artiste
     * @param int $id_user
     * @param int $id_artist
     * @return void
     */
    public function likeArtist(int $id_user, int $id_artist): void {
        $driven = new ArtistDrivenAdapter();
        $driven->addLike($id_user, $id_artist);
    }

    /**
     * Action de la récupération des artistes de la library
     * @param int $id_library
     * @throws Exception
     * @return never
     */
    public function getArtistsInLibrary(int $id_library): array
    {
        $driven = new ArtistDrivenAdapter();
        $artists = $driven->getArtistsInLibrary($id_library);
        foreach($artists as $artist) {
            if (!$artist instanceof Artist) {
                throw new Exception("Les données ne sont pas du type Artist");
            }
        }

        return $artists;
    }
}