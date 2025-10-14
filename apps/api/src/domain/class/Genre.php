<?php

namespace Api\Domain\Class;

/**
 * Classe des genres de musiques
 */
class Genre {
    /**
     * Id du genre
     * @var ?int
     */
    private ?int $id;
    /**
     * Nom du genre
     * @var string
     */
    private string $name;

    /**
     * Constructeur du genre
     * @param ?int $id
     * @param string $name
     */
    public function __construct(?int $id, string $name){
        $this->id = $id;
        $this->name = $name;
    }

    /**
     * Accesseur de l'id du genre
     * @return ?int
     */
    public function getId(): ?int {
        return $this->id;
    }

    /**
     * Accesseur du nom du genre
     * @return string
     */
    public function getName(): string {
        return $this->name;
    }
}