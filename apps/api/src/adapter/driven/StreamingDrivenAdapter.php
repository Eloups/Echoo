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
     * @param ?string $range Partie du fichier que l'on veut streamer
     * @return void
     */
    public function streamMusicFile(string $fileName, ?string $range): StreamedResponse
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
        $contentLength = curl_getinfo($ch, CURLINFO_CONTENT_LENGTH_DOWNLOAD);
        $error = curl_error($ch);

        error_log("HTTP Status: " . $httpStatus);
        error_log("Content-Type: " . $contentType);
        error_log("Error: " . $error);
        error_log("Content-Length (cURL): " . $contentLength);


        if ($httpStatus === 404) {
            throw new ApiCustomException('File not found', 404);
        }

        if ($httpStatus !== 200 || $error) {
            throw new Exception($httpStatus . " - Error: " . $error);
        }

        $isPartialContent = false;
        if ($range && preg_match('/bytes=(\d+)-(\d*)/', $range, $matches) && $fileExtention === 'mp3') {
            $start = intval($matches[1]);
            $end = $matches[2] !== '' ? intval($matches[2]) : $contentLength;
            $isPartialContent = true;

            if ($end > $contentLength) {
                throw new ApiCustomException("Wrong Range header: the end of the range is too high -> the maximum for this file is '" . $contentLength . "'", 400);
            }
        }

        curl_setopt($ch, CURLOPT_RETURNTRANSFER, false);
        curl_setopt($ch, CURLOPT_HEADER, false);
        curl_setopt($ch, CURLOPT_NOBODY, false);
        if ($isPartialContent) {
            curl_setopt($ch, CURLOPT_RANGE, "$start-$end");
        }

        $response = new StreamedResponse(function () use ($ch) {
            curl_exec($ch);
            curl_close($ch);
        });

        $response->headers->set('Content-Type', match ($fileExtention) {
            'flac' => 'audio/flac',
            'mp3' => 'audio/mp3',
        });

        $response->headers->set('Accept-Ranges', 'bytes');

        if ($isPartialContent) {
            $response->setStatusCode(206);
            $response->headers->set('Content-Length', (string) ($end - $start + 1));
            $response->headers->set('Content-Range', "bytes $start-$end/$contentLength");
        } else {
            if ($contentLength > 0) {
                $response->headers->set('Content-Length', (string) $contentLength);
            }
        }

        return $response;
    }
}