<?php

use Symfony\Component\HttpFoundation\Response;

interface MusicServiceInterface {
    public function listMusics(): Response;
}