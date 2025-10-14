<?php 

use Symfony\Component\HttpFoundation\Response;

interface MusicDrivenAdapterInterface {
    public function getMusicList(): Response;
}