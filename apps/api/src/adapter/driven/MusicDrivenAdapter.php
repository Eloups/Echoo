<?php

namespace Api\Adapter;

use Api\Database\PgsqlServer;
use Api\Database\Requests\PgsqlMusicRequests;
use Api\Domain\Class\Music;
use Api\Domain\Ports\MusicDrivenAdapterInterface;
use DateTime;

/**
 * Classe Driven Adapter pour les musiques
 */
class MusicDrivenAdapter implements MusicDrivenAdapterInterface {
    /**
     * Méthode pour récupérer la liste des musiques
     * @return Music[]
     */
    public function getMusicList(): array {
        // On appelle la connexion à la base de données
        $pgslserver = new PgsqlServer();
        $pdo = $pgslserver->getConnection();
        $request = new PgsqlMusicRequests($pdo);

        // On exécute la requête
        $rows = $request->getAllMusics() ?? [];

        // Conversion du résultat en tableau d'objets Music
        $musics = $this->convertToMusic($rows);
        return $musics;
    }

    private function convertToMusic(array $rows): array
    {
        $musics = [];

        foreach ($rows as $row) {
            $music = new Music(
                id: $row['id'] ?? null,
                title: $row['title'],
                duration: (int) $row['duration'],
                release: new DateTime($row['release']),
                file_path: $row['file_path'],
                genres: [], // à compléter plus tard pour charger les genres
                nbStreams: (int) $row['nb_streams'],
                rates: [] // à compléter plus tard pour charger les notes
            );

            $musics[] = $music;
        }

        return $musics;
    }
}