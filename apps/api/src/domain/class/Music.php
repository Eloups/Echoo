<?php

/**
 * Classe des musiques
 */
class Music {
    /**
     * Id de la musique
     * @var ?int
     */
    private ?int $id;
    /**
     * Titre de la musique
     * @var string
     */
    private string $title;
    /**
     * Durée de la musique
     * @var int
     */
    private int $duration;
    /**
     * Date de sortie de la musique
     * @var DateTime
     */
    private DateTime $release;
    /**
     * Chemin du fichier de la musique
     * @var string
     */
    private string $file_path;
    /**
     * Genre de la musique
     * @var Genre
     */
    private Genre $gender;
    /**
     * Nombre de streams total de la musique
     * @var int
     */
    private int $nbStreams;
    /**
     * Liste des notes de la musique
     * @var Rating[]
     */
    private array $rates = [];
    /**
     * Projet de la musique
     * @var Project
     */
    private Project $project;

    /**
     * Constructeur de la musique
     * @param ?int $id
     * @param string $title
     * @param int $duration
     * @param DateTime $release
     * @param string $file_path
     * @param Genre $gender
     * @param int $nbStreams
     * @param Rating[] $rates
     * @param Project $project
     */
    public function __construct(?int $id, string $title, int $duration, DateTime $release, string $file_path, Genre $gender, int $nbStreams, array $rates, Project $project) {
        $this->id = $id;
        $this->title = $title;
        $this->duration = $duration;
        $this->release = $release;
        $this->file_path = $file_path;
        $this->gender = $gender;
        $this->nbStreams = $nbStreams;
        $this->rates = $rates;
        $this->project = $project;
    }

    /**
     * Accesseur de l'id de la musique
     * @return ?int
     */
    public function getId(): ?int {
        return $this->id;
    }
    /**
     * Accesseur du titre de la musique
     * @return string
     */
    public function getTitle(): string {
        return $this->title;
    }
    /**
     * Accesseur de la durée de la musique
     * @return int
     */
    public function getDuration(): int {
        return $this->duration;
    }
    /**
     * Accesseur de la date de sortie de la musique
     * @return DateTime
     */
    public function getRelease(): DateTime {
        return $this->release;
    }
    /**
     * Accesseur du chemin du fichier de la musique
     * @return string
     */
    public function getFilePath(): string {
        return $this->file_path;
    }
    /**
     * Accesseur du genre de la musique
     * @return Genre
     */
    public function getGender(): Genre {
        return $this->gender;
    }
    /**
     * Accesseur du nombre de streams de la musique
     * @return int
     */
    public function getNbStreams(): int {
        return $this->nbStreams;
    }
    /**
     * Accesseur des notes de la musique
     * @return Rating[]
     */
    public function getRates(): array {
        return $this->rates;
    }
    /**
     * Accesseur du projet de la musique
     * @return Project
     */
    public function getProject(): Project {
        return $this->project;
    }
}