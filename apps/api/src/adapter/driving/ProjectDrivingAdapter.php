<?php

namespace Api\Adapter;

use Api\Domain\Service\ProjectService;
use Api\Utils\SerializerUtils;
use Exception;
use Symfony\Component\HttpFoundation\Response;


/**
 * Classe pour l'adaptateur des projets
 */
class ProjectDrivingAdapter
{
    /**
     * Récupération des données de la requête puis lancement du service des projets pour ajouter un like à un projet
     * @param string $requestBody
     * @return Response
     */
    public function likeProject(string $requestBody): Response {
        // Vérification du JSON
        if (!json_validate($requestBody)) {
            return new Response(json_encode(['code' => 422, 'message' => "Le json n'est pas valide"]));
        }
        $body = json_decode($requestBody, true);

        // Vérification des clés obligatoires
        $requiredKeys = ['id_user', 'id_project'];
        foreach ($requiredKeys as $key) {
            if (!array_key_exists($key, $body)) {
                throw new Exception("Le body doit contenir la clé '$key'.");
            }
        }

        // Vérification des types
        if (!is_int($body['id_user']) || !is_int($body['id_project'])) {
            throw new Exception("Les champs 'id_user' et 'id_project' doivent être des entiers.");
        }
        $service = new ProjectService();
        $service->likeProject($body['id_user'], $body['id_project']);
        return new Response(json_encode(['code' => 200, 'message' => 'Like ajouté avec succès']));
    }

    /**
     * Méthode pour récupérer les projets d'une library
     * @param int $id_library
     * @return Response
     */
    public function getProjectsInLibrary(int $id_library): Response {
        $service = new ProjectService();
        $projects = $service->getProjectsInLibrary($id_library);

        return new Response(SerializerUtils::get()->serialize(['projects' => $projects], "json"), 200);
    }

    /**
     * Méthode pour récupérer un projet avec ses musiques
     * @param int $id_project
     * @return Response
     */
    public function getOneProject(int $id_project): Response {
        $service = new ProjectService();
        $project = $service->getOneProjectWithMusics($id_project);

        return new Response(SerializerUtils::get()->serialize(['project' => $project], "json"), 200);
    }
}