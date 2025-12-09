<?php

namespace Api\Domain\Ports;

/**
 * Interface du service de musique
 */
interface MusicServiceInterface {
    /**
     * Action du listage des musiques
     * @param int $idArtist
     * @return array
     */
    public function listMusics(int $idArtist): array;

    /**
     * Action de l'ajout d'un like sur une musique par un utilisateur
     * @param int $id_user
     * @param int $id_music
     * @return void
     */
    public function likeMusic(int $id_user, int $id_music): void;
}