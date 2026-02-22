<?php

namespace Api\Domain\Class;

use DateTime;

/**
 * Classe pour les projets de musiques (ex : albums)
 */
class Project
{
    /**
     * Id du projet de musique
     * @var ?int
     */
    private ?int $id;
    /**
     * Titre du projet de musique
     * @var string
     */
    private string $title;
    /**
     * Date de sortie du projet de musique
     * @var DateTime
     */
    private DateTime $release;
    /**
     * Chemin du fichier de la cover du projet de musique
     * @var string
     */
    private string $cover_path;
    /**
     * Type du projet de musique
     * @var string
     */
    private string $projectType;
    /**
     * Liste des musiques du projet
     * @var Music[]
     */
    private array $musics = [];
    /**
     * Couleur principale du projet
     * @var string
     */
    private string $color1;
    /**
     * couleur secondaire du projet
     * @var string
     */
    private string $color2;
    /**
     * Liste des notes du projet
     * @var ?Rating[]
     */
    private ?array $rates;

    /**
     * Moyenne des notes du projet
     * @var float
     */
    private ?float $avgRate;

    /**
     * artiste du projet
     * @var ?string
     */
    private ?string $artistName;

    /**
     * Constructeur du projet de musique
     * @param ?int $id
     * @param string $title
     * @param DateTime $release
     * @param string $cover_path
     * @param string $projectType
     * @param Music[] $musics
     * @param string $color1
     * @param string $color2
     * @param ?Rating[] $rates
     * @param ?float $avgRate
     */
    public function __construct(?int $id, string $title, DateTime $release, string $cover_path, string $projectType, array $musics, string $color1, string $color2, ?array $rates, ?float $avgRate, ?string $artistName = null)
    {
        $this->id = $id;
        $this->title = $title;
        $this->release = $release;
        $this->cover_path = $cover_path;
        $this->projectType = $projectType;
        $this->musics = $musics;
        $this->color1 = $color1;
        $this->color2 = $color2;
        $this->rates = $rates;
        $this->avgRate = $avgRate;
        $this->artistName = $artistName;
    }

    /**
     * Accesseur de l'id du projet de musique
     * @return int|null
     */
    public function getId(): ?int
    {
        return $this->id;
    }
    /**
     * Accesseur du titre du projet de musique
     * @return string
     */
    public function getTitle(): string
    {
        return $this->title;
    }
    /**
     * Accesseur de la date de sortie du projet de musique
     * @return DateTime
     */
    public function getRelease(): DateTime
    {
        return $this->release;
    }
    /**
     * Accesseur du chemin du fichier de la cover du projet de musique
     * @return string
     */
    public function getCoverPath(): string
    {
        return $this->cover_path;
    }
    /**
     * Accesseur du type de projet de musique
     * @return string
     */
    public function getProjectType(): string
    {
        return $this->projectType;
    }
    /**
     * Accesseur de la liste de musique du projet
     * @return Music[]
     */
    public function getMusics(): array
    {
        return $this->musics;
    }
    /**
     * Accesseur de la couleur principale du projet
     * @return string
     */
    public function getColor1(): string
    {
        return $this->color1;
    }
    /**
     * Accesseur de la couleur secondaire du projet
     * @return string
     */
    public function getColor2(): string
    {
        return $this->color2;
    }
    /**
     * Accesseur des notes du projet
     * @return ?Rating[]
     */
    public function getRates(): ?array
    {
        return $this->rates;
    }

    /**
     * Accesseur des notes du projet
     * @return ?float
     */
    public function getAvgRate(): ?float
    {
        return $this->avgRate;
    }

    /**
     * Accesseur de l'artiste du projet
     * @return ?string
     */
    public function getArtistName(): ?string
    {
        return $this->artistName;
    }
}