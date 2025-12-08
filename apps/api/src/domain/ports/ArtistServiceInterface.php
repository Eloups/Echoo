<?php

namespace Api\Domain\Ports;

/**
 * Interface du service des artistes
 */
interface ArtistServiceInterface {
    /**
     * Action du listage de la page artiste
     * @param int $idArtist
     * @return array
     */
    public function artistPage(int $idArtist, int $limit): array;

    /**
     * Action de l'ajout d'un like à un artiste
     * @param int $id_user
     * @param int $id_artist
     * @return void
     */
    public function likeArtist(int $id_user, int $id_artist): void;
}