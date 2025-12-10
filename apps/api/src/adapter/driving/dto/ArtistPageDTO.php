<?php

namespace Api\Adapter\DTO;

use Api\Domain\Class\Music;

/**
 * Classe pour créer un objet DTO de la page artiste
 */
class ArtistPageDTO {

    /**
     * Id de ArtistPageDTO
     * @var int
     */
    private int $id;

    /**
     * Name de ArtistPageDTO
     * @var string
     */
    private string $name;

    /**
     * Booléen de vérification de ArtistPageDTO
     * @var bool
     */
    private bool $isVerified;

    /**
     * Description de ArtistPageDTO
     * @var ?string
     */
    private ?string $description = null;

    /**
     * Chemin du fichier de l'image de ArtistPageDTO
     * @var ?string
     */
    private ?string $imagePath = null;

    /**
     * Nombre de likes de ArtistPageDTO
     * @var int
     */
    private int $nbLikes;

    /**
     * Musiques populaires de ArtistPageDTO
     * @var Music[]
     */
    private array $popularMusics = [];

    /**
     * Dernières musiques publiées de ArtistPageDTO
     * @var Music[]
     */
    private array $lastReleases = [];

    /**
     * Constructeur de la classe ArtistPageDTO
     * @param int $id
     * @param string $name
     * @param bool $isVerified
     * @param ?string $description
     * @param ?string $image_path
     * @param int $nb_likes
     * @param Music[] $popular_musics
     * @param Music[] $last_releases
     */
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

    /**
     * Accesseur de l'id de ArtistPageDTO
     * @return int
     */
    public function getId(): int {
        return $this->id;
    }

    /**
     * Accesseur du nom de ArtistPageDTO
     * @return string
     */
    public function getName(): string {
        return $this->name;
    }

    /**
     * Accesseur de la vérification de ArtistPageDTO
     * @return bool
     */
    public function getIsVerified(): bool {
        return $this->isVerified;
    }

    /**
     * Accesseur de la description de ArtistPageDTO
     * @return string|null
     */
    public function getDescription(): ?string {
        return $this->description;
    }

    /**
     * Accesseur de l'image path de ArtistPageDTO
     * @return string|null
     */
    public function getImagePath(): ?string {
        return $this->imagePath;
    }

    /**
     * Accesseur du nombre de likes de ArtistPageDTO
     * @return int
     */
    public function getNbLikes(): int {
        return $this->nbLikes;
    }

    /**
     * Accesseur du tableau des musiques populaires de ArtistPageDTO
     * @return array
     */
    public function getPopularMusics(): array {
        return $this->popularMusics;
    }

    /**
     * Accesseur du tableau des dernières musiques publiées de ArtistPageDTO
     * @return array
     */
    public function getLastReleases(): array {
        return $this->lastReleases;
    }
}