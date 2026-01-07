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

        if (!strpos($fileName, '.')) {
            throw new ApiCustomException('Wrong file name, extention file missing', 422);
        }

        $fileUrl = $fsHost . ':' . $fsPort . '/musics/' . $fileName;

        [, $fileExtention] = explode('.', $fileName);
        if ($fileExtention !== 'flac' && $fileExtention !== 'mp3') {
            throw new ApiCustomException('Wrong file extention, only flac or mp3 are supported', 422);
        }

        $ch = curl_init($fileUrl);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HEADER, true);
        curl_setopt($ch, CURLOPT_NOBODY, true);
        curl_exec($ch);

        $httpStatus = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $contentType = curl_getinfo($ch, CURLINFO_CONTENT_TYPE);
        $error = curl_error($ch);

        error_log("HTTP Status: " . $httpStatus);
        error_log("Content-Type: " . $contentType);
        error_log("Error: " . $error);

        if ($httpStatus === 404) {
            throw new ApiCustomException('File not found', 404);
        }

        if ($httpStatus !== 200 || $error) {
            throw new Exception($httpStatus . " - Error: " . $error);
        }

        curl_setopt($ch, CURLOPT_RETURNTRANSFER, false);
        curl_setopt($ch, CURLOPT_HEADER, false);
        curl_setopt($ch, CURLOPT_NOBODY, false);

        // Récupérer la taille du fichier pour le header Content-Length
        $headCh = curl_init($fileUrl);
        curl_setopt($headCh, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($headCh, CURLOPT_HEADER, true);
        curl_setopt($headCh, CURLOPT_NOBODY, true);
        curl_exec($headCh);
        $contentLength = curl_getinfo($headCh, CURLINFO_CONTENT_LENGTH_DOWNLOAD);
        curl_close($headCh);

        $response = new StreamedResponse(function () use ($ch) {
            curl_exec($ch);
            curl_close($ch);
        });

        $response->headers->set('Content-Type', match ($fileExtention) {
            'flac' => 'audio/flac',
            'mp3' => 'audio/mpeg',
        });
        
        // Headers pour le streaming progressif
        if ($contentLength > 0) {
            $response->headers->set('Content-Length', (string)$contentLength);
        }
        $response->headers->set('Accept-Ranges', 'bytes');
        $response->headers->set('Cache-Control', 'public, max-age=3600');

        return $response;
    }
}