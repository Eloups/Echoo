<?php

namespace Api\Adapter;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

/**
 * Classe pour l'adaptateur des musiques
 */
class MusicDrivingAdapter {
    /**
     * Récupération des données de la requête "liste des musiques" puis utilisation du bon service
     * @param Request $request
     * @return Response
     */
    public function listMusics(Request $request): Response {
        return new Response(json_encode(['code' => 200, 'message' => 'Réussi']), 200);
    }
}