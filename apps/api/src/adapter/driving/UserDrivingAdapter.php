<?php

namespace Api\Adapter;

use Api\Domain\Service\UserService;
use Api\Utils\SerializerUtils;
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
}