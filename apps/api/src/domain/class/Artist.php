<?php

/**
 * Classe de l'artiste
 */
class Artist {
    /**
     * Id de l'artiste
     * @var ?int
     */
    private ?int $id;
    /**
     * Nom de l'artiste
     * @var string
     */
    private string $name;
    /**
     * Booléen pour spécifier si l'artiste est vérifié
     * @var bool
     */
    private bool $isVerified;
    /**
     * Description de la musique
     * @var string
     */
    private string $description;
    /**
     * Chemin de l'image de photo de profil de la page artiste
     * @var string
     */
    private string $image_path;
    /**
     * Réseau social de l'artiste
     * @var Network[]
     */
    private array $network = [];
    /**
     * Liste des projets créés
     * @var Project[]
     */
    private array $projects = [];
    /**
     * Liste des featuring de l'artiste
     * @var Music[]
     */
    private array $featuredMusic = [];

    /**
     * Constructeur de l'artiste
     * @param ?int $id
     * @param string $name
     * @param bool $isVerified
     * @param string $description
     * @param string $image_path
     * @param Network[] $network
     * @param Project[] $projects
     * @param Music[] $featuredMusic
     */
    public function __construct(?int $id, string $name, bool $isVerified, string $description, string $image_path, array $network, array $projects, array $featuredMusic) {
        $this->id = $id;
        $this->name = $name;
        $this->isVerified = $isVerified;
        $this->description = $description;
        $this->image_path = $image_path;
        $this->network = $network;
        $this->projects = $projects;
        $this->featuredMusic = $featuredMusic;
    }

    /**
     * Accesseur de l'id de l'artiste
     * @return int|null
     */
    public function getId(): ?int {
        return $this->id;
    }
    /**
     * Accesseur du nom de l'artiste
     * @return string
     */
    public function getName(): string {
        return $this->name;
    }
    /**
     * Accesseur de la vérification de l'artiste
     * @return bool
     */
    public function getIsVerified(): bool {
        return $this->isVerified;
    }
    /**
     * Accesseur de la description de l'artiste
     * @return string
     */
    public function getDescription(): string {
        return $this->description;
    }
    /**
     * Accesseur du chemin du l'image de photo de profil de l'artiste
     * @return string
     */
    public function getImagePath(): string {
        return $this->image_path;
    }

    /**
     * Accesseur des réseaux sociaux de l'artiste
     * @return Network[]|null
     */
    public function getNetwork(): ?array {
        return $this->network;
    }
    /**
     * Accesseur des musiques créées par l'artiste
     * @return Music[]
     */
    public function getProjects(): array {
        return $this->projects;
    }
    /**
     * Accesseur des musiques en feat de l'artiste
     * @return Music[]
     */
    public function getFeaturedMusic(): array {
        return $this->featuredMusic;
    }
}