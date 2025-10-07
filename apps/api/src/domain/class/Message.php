<?php 

/**
 * Classe Message
 */
class Message {
    /**
     * Id du message
     * @var ?int
     */
    private ?int $id;
    /**
     * Date d'envoi du message
     * @var DateTime
     */
    private DateTime $sendAt;
    /**
     * Contenu du message
     * @var string
     */
    private string $content;
    /**
     * Musique du message s'il contient une musique
     * @var 
     */
    private ?Music $music;
    /**
     * Utilisateur qui envoie le message
     * @var User
     */
    private User $user;

    /**
     * Constructeur du message
     * @param ?int $id
     * @param DateTime $sendAt
     * @param string $content
     * @param ?Music $music
     * @param User $user
     */
    public function __construct(?int $id, DateTime $sendAt, string $content, ?Music $music, User $user) {
        $this->id = $id;
        $this->sendAt = $sendAt;
        $this->content = $content;
        $this->music = $music;
        $this->user = $user;
    }

    /**
     * Accesseur de l'id du message
     * @return int|null
     */
    public function getId(): ?int {
        return $this->id;
    }
    /**
     * Accesseur de la date d'envoi du message
     * @return DateTime
     */
    public function getSendAt(): DateTime {
        return $this->sendAt;
    }
    /**
     * Accesseur du contenu du message
     * @return string
     */
    public function getContent(): string {
        return $this->content;
    }
    /**
     * Accesseur de la musique du message
     * @return Music|null
     */
    public function getMusic(): Music {
        return $this->music;
    }
    /**
     * Accesseur de l'utilisateur qui envoie le message
     * @return User
     */
    public function getUser(): User {
        return $this->user;
    }
}