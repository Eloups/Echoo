<?php

namespace Api\Adapter;

use Api\Domain\Ports\StreamingDrivenAdapterInterface;
use Api\Utils\EnvironmentUtils;
use Symfony\Component\HttpFoundation\StreamedResponse;

/**
 * Adaptateur piloté du service de streaming
 */
class StreamingDrivenAdapter implements StreamingDrivenAdapterInterface
{
    /**
     * Méthode pour streamer un fichier de musique
     * @param string $fileName
     * @return void
     */
    public function streamMusicFile(string $fileName): StreamedResponse
    {
        $fsHost = EnvironmentUtils::checkEnvironment($_ENV['FS_HOST']);
        $fsPort = EnvironmentUtils::checkEnvironment($_ENV['FS_PORT']);
        $fileUrl = $fsHost . ':' . $fsPort . '/musics/' . $fileName;

        $response = new StreamedResponse(function () use ($fileUrl) {
            $ch = curl_init($fileUrl);
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, false);
            curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
            curl_setopt($ch, CURLOPT_HEADER, false);
            curl_exec($ch);
            curl_close($ch);
        });

        $response->headers->set('Content-Type', 'audio/flac');
        $response->headers->set('Content-Disposition', 'inline; filename="' . $fileName . '"');
        return $response;
    }
}