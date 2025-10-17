<?php 

namespace Api\Utils;

use Api\Domain\Class\Genre;
use Api\Domain\Class\Music;
use Api\Domain\Class\Rating;
use DateTime;

class ConvertUtils {
    public static function convertToMusic(?array $rows): array
    {
        if ($rows === null) return [];

        $musics = [];

        foreach ($rows as $row) {
            $musicId = $row['id'];

            // Vérifie si la musique existe déjà dans le tableau
            if (!isset($musics[$musicId])) {
                $musics[$musicId] = new Music(
                    id: $musicId,
                    title: $row['title'],
                    duration: (int)$row['duration'],
                    release: new DateTime($row['release']),
                    file_path: $row['file_path'],
                    genres: [],
                    nbStreams: (int)$row['nb_streams'],
                    rates: []
                );
            }

            $music = $musics[$musicId];

            // Ajout du genre (si présent et pas déjà ajouté)
            if (!empty($row['g.id']) && !empty($row['g.name'])) {
                $alreadyHasGenre = false;
                foreach ($music->getGenres() as $g) {
                    if ($g->getId() === (int)$row['g.id']) {
                        $alreadyHasGenre = true;
                        break;
                    }
                }
                if (!$alreadyHasGenre) {
                    $music->getGenres()[] = new Genre(
                        (int)$row['g.id'],
                        $row['g.name']
                    );
                }
            }

            // Ajout de la note (si présente)
            if (!empty($row['r.id'])) {
                $music->getRates()[] = new Rating(
                    id: (int)$row['r.id'],
                    rate: (int)$row['r.rate'],
                    comment: $row['r.comment'],
                    user: null
                );
            }
        }

        // Retourne un tableau indexé (sans clés d'id)
        return array_values($musics);
    }
}