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

    /**
     * Méthode pour ajouter un like à une musique par un utilisateur
     * @param int $id_user
     * @param int $id_music
     * @return void
     */
    public function addLike(int $id_user, int $id_music): void;
}