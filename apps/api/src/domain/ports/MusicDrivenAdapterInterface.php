<?php 

namespace Api\Domain\Ports;

/**
 * Interface pour le MusicDrivenAdapter
 */
interface MusicDrivenAdapterInterface {
    /**
     * Méthode pour récupérer la liste des musiques
     * @return void
     */
    public function getMusicList(): array;
}