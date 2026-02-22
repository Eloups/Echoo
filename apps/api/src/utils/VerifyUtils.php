<?php

namespace Api\Utils;

use Api\Exception\ApiCustomException;
use Exception;

/**
 * Liste des foncitons utilitaires de vérification
 */
class VerifyUtils
{
    /**
     * Function pour vérifier le corps JSON de requête
     * @param string $requestBody
     * @param array $requiredKeys
     * @return array
     */
    public static function verifyJsonRequestBody(string $requestBody, array $requiredKeys): array
    {
        // Vérification du JSON
        if (!json_validate($requestBody)) {
            throw new ApiCustomException("Le json n'est pas valide", 422);
        }
        $body = json_decode($requestBody, true);

        // Vérification des clés obligatoires
        foreach ($requiredKeys as $key) {
            if (!array_key_exists($key, $body)) {
                throw new ApiCustomException("Le body doit contenir la clé '$key'.", 422);
            }
        }

        return $body;
    }
}