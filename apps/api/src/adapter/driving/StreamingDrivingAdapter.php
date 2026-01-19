<?php

namespace Api\Adapter;

use Api\Domain\Service\StreamingService;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\StreamedResponse;

/**
 * Adaptateur pilote du service de streaming
 */
class StreamingDrivingAdapter
{
    /**
     * Fonction pour récupérer un fichier de musique en streaming
     * @param string $fileName
     * @param ?string $range Partie du fichier que l'on veut streamer
     * @return Response
     */
    public function getMusicFile(string $fileName, ?string $range): StreamedResponse
    {
        $service = new StreamingService();
        return $service->getMusicFile($fileName, $range);
    }
}