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

    /**
     * Méthode pour récupérer le cover file d'un projet à partir de l'id d'une musique
     * @param int $id_music
     * @return string
     */
    public function getCoverFileProject(int $id_music): string;
}