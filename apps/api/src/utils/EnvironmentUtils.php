<?php 

namespace Api\Utils;

use Exception;

class EnvironmentUtils {
    public static function checkEnvironment($environment): string {
        if (!isset($environment)) {
            throw new Exception("Mauvaises définitions des variables d'environnements");
        }
        return $environment;
    }
}