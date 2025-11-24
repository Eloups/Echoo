<?php 

namespace Api\Domain\Ports;

/**
 * Interface pour le MusicDrivenAdapter
 */
interface MusicDrivenAdapterInterface {
    /**
     * Méthode pour récupérer la liste des musiques
     * @param int $idArtist
     * @return void
     */
    public function getMusicList(int $idArtist): array;
}