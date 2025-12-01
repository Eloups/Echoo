<?php

namespace Api\Adapter\DTO;

/**
 * Classe pour créer un objet DTO de la page artiste
 */
class ArtistPageDTO {
    private int $id;
    private string $name;
    private bool $isVerified;
    private ?string $description = null;
    private ?string $image_path = null;
    private int $nb_likes;
    private array $popular_musics = [];
    private array $last_releases = [];

    public function __construct(int $id, string $name, bool $isVerified, ?string $description, ?string $image_path, int $nb_likes, array $popular_musics, array $last_releases) {
        $this->id = $id;
        $this->name = $name;
        $this->isVerified = $isVerified;
        $this->description = $description;
        $this->image_path = $image_path;
        $this->nb_likes = $nb_likes;
        $this->popular_musics = $popular_musics;
        $this->last_releases = $last_releases;
    }
}