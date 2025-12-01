<?php

namespace Api\Adapter;

use Api\Domain\Service\StreamingService;
use Symfony\Component\HttpFoundation\Response;

/**
 * Adaptateur pilote du service de streaming
 */
class StreamingDrivingAdapter
{
    /**
     * Fonction pour récupérer un fichier de musique en streaming
     * @param string $fileName
     * @return Response
     */
    public function getMusicFile(string $fileName): Response
    {
        $service = new StreamingService();
        $service->getMusicFile($fileName);

        return new Response();
    }
}