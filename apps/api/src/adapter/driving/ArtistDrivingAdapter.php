<?php

namespace Api\Adapter;

use Api\Adapter\DTO\ArtistPageDTO;
use Api\Domain\Service\ArtistService;
use Api\Exception\ApiCustomException;
use Api\Utils\SerializerUtils;
use Api\Utils\VerifyUtils;
use DateTime;
use Exception;
use Symfony\Component\HttpFoundation\Response;


/**
 * Classe pour l'adaptateur des artistes
 */
class ArtistDrivingAdapter
{
    /**
     * Récupération des données de la requête puis lancement du service des artistes avec la bonne fonction
     * @param int $idArtist
     * @param int $limit
     * @return Response
     */
    public function ArtistPage(int $idArtist, int $limit): Response
    {

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
    public function likeArtist(string $requestBody): Response
    {
        // Vérification du JSON
        if (!json_validate($requestBody)) {
            return new Response(json_encode(['code' => 422, 'message' => "Le json n'est pas valide"]));
        }
        $body = json_decode($requestBody, true);

        // Vérification des clés obligatoires
        $requiredKeys = ['id_user', 'id_artist'];
        foreach ($requiredKeys as $key) {
            if (!array_key_exists($key, $body)) {
                throw new Exception("Le body doit contenir la clé '$key'.");
            }
        }

        // Vérification des types
        if (!is_string($body['id_user']) || !is_int($body['id_artist'])) {
            throw new Exception("Les champs 'id_user' et 'id_artist' doivent être des entiers.");
        }
        $service = new ArtistService();
        $service->likeArtist($body['id_user'], $body['id_artist']);
        return new Response(json_encode(['code' => 200, 'message' => 'Like ajouté avec succès']));
    }

    /**
     * Méthode pour récupérer les artistes d'une library
     * @param int $id_library
     * @return Response
     */
    public function getArtistsInLibrary(int $id_library): Response
    {
        $service = new ArtistService();
        $artists = $service->getArtistsInLibrary($id_library);

        return new Response(SerializerUtils::get()->serialize(['artists' => $artists], "json"), 200);
    }

    /**
     * Méthode pour récupérer les albums d'un artiste
     * @param int $id_artist
     * @return Response
     */
    public function getArtistAlbums(int $id_artist): Response
    {
        $service = new ArtistService();
        $albums = $service->getArtistAlbums($id_artist);
        return new Response(SerializerUtils::get()->serialize(['albums' => $albums], "json"), 200);
    }

    /**
     * Méthode pour récupérer les singles d'un artiste
     * @param int $id_artist
     * @return Response
     */
    public function getArtistSingles(int $id_artist): Response
    {
        $service = new ArtistService();
        $singles = $service->getArtistSingles($id_artist);
        return new Response(SerializerUtils::get()->serialize(['singles' => $singles], "json"), 200);
    }

    /**
     * Méthode pour récupérer les artistes les plus écoutées du mois
     * @param int $limit
     * @return Response
     */
    public function getMostListenedArtistsOfTheMonth(int $limit): Response
    {
        $service = new ArtistService();
        $today = new DateTime();

        $artists = $service->getMostListenedArtistsOfMonth($today, $limit);

        return new Response(SerializerUtils::get()->serialize(['artists' => $artists], "json"));
    }
    /**
     * search artists, projects and musics
     * @param string $search
     * @param int $limit
     * @throws ApiCustomException
     * @return Response
     */
    public function searchArtists(string $search, int $limit): Response
    {
        if (strlen($search) < 3) {
            throw new ApiCustomException('Search is too short, minimum 3 character required', 400);
        }

        $service = new ArtistService();

        [$artists, $projects, $musics] = $service->searchArtists(strtolower($search), $limit);

        return new Response(SerializerUtils::get()->serialize(['artists' => $artists, 'projects' => $projects, 'musics' => $musics], "json"));
    }

    /**
     * Récupération des données de la requête puis lancement du service des projets pour ajouter un like à un projet
     * @param string $requestBody
     * @return Response
     */
    public function isArtistLiked(string $requestBody): Response
    {
        $body = VerifyUtils::verifyJsonRequestBody($requestBody, ['id_user', 'id_artist']);
        $service = new ArtistService();
        $isLike = $service->isArtistLiked($body['id_user'], $body['id_artist']);
        return new Response(json_encode(['isLike' => $isLike]));
    }
}