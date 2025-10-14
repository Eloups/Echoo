<?php

use Api\Controller\MusicController;
use PHPUnit\Framework\TestCase;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;


/**
 * Tests des contrôleurs de l'API
 */
class ControllerTest extends TestCase
{
    /**
     * Test du contrôleur de musiques
     * @return void
     */
    public function test_music_controller(): void
    {
        $request = Request::create('/test', 'GET');
        // Création du contrôleur de musiques
        $musicController = new MusicController('list');

        // Tests du contrôleur de musiques
        $this->assertEquals('list', $musicController->getAction());
        $this->assertEquals(new Response(json_encode(['code' => 200, 'message' => 'Réussi']), 200), $musicController->run($request));
    }
}