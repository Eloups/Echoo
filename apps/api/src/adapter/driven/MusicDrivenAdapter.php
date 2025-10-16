<?php

namespace Api\Adapter;

use Api\Domain\Class\Music;
use Api\Domain\Ports\MusicDrivenAdapterInterface;
use DateTime;

/**
 * Classe Driven Adapter pour les musiques
 */
class MusicDrivenAdapter implements MusicDrivenAdapterInterface {
    /**
     * Méthode pour récupérer la liste des musiques
     * @return Music[]
     */
    public function getMusicList(): array {
        // On appelle PDO pour se connecter à la base et récupérer les musiques
        // données de test pour l'instant
        $musics = [new Music(1, "title", 120, new DateTime("2025-10-02 12:45:30"), "file_path", [], 2000, [])];
         return $musics;
    }
}