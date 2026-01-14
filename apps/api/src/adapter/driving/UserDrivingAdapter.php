<?php

namespace Api\Adapter;

use Api\Domain\Class\Library;
use Api\Domain\Class\User;
use Api\Domain\Class\UserRole;
use Api\Domain\Service\UserService;
use Api\Utils\SerializerUtils;
use Api\Utils\VerifyUtils;
use DateTime;
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

    /**
     * Méthode pour récupérer les musiques les plus écoutées par un utilisateur ce mois
     * @param int $userId
     * @param int $limit
     * @return Response
     */
    public function getUserMostListenedMusicsOfTheMonth(int $userId, int $limit): Response
    {
        $service = new UserService();
        $today = new DateTime();

        $musics = $service->getUserMostListenedMusicsOfMonth($userId, $limit, $today);

        return new Response(SerializerUtils::get()->serialize(['musics' => $musics], "json"));
    }

    /**
     * Méthode pour créer un utilisateur
     * @param string $requestContent
     * @return Response
     */
    public function createUser(string $requestContent): Response
    {
        $requestData = VerifyUtils::verifyJsonRequestBody($requestContent, ['id', 'username', 'email', 'password', 'image_path', 'id_role']);

        $service = new UserService();
        $service->createUser(new User(
            $requestData['id'],
            $requestData['username'],
            $requestData['email'],
            $requestData['password'],
            $requestData['image_path'],
            new Library($requestData['id'], [], [], []),
            new UserRole(1, 'User'),
            [],
            [],
            [],
            null
        ));

        return new Response(json_encode(['code' => 201, 'message' => 'User created']), 201);
    }

    /**
     * Function to gat all users
     * @return Response
     */
    public function getAllUsers(): Response
    {
        $service = new UserService();

        $users = $service->getAllUsers();

        return new Response(SerializerUtils::get()->serialize(['users' => $users], "json"));
    }

    /**
     * Function to get one user
     * @param int $userId
     * @return Response
     */
    public function getOneUser(int $userId): Response
    {
        $service = new UserService();

        $user = $service->getOneUser($userId);

        return new Response(SerializerUtils::get()->serialize(['user' => $user], "json"));
    }

    /**
     * Méthode de mise à jour d'un utilisateur
     * @param int $userId
     * @param string $requestContent
     * @return Response
     */
    public function updateUser(int $userId, string $requestContent): Response
    {
        $requestData = VerifyUtils::verifyJsonRequestBody($requestContent, ['username', 'email', 'image_path', 'id_role']);

        $service = new UserService();
        $service->updateUser(new User(
            $userId,
            $requestData['username'],
            $requestData['email'],
            '',
            $requestData['image_path'],
            new Library($userId, [], [], []),
            new UserRole($requestData['id_role'], ''),
            null,
            null,
            null,
            null
        ));

        return new Response(json_encode(['code' => 200, 'message' => 'User updated']));
    }
}