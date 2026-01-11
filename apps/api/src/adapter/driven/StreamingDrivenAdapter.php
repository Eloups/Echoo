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

        // Vérifier si le fichier existe et récupérer sa taille
        $headCh = curl_init($fileUrl);
        curl_setopt($headCh, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($headCh, CURLOPT_HEADER, true);
        curl_setopt($headCh, CURLOPT_NOBODY, true);
        curl_exec($headCh);
        $httpStatus = curl_getinfo($headCh, CURLINFO_HTTP_CODE);
        $contentLength = curl_getinfo($headCh, CURLINFO_CONTENT_LENGTH_DOWNLOAD);
        curl_close($headCh);

        if ($httpStatus === 404) {
            throw new ApiCustomException('File not found', 404);
        }

        if ($httpStatus !== 200) {
            throw new Exception("HTTP Status: " . $httpStatus);
        }

        // Gérer les requêtes Range pour le seek
        $rangeHeader = $_SERVER['HTTP_RANGE'] ?? null;
        $start = 0;
        $end = $contentLength - 1;
        $isPartialContent = false;

        if ($rangeHeader && preg_match('/bytes=(\d+)-(\d*)/', $rangeHeader, $matches)) {
            $start = intval($matches[1]);
            $end = $matches[2] !== '' ? intval($matches[2]) : $end;
            $isPartialContent = true;
        }

        $length = $end - $start + 1;

        // Préparer cURL pour streamer avec Range
        $ch = curl_init($fileUrl);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, false);
        curl_setopt($ch, CURLOPT_HEADER, false);
        curl_setopt($ch, CURLOPT_NOBODY, false);
        
        // Ajouter le header Range à la requête cURL si nécessaire
        if ($isPartialContent) {
            curl_setopt($ch, CURLOPT_RANGE, "$start-$end");
        }

        $response = new StreamedResponse(function () use ($ch) {
            curl_exec($ch);
            curl_close($ch);
        });

        $response->headers->set('Content-Type', match ($fileExtention) {
            'flac' => 'audio/flac',
            'mp3' => 'audio/mpeg',
        });
        
        // Headers pour le streaming progressif avec support Range
        $response->headers->set('Accept-Ranges', 'bytes');
        $response->headers->set('Cache-Control', 'public, max-age=3600');
        
        if ($isPartialContent) {
            $response->setStatusCode(206); // Partial Content
            $response->headers->set('Content-Length', (string)$length);
            $response->headers->set('Content-Range', "bytes $start-$end/$contentLength");
        } else {
            $response->setStatusCode(200);
            if ($contentLength > 0) {
                $response->headers->set('Content-Length', (string)$contentLength);
            }
        }

        return $response;
    }
}