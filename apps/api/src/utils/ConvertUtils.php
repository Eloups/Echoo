<?php 

namespace Api\Utils;

use Api\Domain\Class\Genre;
use Api\Domain\Class\Music;
use Api\Domain\Class\Rating;
use DateTime;

/**
 * Classe utilitaire pour les conversions des données en objets
 */
class ConvertUtils {
    /**
     * Convertir les données de la base en objets Music
     * @param array $rows
     * @return Music[]
     */
    public static function convertRowToMusic(array $rows): array
    {
        if ($rows === []) {
            return [];
        }

        $musics = [];

        foreach ($rows as $row) {
            // Récupération de l'ID de la musique
            $musicId = $row['music_id'];

            // Création de l'objet Music si non existant
            if (!isset($musics[$musicId])) {
                $release = new DateTime($row['music_release']);

                $musics[$musicId] = new Music(
                    id: $musicId,
                    title: $row['music_title'],
                    duration: $row['music_duration'],
                    release: $release,
                    file_path: $row['music_path'],
                    genres: [],
                    nbStreams: $row['music_streams'],
                    rates: []
                );
            }

            $music = $musics[$musicId];

            // Ajout du genre si présent
            $genreId = $row['genre_id'];
            $genreName = $row['genre_name'];
            if ($genreId !== null && $genreName !== null) {
                // Vérifie qu'on n'ajoute pas de doublon
                $alreadyHas = false;
                foreach ($music->getGenres() as $g) {
                    if ($g->getId() === $genreId) {
                        $alreadyHas = true;
                        break;
                    }
                }
                if (!$alreadyHas) {
                    $music->addGenre(new Genre($genreId, $genreName));
                }
            }

            // Ajout de la note si présente
            $rateId = $row['rate_id'];
            if ($rateId !== null) {
                $rateValue = $row['rate_rate'];
                $rateComment = $row['rate_comment'];

                // Vérifie qu'on n'ajoute pas de doublon
                $alreadyHasRate = false;
                foreach ($music->getRates() as $r) {
                    if ($r->getId() === $rateId) {
                        $alreadyHasRate = true;
                        break;
                    }
                }
                if (!$alreadyHasRate) {
                    $music->addRate(new Rating(
                        id: $rateId,
                        rate: $rateValue,
                        comment: $rateComment,
                        user: null
                    ));
                }
            }
        }

        // On enlève l'indexation
        return array_values($musics);
    }
}