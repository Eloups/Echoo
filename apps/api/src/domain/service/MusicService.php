<?php

namespace Api\Domain\Service;

use Api\Domain\Ports\MusicServiceInterface;
use Symfony\Component\HttpFoundation\Response;

/**
 * Classe de service des musiques
 */
class MusicService implements MusicServiceInterface {
    /**
     * Action du listage des musiques
     * @return Response
     */
    public function listMusics(): Response {
        return new Response(json_encode(['code' => 200, 'message' => 'Réussi']), 200);
    }
}