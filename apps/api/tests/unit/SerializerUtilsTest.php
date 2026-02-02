<?php

use Api\Domain\Class\Music;
use Api\Utils\SerializerUtils;
use PHPUnit\Framework\TestCase;

class SerializerUtilsTest extends TestCase
{
    /**
     * Test de la classe SerializeUtils pour serialiser les objets en json
     * @return void
     */
    public function test_SerializerUtilsGet(): void
    {
        // Créons un objet simple à sérialiser
        $music = new Music(null, "titre", 120, new DateTime(), "file_path", null, 56, null, null);

        // Sérialisation
        $json = SerializerUtils::get()->serialize($music, 'json');

        // Vérification que le JSON contient les bonnes propriétés
        $this->assertJson($json);
        $this->assertStringContainsString('"title":"titre"', $json);
        $this->assertStringContainsString('"duration":120', $json);
        $this->assertStringContainsString('"nbStreams":56', $json);
    }
}
