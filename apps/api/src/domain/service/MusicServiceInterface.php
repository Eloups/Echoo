<?php

namespace Api\Domain\Service;

use Symfony\Component\HttpFoundation\Response;

/**
 * Interface du service de musique
 */
interface MusicServiceInterface {
    /**
     * Action du listage des musiques
     * @return Response
     */
    public function listMusics(): Response;
}