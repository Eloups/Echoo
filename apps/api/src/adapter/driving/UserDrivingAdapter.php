<?php

namespace Api\Adapter;

use Api\Domain\Service\UserService;
use Api\Utils\SerializerUtils;
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
        // Vérification du JSON
        if (!json_validate($requestBody)) {
            return new Response(json_encode(['code' => 422, 'message' => "Le json n'est pas valide"]));
        }
        $body = json_decode($requestBody, true);

        // Vérification des clés obligatoires
        $requiredKeys = ['id_user', 'id_artist']; // TODO en faire une fonction
        foreach ($requiredKeys as $key) {
            if (!array_key_exists($key, $body)) {
                throw new Exception("Le body doit contenir la clé '$key'.");
            }
        }
    }
}