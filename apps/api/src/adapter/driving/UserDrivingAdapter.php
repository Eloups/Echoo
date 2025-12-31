<?php

namespace Api\Adapter;

use Api\Domain\Service\UserService;
use Api\Utils\SerializerUtils;
use Api\Utils\VerifyUtils;
use Exception;
use Symfony\Component\HttpFoundation\Response;

/**
 * Adaptateur pilote des actions sur les utilisateurs
 */
class UserDrivingAdapter
{
    /**
     * Méthode pour récupérer les écoutes les plus récentes d'un utilisateur
     * @param int $limit limite de musqiues à récupérer
     * @return Response
     */
    public function getUserListenedMusics(int $userId, int $limit): Response
    {
        $service = new UserService();
        $musics = $service->getLastUserListenedMusics($userId, $limit);

        return new Response(SerializerUtils::get()->serialize(['musics' => $musics], "json"));

    }

    /**
     * Méthode pour ajouter une écoute de musique à un utilisateur
     * @param string $requestBody
     * @return Response
     */
    public function addUserListenedMusic(string $requestBody): Response
    {
        $bodyData = VerifyUtils::verifyJsonRequestBody($requestBody, ['id_user', 'id_music']);

        $service = new UserService();

        $service->addUserListenedMusic($bodyData['id_user'], $bodyData['id_music']);

        return new Response(json_encode(['code' => 201, 'message' => 'Musique ajoutée aux musiques écoutées']), 201);
    }

    /**
     * Méthode pour récupérer les dernères sorties des artistes suivis par un utilisateur
     * @param int $userId
     * @param int $limit
     * @return Response
     */
    public function getUserArtistsLastsReleases(int $userId, int $limit): Response
    {
        $service = new UserService();
        $projects = $service->getUserArtistsLastsReleases($userId, $limit);

        return new Response(SerializerUtils::get()->serialize(['projects' => $projects], "json"));
    }
}