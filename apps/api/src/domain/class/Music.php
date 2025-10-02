<?php

/**
 * Classe des musiques
 */
class Music {
    /**
     * Id de la musique
     * @var ?int
     */
    private ?int $id;
    /**
     * Titre de la musique
     * @var string
     */
    private string $title;
    /**
     * Durée de la musique
     * @var int
     */
    private int $duration;
    /**
     * Date de sortie de la musique
     * @var DateTime
     */
    private DateTime $release;
    /**
     * Chemin du fichier de la musique
     * @var string
     */
    private string $file_path;
    /**
     * Genre de la musique
     * @var Gender
     */
    private Gender $gender;

    /**
     * Constructeur de la musique
     * @param ?int $id
     * @param string $title
     * @param int $duration
     * @param DateTime $release
     * @param string $file_path
     * @param Gender $gender
     */
    public function __construct(?int $id, string $title, int $duration, DateTime $release, string $file_path, Gender $gender) {
        $this->id = $id;
        $this->title = $title;
        $this->duration = $duration;
        $this->release = $release;
        $this->file_path = $file_path;
        $this->gender = $gender;
    }

    /**
     * Accesseur de l'id de la musique
     * @return ?int
     */
    public function getId(): ?int {
        return $this->id;
    }
    /**
     * Accesseur du titre de la musique
     * @return string
     */
    public function getTitle(): string {
        return $this->title;
    }
    /**
     * Accesseur de la durée de la musique
     * @return int
     */
    public function getDuration(): int {
        return $this->duration;
    }
    /**
     * Accesseur de la date de sortie de la musique
     * @return DateTime
     */
    public function getRelease(): DateTime {
        return $this->release;
    }
    /**
     * Accesseur du chemin du fichier de la musique
     * @return string
     */
    public function getFilePath(): string {
        return $this->file_path;
    }
    /**
     * Accesseur du genre de la musique
     * @return Gender
     */
    public function getGender(): Gender {
        return $this->gender;
    }
}