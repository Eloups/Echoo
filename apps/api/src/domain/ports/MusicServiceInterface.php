<?php

namespace Api\Domain\Ports;

/**
 * Interface du service de musique
 */
interface MusicServiceInterface
{
    /**
     * Action du listage des musiques
     * @param int $idArtist
     * @return array
     */
    public function listMusics(int $idArtist): array;

    /**
     * Action de l'ajout d'un like sur une musique par un utilisateur
     * @param string $id_user
     * @param int $id_music
     * @return void
     */
    public function likeMusic(string $id_user, int $id_music): void;

    /**
     * Récupération des notes d'une musique
     * @param int $musicId
     * @param int $limit
     * @return array
     */
    public function getMusicsRatings(int $musicId, int $limit): array;

    /**
     * Action de la récupération du cover file d'un projet à partir de l'id d'une musique
     * @param int $id_music
     * @return string
     */
    public function getCoverFileProject(int $id_music): string;

    /**
     * Action de la vérification si une musique est likée par un utilisateur
     * @param string $id_user
     * @param int $id_music
     * @return bool
     */
    public function getIsMusicLikeByUser(string $id_user, int $id_music): bool;

    /**
     * Action de la récupération des colors d'un projet à partir de l'id d'une musique
     * @param int $id_music
     * @return array
     */
    public function getColorsProject(int $id_music): array;
}