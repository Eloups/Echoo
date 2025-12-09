<?php

namespace Api\Adapter;

use Api\Domain\Ports\FilesDrivenAdapterInterface;
use Api\Exception\ApiCustomException;
use Api\Utils\EnvironmentUtils;
use Exception;
use Symfony\Component\HttpFoundation\Response;

/**
 * Adaptateur piloté des fichiers
 */
class FilesDrivenAdapter implements FilesDrivenAdapterInterface
{
    /**
     * Méthode pour récupérer un fichier image
     * @param string $fileName
     * @return Response
     */
    public function getImageFile(string $fileName): Response
    {
        $fsHost = EnvironmentUtils::checkEnvironment($_ENV['FS_HOST']);
        $fsPort = EnvironmentUtils::checkEnvironment($_ENV['FS_PORT']);

        if (!strpos($fileName, '.')) {
            throw new ApiCustomException('Wrong file name, extention file missing', 422);
        }

        $fileUrl = $fsHost . ':' . $fsPort . '/images/' . $fileName;

        [, $fileExtention] = explode('.', $fileName);
        if ($fileExtention !== 'png' && $fileExtention !== 'jpg' && $fileExtention !== 'jpeg' && $fileExtention !== 'webp' && $fileExtention !== 'gif') {
            throw new ApiCustomException('Wrong file extention, only flac or mp3 are supported', 422);
        }

        $ch = curl_init($fileUrl);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HEADER, true);

        $curlResponse = curl_exec($ch);

        $httpStatus = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $headerSize = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
        $contentType = curl_getinfo($ch, CURLINFO_CONTENT_TYPE);
        $error = curl_error($ch);

        curl_close($ch);

        if ($httpStatus === 404) {
            throw new ApiCustomException('File not found', 404);
        }

        if ($httpStatus !== 200 || $error) {
            throw new Exception($httpStatus . " - Error: " . $error);
        }

        $response = new Response(substr($curlResponse, $headerSize));
        $response->headers->set('Content-Type', $contentType);

        return $response;
    }
}