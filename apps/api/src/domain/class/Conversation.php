<?php

/**
 * Classe pour les conversations de groupes
 */
class Conversation {
    /**
     * Id de la conversation de groupe
     * @var ?int
     */
    private ?int $id;
    /**
     * Nom de la conversation du groupe
     * @var ?string
     */
    private ?string $name;
    /**
     * Date de création de la conversation du groupe
     * @var DateTime
     */
    private DateTime $createdAt;
    /**
     * Chemin de l'image de photo de profil de la conversation du groupe
     * @var ?string
     */
    private ?string $imagePath;
    /**
     * Utilisateur créateur de la conversation
     * @var User
     */
    private User $creator;
    
    /**
     * Constructeur d'une conversation
     * @param ?int $id
     * @param ?string $name
     * @param DateTime $createdAt
     * @param string $imagePath
     */
    public function __construct(?int $id, ?string $name, DateTime $createdAt, ?string $imagePath, User $creator) {
        $this->id = $id;
        $this->name = $name;
        $this->createdAt = $createdAt;
        $this->imagePath = $imagePath;
        $this->creator = $creator;
    }

    /**
     * Accesseur de l'id de la conversation de groupe
     * @return int|null
     */
    public function getId(): ?int {
        return $this->id;
    }
    /**
     * Accesseur du nom de la conversation
     * @return string|null
     */
    public function getName(): ?string {
        return $this->name;
    }
    /**
     * Accesseur de la date de création de la conversation
     * @return DateTime
     */
    public function getCreatedAt(): DateTime {
        return $this->createdAt;
    }
    /**
     * Accesseur de l'image de profil de la conversation
     * @return string
     */
    public function getImagePath(): ?string {
        return $this->imagePath;
    }
    public function getCreator(): User {
        return $this->creator;
    }
}