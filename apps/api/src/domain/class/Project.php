<?php

/**
 * Classe pour les projets de musiques (ex : albums)
 */
class Project {
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
     * @var ProjectType
     */
    private ProjectType $projectType;

    /**
     * Constructeur du projet de musique
     * @param ?int $id
     * @param string $title
     * @param DateTime $release
     * @param string $cover_path
     * @param ProjectType $projectType
     */
    public function __construct(?int $id, string $title, DateTime $release, string $cover_path, ProjectType $projectType) {
        $this->id = $id;
        $this->title = $title;
        $this->release = $release;
        $this->cover_path = $cover_path;
        $this->projectType = $projectType;
    }

    /**
     * Accesseur de l'id du projet de musique
     * @return int|null
     */
    public function getId(): ?int {
        return $this->id;
    }
    /**
     * Accesseur du titre du projet de musique
     * @return string
     */
    public function getTitle(): string {
        return $this->title;
    }
    /**
     * Accesseur de la date de sortie du projet de musique
     * @return DateTime
     */
    public function getRelease(): DateTime {
        return $this->release;
    }
    /**
     * Accesseur du chemin du fichier de la cover du projet de musique
     * @return string
     */
    public function getCoverPath(): string {
        return $this->cover_path;
    }
    /**
     * Accesseur du type de projet de musique
     * @return ProjectType
     */
    public function getProjectType(): ProjectType {
        return $this->projectType;
    }
}