<?php

use Symfony\Component\HttpFoundation\Response;

class MusicService implements MusicServiceInterface {
    public function listMusics(): Response {
        return new Response(json_encode(['code' => 200, 'message' => 'Réussi']), 200);
    }
}