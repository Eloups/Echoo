<?php

use Api\Utils\EnvironmentUtils;
use PHPUnit\Framework\TestCase;

Class EnvironnementUtilsTest extends TestCase {

    /**
     * Test de la fonction checkEnvironnement
     * @return void
     */
    public function testCheckEnvironment(): void
    {
        $env = 'production';
        $result = EnvironmentUtils::checkEnvironment($env);
        $this->assertEquals('production', $result);
    }

    public function testCheckEnvironmentThrowsException(): void
    {
        $this->expectException(Exception::class);
        $this->expectExceptionMessage("Mauvaises définitions des variables d'environnements");

        EnvironmentUtils::checkEnvironment(null);
    }
}