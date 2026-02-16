<?php

namespace Api\Domain\Class;


/**
 * Classe pour définir les différents types de projets
 */
class ProjectType
{
    /**
     * Id du type de projet
     * @var ?int
     */
    private ?int $id;
    /**
     * Nom du type de projet
     * @var string
     */
    private string $name;

    /**
     * Constructeur du type de projet
     * @param ?int $id
     * @param string $name
     */
    public function __construct(?int $id, string $name)
    {
        $this->id = $id;
        $this->name = $name;
    }

    /**
     * Accesseur de l'id du type de projet
     * @return int|null
     */
    public function getId(): ?int
    {
        return $this->id;
    }
    /**
     * Accesseur du nom du type de projet
     * @return string
     */
    public function getName(): string
    {
        return $this->name;
    }
}