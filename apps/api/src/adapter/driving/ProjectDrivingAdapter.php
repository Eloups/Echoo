<?php

namespace Api\Adapter;

use Api\Domain\Service\ProjectService;
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

        if (!is_array($body)) {
            throw new Exception("Le body doit être un JSON valide.");
        }

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
}