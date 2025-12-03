<?php

namespace Api\Adapter;

use Api\Domain\Ports\StreamingDrivenAdapterInterface;
use Api\Exception\ApiCustomException;
use Api\Utils\EnvironmentUtils;
use Exception;
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

        if (!strpos($fileName, '.')) {
            throw new ApiCustomException('Wrong file name, extention file missing', 422);
        }

        [, $fileExtention] = explode('.', $fileName);
        if ($fileExtention !== 'flac' && $fileExtention !== 'mp3') {
            throw new ApiCustomException('Wrong file extention, only flac or mp3 or supported', 422);
        }

        $ch = curl_init($fileUrl);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
        curl_setopt($ch, CURLOPT_HEADER, true);
        curl_setopt($ch, CURLOPT_NOBODY, false);

        $httpStatus = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $contentType = curl_getinfo($ch, CURLINFO_CONTENT_TYPE);
        $error = curl_error($ch);

        error_log("HTTP Status: " . $httpStatus);
        error_log("Content-Type: " . $contentType);
        error_log("Error: " . $error);

        if ($httpStatus === 404) {
            throw new ApiCustomException('File not found', 404);
        }

        if ($httpStatus !== 0 || $error) {
            throw new Exception($httpStatus . " - Error: " . $error);
        }

        curl_setopt($ch, CURLOPT_RETURNTRANSFER, false);
        curl_setopt($ch, CURLOPT_HEADER, false);

        $response = new StreamedResponse(function () use ($ch) {
            curl_exec($ch);
            curl_close($ch);
        });

        if ($fileExtention === 'flac') {
            $response->headers->set('Content-Type', 'audio/flac');
        } else {
            $response->headers->set('Content-Type', 'audio/mp3');
        }
        $response->headers->set('Content-Disposition', 'inline; filename="' . $fileName . '"');
        return $response;
    }
}