<?php

namespace Api\Domain\Class;


/**
 * Classe du rôle de l'utilisateur (ex : admin)
 */
class UserRole {
    /**
     * Id du rôle
     * @var int
     */
    private ?int $id;
    /**
     * Nom du rôle
     * @var string
     */
    private string $name;

    /**
     * Constructeur du rôle
     * @param ?int $id
     * @param string $name
     */
    public function __construct(?int $id, string $name) {
        $this->id = $id;
        $this->name = $name;
    }

    /**
     * Accesseur de l'id du rôle
     * @return int|null
     */
    public function getId(): ?int {
        return $this->id;
    }
    /**
     * Accesseur du nom du rôle
     * @return string
     */
    public function getName(): string {
        return $this->name;
    }
}