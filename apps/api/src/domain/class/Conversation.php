<?php

namespace Api\Domain\Class;

use DateTime;

/**
 * Classe pour les conversations de groupes
 */
class Conversation
{
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
     * Liste des messages
     * @var ?Message[]
     */
    private ?array $messages = [];
    /**
     * Utilisateur créateur de la conversation
     * @var ?User
     */
    private ?User $creator;
    /**
     * Utilisateurs qui participent à la conversation
     * @var ?User[]
     */
    private ?array $participants = [];
    /**
     * Constructeur d'une conversation
     * @param ?int $id
     * @param ?string $name
     * @param DateTime $createdAt
     * @param string $imagePath
     * @param ?Message[] $messages
     * @param ?User $creator
     * @param ?User[] $participants
     */
    public function __construct(?int $id, ?string $name, DateTime $createdAt, ?string $imagePath, ?array $messages, ?User $creator, ?array $participants)
    {
        $this->id = $id;
        $this->name = $name;
        $this->createdAt = $createdAt;
        $this->imagePath = $imagePath;
        $this->creator = $creator;
        $this->messages = $messages;
        $this->participants = $participants;
    }

    /**
     * Accesseur de l'id de la conversation de groupe
     * @return int|null
     */
    public function getId(): ?int
    {
        return $this->id;
    }
    /**
     * Accesseur du nom de la conversation
     * @return string|null
     */
    public function getName(): ?string
    {
        return $this->name;
    }
    /**
     * Accesseur de la date de création de la conversation
     * @return DateTime
     */
    public function getCreatedAt(): DateTime
    {
        return $this->createdAt;
    }
    /**
     * Accesseur de l'image de profil de la conversation
     * @return string
     */
    public function getImagePath(): ?string
    {
        return $this->imagePath;
    }
    /**
     * Accesseur des messages de la conversation
     * @return ?Message[]
     */
    public function getMessages(): ?array
    {
        return $this->messages;
    }
    /**
     * Accesseur du créateur de la conversation
     * @return ?User
     */
    public function getCreator(): ?User
    {
        return $this->creator;
    }
    /**
     * Accesseur des utilisateurs qui participent à la conversation
     * @return ?User[]
     */
    public function getParticipants(): ?array
    {
        return $this->participants;
    }
}