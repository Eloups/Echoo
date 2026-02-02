<?php

use Api\Exception\ApiCustomException;
use Api\Utils\VerifyUtils;
use PHPUnit\Framework\TestCase;

class VerifyUtilsTest extends TestCase {

    /**
     * Test de la fonction de vérification du json avec un body valide
     * @return void
     */
    public function testVerifyJsonRequestBodyValid(): void
    {
        $json = json_encode([
            'username' => 'user1',
            'email' => 'user1@test.com',
        ]);

        $requiredKeys = ['username', 'email'];

        $result = VerifyUtils::verifyJsonRequestBody($json, $requiredKeys);

        $this->assertEquals([
            'username' => 'user1',
            'email' => 'user1@test.com',
        ], $result);
    }

    /**
     * Test de la fonction de vérification du json avec un body malformé
     * @return void
     */
    public function testVerifyJsonRequestBodyInvalidJson(): void
    {
        $invalidJson = '{username:"user1", "email": "user1@test.com"';
        $this->expectException(ApiCustomException::class);
        $this->expectExceptionMessage("Le json n'est pas valide");

        VerifyUtils::verifyJsonRequestBody($invalidJson, ['username', 'email']);
    }

    /**
     * Test de la fonction de vérification du json avec un body dont il manque des champs
     * @return void
     */
    public function testVerifyJsonRequestBodyMissingKey(): void
    {
        $json = json_encode([
            'username' => 'user1',
        ]);

        $this->expectException(ApiCustomException::class);
        $this->expectExceptionMessage("Le body doit contenir la clé 'email'.");

        VerifyUtils::verifyJsonRequestBody($json, ['username', 'email']);
    }
}