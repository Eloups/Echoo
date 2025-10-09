<?php

use Api\Controller\MusicController;
use PHPUnit\Framework\TestCase;
use Symfony\Component\HttpFoundation\Response;

/**
 * Tests des contrôleurs de l'API
 */
class ControllerTest extends TestCase
{
    public function test_music_controller(): void
    {
        $musicController = new MusicController('list');

        $this->assertEquals('list', $musicController->getAction());
        $this->assertEquals(new Response(json_encode(['code' => 200, 'message' => 'Réussi']), 200), $musicController->run());
    }
}