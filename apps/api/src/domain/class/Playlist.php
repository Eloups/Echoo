<?php 

namespace Api\Domain\Class;


/**
 * Classe Playlist
 */
class Playlist {
    /**
     * Id de la playlist
     * @var ?int
     */
    private ?int $id;
    /**
     * Titre de la playlist
     * @var string
     */
    private string $title;
    /**
     * Est-ce que la playlist est publique ?
     * @var bool
     */
    private bool $isPublic;
    /**
     * Description de la playlist
     * @var ?string
     */
    private ?string $description;
    /**
     * Chemin de l'image de la cover de la playlist
     * @var ?string
     */
    private ?string $cover_path;
    /**
     * Liste des musiques de la playlist
     * @var Music[]
     */
    private array $musics;

    /**
     * Summary of __construct
     * @param ?int $id
     * @param string $title
     * @param bool $isPublic
     * @param ?string $description
     * @param ?string $cover_path
     * @param Music[] $musics
     */
    public function __construct(?int $id, string $title, bool $isPublic, string $description, string $cover_path, array $musics) {
        $this->id = $id;
        $this->title = $title;
        $this->isPublic = $isPublic;
        $this->description = $description;
        $this->cover_path = $cover_path;
        $this->musics = $musics;
    }

    /**
     * Accesseur de l'id de la playlist
     * @return int|null
     */
    public function getId(): ?int {
        return $this->id;
    }
    /**
     * Accesseur du titre de la playlist
     * @return string
     */
    public function getTitle(): string {
        return $this->title;
    }
    /**
     * Accesseur du booléen si la playlist est publique ou non
     * @return bool
     */
    public function isPublic(): bool {
        return $this->isPublic;
    }
    /**
     * Accesseur de la description de la playlist
     * @return string|null
     */
    public function getDescription(): string {
        return $this->description;
    }
    /**
     * Accesseur du chemin de l'image de la cover de la playlist
     * @return string|null
     */
    public function getCoverPath(): string {
        return $this->cover_path;
    }
    /**
     * Accesseur des musiques de la playlist
     * @return Music[]
     */
    public function getMusics(): array {
        return $this->musics;
    }
}