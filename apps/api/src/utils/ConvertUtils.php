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
     * @param ?array $rows
     * @return Music[]
     */
    public static function convertRowToMusic(?array $rows): array
    {
        if ($rows === null) {
            return [];
        }

        $musics = [];

        foreach ($rows as $row) {
            // Récupération de l'ID de la musique
            $musicId = (int)($row['music_id'] ?? 0);
            if ($musicId === 0) continue;

            // Création de l'objet Music si non existant
            if (!isset($musics[$musicId])) {
                try {
                    $release = isset($row['music_release']) ? new DateTime($row['music_release']) : new DateTime();
                } catch (\Exception $e) {
                    $release = new DateTime();
                }

                $musics[$musicId] = new Music(
                    id: $musicId,
                    title: $row['music_title'] ?? '',
                    duration: (int)($row['music_duration'] ?? 0),
                    release: $release,
                    file_path: $row['music_path'] ?? '',
                    genres: [],
                    nbStreams: (int)($row['music_streams'] ?? 0),
                    rates: []
                );
            }

            $music = $musics[$musicId];

            // --- Ajout du genre si présent ---
            $genreId = $row['genre_id'] ?? null;
            $genreName = $row['genre_name'] ?? null;
            if ($genreId !== null && $genreName !== null) {
                // Vérifie qu'on n'ajoute pas de doublon
                $alreadyHas = false;
                foreach ($music->getGenres() as $g) {
                    if ($g->getId() === (int)$genreId) {
                        $alreadyHas = true;
                        break;
                    }
                }
                if (!$alreadyHas) {
                    $music->addGenre(new Genre((int)$genreId, $genreName));
                }
            }

            // Ajout de la note si présente
            $rateId = $row['rate_id'] ?? null;
            if ($rateId !== null) {
                $rateValue = isset($row['rate_rate']) ? (int)$row['rate_rate'] : 0;
                $rateComment = $row['rate_comment'] ?? null;

                // Vérifie qu'on n'ajoute pas de doublon
                $alreadyHasRate = false;
                foreach ($music->getRates() as $r) {
                    if ($r->getId() === (int)$rateId) {
                        $alreadyHasRate = true;
                        break;
                    }
                }
                if (!$alreadyHasRate) {
                    $music->addRate(new Rating(
                        id: (int)$rateId,
                        rate: $rateValue,
                        comment: $rateComment,
                        user: null
                    ));
                }
            }
        }

        // Retourne un tableau indexé
        return array_values($musics);
    }
}