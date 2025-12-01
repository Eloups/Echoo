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
    private ?string $imagePath = null;
    private int $nbLikes;
    private array $popularMusics = [];
    private array $lastReleases = [];

    public function __construct(int $id, string $name, bool $isVerified, ?string $description, ?string $image_path, int $nb_likes, array $popular_musics, array $last_releases) {
        $this->id = $id;
        $this->name = $name;
        $this->isVerified = $isVerified;
        $this->description = $description;
        $this->imagePath = $image_path;
        $this->nbLikes = $nb_likes;
        $this->popularMusics = $popular_musics;
        $this->lastReleases = $last_releases;
    }

    public function getId(): int {
        return $this->id;
    }

    public function getName(): string {
        return $this->name;
    }

    public function getIsVerified(): bool {
        return $this->isVerified;
    }

    public function getDescription(): ?string {
        return $this->description;
    }

    public function getImagePath(): ?string {
        return $this->imagePath;
    }

    public function getNbLikes(): int {
        return $this->nbLikes;
    }

    public function getPopularMusics(): array {
        return $this->popularMusics;
    }

    public function getLastReleases(): array {
        return $this->lastReleases;
    }
}