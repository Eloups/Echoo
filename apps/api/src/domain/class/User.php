<?php

namespace Api\Domain\Class;


/**
 * Classe utilisateur
 */
class User
{
    /**
     * Id de l'utilisateur
     * @var ?int
     */
    private ?int $id;
    /**
     * Nom de l'utilisateur
     * @var string
     */
    private string $username;
    /**
     * Email de l'utilisateur
     * @var string
     */
    private string $email;
    /**
     * Mot de passe de l'utilisateur
     * @var string
     */
    private string $password;
    /**
     * Chemin du fichier de la photo de profil
     * @var string
     */
    private string $imagePath;
    /**
     * Bibliothèque de l'utilisateur
     * @var Library
     */
    private Library $library;
    /**
     * Rôle de l'utilisateur
     * @var UserRole
     */
    private UserRole $userRole;
    /**
     * Page artiste si l'utilisateur est un artiste
     * @var 
     */
    private ?Artist $artist;
    /**
     * Amis de l'utilisateur
     * @var ?User[]
     */
    private ?array $friends = [];
    /**
     * Liste des conversations de l'utilisateur
     * @var ?Conversation[]
     */
    private ?array $conversations = [];
    /**
     * Liste de toutes les notes de l'utilisateur
     * @var ?Rating[]
     */
    private ?array $rates = [];

    /**
     * Constructeur de l'utilisateur
     * @param ?int $id
     * @param string $username
     * @param string $email
     * @param string $password
     * @param string $imagePath
     * @param Library $library
     * @param UserRole $userRole
     * @param ?User[] $friends
     * @param ?Conversation[] $conversations
     * @param ?Rating[] $rates
     * @param ?Artist $artist
     */
    public function __construct(?int $id, string $username, string $email, string $password, string $imagePath, Library $library, UserRole $userRole, ?array $friends, ?array $conversations, ?array $rates, ?Artist $artist)
    {
        $this->id = $id;
        $this->username = $username;
        $this->email = $email;
        $this->password = $password;
        $this->imagePath = $imagePath;
        $this->library = $library;
        $this->userRole = $userRole;
        $this->friends = $friends;
        $this->conversations = $conversations;
        $this->rates = $rates;
        $this->artist = $artist;
    }

    /**
     * Accesseur de l'id de l'utilisateur
     * @return int|null
     */
    public function getId(): ?int
    {
        return $this->id;
    }
    /**
     * Accesseur du nom de l'utilisateur
     * @return string
     */
    public function getUsername(): string
    {
        return $this->username;
    }
    /**
     * Accesseur de l'email de l'utilisateur
     * @return string
     */
    public function getEmail(): string
    {
        return $this->email;
    }
    /**
     * Accesseur du mot de passe de l'utilisateur
     * @return string
     */
    public function getPassword(): string
    {
        return $this->password;
    }
    /**
     * Accesseur du chemin de l'image de la photo de profil de l'utilisateur
     * @return string
     */
    public function getImagePath(): string
    {
        return $this->imagePath;
    }
    /**
     * Accesseur de la bibliothèque de l'utilisateur
     * @return Library
     */
    public function getLibrary(): Library
    {
        return $this->library;
    }
    /**
     * Accesseur du rôle de l'utilisateur
     * @return UserRole
     */
    public function getUserRole(): UserRole
    {
        return $this->userRole;
    }
    /**
     * Accesseur de la page artiste de l'utilisateur
     * @return Artist|null
     */
    public function getArtist(): ?Artist
    {
        return $this->artist;
    }

    /**
     * Accesseur de la liste d'amis de l'utilisateur
     * @return ?User[]
     */
    public function getFriends(): ?array
    {
        return $this->friends;
    }
    /**
     * Accesseur des conversations de l'utilisateur
     * @return ?Conversation[]
     */
    public function getConversations(): ?array
    {
        return $this->conversations;
    }
    /**
     * Accesseur de la liste de toutes les notes de l'utilisateur
     * @return ?Rating[]
     */
    public function getRates(): ?array
    {
        return $this->rates;
    }
}