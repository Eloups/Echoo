<?php

/**
 * Classe des bibliothèques des utilisateurs
 */
class Library {
    /**
     * Id de la bibliothèque
     * @var ?int
     */
    private ?int $id;
    /**
     * Tableau des autheurs de la bibliothèque
     * @var Artist[]
     */
    private array $artists = [];
    /**
     * Tableau des playlists de la bibliothèques
     * @var Playlist[]
     */
    private array $playlists = [];
    /**
     * Tableau des projets de la bibliothèques
     * @var Project[]
     */
    private array $projects = [];

    /**
     * Constructeur de la bibliothèque
     * @param ?int $id
     * @param array $artists
     * @param array $playlists
     * @param array $projects
     */
    public function __construct(int $id, array $artists, array $playlists, array $projects) {
        $this->id = $id;
        $this->artists = $artists;
        $this->playlists = $playlists;
        $this->projects = $projects;
    }

    /**
     * Accesseur de l'id de la bibliothèque
     * @return int|null
     */
    public function getId(): ?int {
        return $this->id;
    }
    /**
     * Accesseur du tableau d'artistes de la bibliothèque
     * @return Artist[]
     */
    public function getAuthors(): array {
        return $this->artists;
    }
    /**
     * Accesseur du tableau de playlists de la bibliothèque
     * @return Playlist[]
     */
    public function getPlaylists(): array {
        return $this->playlists;
    }
    /**
     * Accesseur du tableau des projets de la bibliothèque
     * @return Project[]
     */
    public function getProjects(): array {
        return $this->projects;
    }
}