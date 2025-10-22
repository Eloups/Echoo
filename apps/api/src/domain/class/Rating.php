<?php

namespace Api\Domain\Class;


/**
 * Classe des notes des musiques
 */
class Rating
{
    /**
     * Id de la note
     * @var ?int
     */
    private ?int $id;
    /**
     * Valeur de la note (1 à 5)
     * @var int
     */
    private int $rate;
    /**
     * Commentaire de la note
     * @var ?string
     */
    private ?string $comment;
    /**
     * Utilisateur qui met la note
     * @var User
     */
    private User $user;

    /**
     * Constructeur de la note
     * @param ?int $id
     * @param int $rate
     * @param ?string $comment
     * @param User $user
     */
    public function __construct(?int $id, int $rate, ?string $comment, User $user)
    {
        $this->id = $id;
        $this->rate = $rate;
        $this->comment = $comment;
        $this->user = $user;
    }

    /**
     * Accesseur de l'id de la note
     * @return int|null
     */
    public function getId(): ?int
    {
        return $this->id;
    }
    /**
     * Accesseur de la valeur de la note (1 à 5)
     * @return int
     */
    public function getRate(): int
    {
        return $this->rate;
    }
    /**
     * Accesseur du commentaire de la note
     * @return string|null
     */
    public function getComment(): ?string
    {
        return $this->comment;
    }
    /**
     * Accesseur de l'utilisateur qui met la note
     * @return User
     */
    public function getUser(): User
    {
        return $this->user;
    }
}