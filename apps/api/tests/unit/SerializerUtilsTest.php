<?php

use Api\Utils\SerializerUtils;
use PHPUnit\Framework\TestCase;

class SerializerUtilsTest extends TestCase
{
    /**
     * Test de la classe SerializeUtils pour serialiser les objets en json
     * @return void
     */
    public function testSerializerUtilsGet(): void
    {
        // Créons un objet simple à sérialiser
        $obj = new class {
            public string $name = 'John Doe';
            public int $age = 30;
        };

        // Sérialisation
        $json = SerializerUtils::get()->serialize($obj, 'json');

        // Vérification que le JSON contient les bonnes propriétés
        $this->assertJson($json);
        $this->assertStringContainsString('"name":"John Doe"', $json);
        $this->assertStringContainsString('"age":30', $json);
    }
}
