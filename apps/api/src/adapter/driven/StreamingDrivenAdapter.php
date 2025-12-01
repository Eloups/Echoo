<?php

namespace Api\Adapter;

use Api\Domain\Ports\StreamingDrivenAdapterInterface;
use Api\Utils\EnvironmentUtils;
use Symfony\Component\HttpFoundation\Response;

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
    public function streamMusicFile(string $fileName)
    {
        $fsHost = EnvironmentUtils::checkEnvironment($_ENV['FS_HOST']);
        $fsPort = EnvironmentUtils::checkEnvironment($_ENV['FS_PORT']);

        $ch = curl_init($fsHost . ':' . $fsPort . '/musics/' . $fileName);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, false);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
        curl_setopt($ch, CURLOPT_HEADER, false);

        // $fileContent = curl_exec($ch);
        // if ($fileContent === false) {
        //     $error = curl_error($ch);
        //     $errno = curl_errno($ch);
        //     echo "cURL Error (#$errno): $error\n";
        // } else {
        //     echo $fileContent . "\n";
        // }

        curl_exec($ch);

        if (curl_errno($ch)) {
            // return new Response("ERROR while getting file"); // TODO throw
        }

        curl_close($ch);

        // TODO set response headers | check if ok de base
    }
}