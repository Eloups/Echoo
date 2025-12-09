<?php 

namespace Api\Utils;

use Exception;

/**
 * Classe utilitaire pour vérifier la présence des variables d'environnements
 */
class EnvironmentUtils {
    /**
     * Méthode static pour vérifier la présence des variables d'environnements
     * @param string $environment
     * @throws \Exception
     * @return string
     */
    public static function checkEnvironment(string $environment): string {
        if (!isset($environment)) {
            throw new Exception("Mauvaises définitions des variables d'environnements");
        }
        return $environment;
    }
}