<?php 

namespace Api\Domain\Class;


/**
 * Classe pour les réseaux sociaux des artistes
 */
class Network {
    /**
     * Id du réseau social
     * @var ?int
     */
    private ?int $id;
    /**
     * Nom du réseau social
     * @var string
     */
    private string $name;
    /**
     * Lien du réseau social de l'artiste
     * @var string
     */
    private string $link;
    /**
     * Constructeur d'un réseau social
     * @param ?int $id
     * @param string $name
     * @param string $link
     */
    public function __construct(?int $id, string $name, string $link) {
        $this->id = $id;
        $this->name = $name;
        $this->link = $link;
    }

    /**
     * Accesseur de l'id du réseau social
     * @return int|null
     */
    public function getId(): ?int {
        return $this->id;
    }

    /**
     * Accesseur du nom de l'id du réseau social
     * @return string
     */
    public function getName(): string {
        return $this->name;
    }
    /**
     * Accesseur du lien du réseau social
     * @return string
     */
    public function getLink(): string {
        return $this->link;
    }
}