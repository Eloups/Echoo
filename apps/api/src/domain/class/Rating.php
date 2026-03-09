<?php

namespace Api\Domain\Class;

use DateTime;


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
     * Date de création du commentaire
     * @var ?DateTime
     */
    private ?DateTime $created_at;
    /**
     * Commentaire de la note
     * @var ?string
     */
    private ?string $comment;
    /**
     * Utilisateur qui met la note
     * @var ?int
     */
    private ?int $id_user;

    /**
     * Constructeur de la note
     * @param ?int $id
     * @param int $rate
     * @param ?string $comment
     * @param ?int $id_user
     */
    public function __construct(?int $id, int $rate, ?DateTime $created_at, ?string $comment, ?int $id_user)
    {
        $this->id = $id;
        $this->rate = $rate;
        $this->created_at = $created_at;
        $this->comment = $comment;
        $this->id_user = $id_user;
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
     * Accesseur de la date de création
     * @return ?DateTime
     */
    public function getCreatedAt(): ?DateTime
    {
        return $this->created_at;
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
     * @return ?int
     */
    public function getUser(): ?int
    {
        return $this->id_user;
    }
}