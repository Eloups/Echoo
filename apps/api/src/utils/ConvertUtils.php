<?php

namespace Api\Utils;

use Api\Domain\Class\Artist;
use Api\Domain\Class\Genre;
use Api\Domain\Class\Music;
use Api\Domain\Class\Playlist;
use Api\Domain\Class\Rating;
use DateTime;

/**
 * Classe utilitaire pour les conversions des données en objets
 */
class ConvertUtils
{
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
            $genreId = $row['genre_id'] ?? null;
            $genreName = $row['genre_name'] ?? null;

            if ($genreId !== null && $genreName !== null) {
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
            $rateId = $row['rate_id'] ?? null;

            if ($rateId !== null) {
                $rateValue = $row['rate_rate'] ?? null;
                $rateComment = $row['rate_comment'] ?? null;

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

    /**
     * Convertir les données de la base en objets Artist
     * @param array $rows
     * @return Artist
     */
    public static function ConvertRowToArtist(array $rows): Artist
    {

        return new Artist(
            isset($rows['id']) ? (int) $rows['id'] : null,
            $rows['name'],
            isset($rows['isverified']) ? filter_var($rows['isverified'], FILTER_VALIDATE_BOOLEAN) : false,
            $rows['description'],
            $rows['image_path'],
            [],
            [],
            []
        );
    }

    /**
     * Convertir les données de la base en objets Playlist
     * @param array $rows
     * @return Playlist
     */
    public static function convertRowToPlaylist(array $rows): ?Playlist
    {
        if ($rows === [] || !isset($rows[0]['playlist_id'])) {
            return null; // aucune playlist trouvée
        }

        // On récupère les infos de la playlist depuis la première ligne
        $playlistId = $rows[0]['playlist_id'];
        $playlistTitle = $rows[0]['playlist_title'];
        $playlistPublic = (bool) $rows[0]['playlist_public'];
        $playlistDescription = $rows[0]['playlist_description'] ?? null;
        $playlistCover = $rows[0]['playlist_cover'] ?? null;

        $musics = [];

        foreach ($rows as $row) {

            // Si la ligne ne contient aucune musique (playlist vide)
            if ($row['music_id'] === null) {
                continue;
            }

            $musicId = $row['music_id'];

            // Création de l'objet Music
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
        }

        // On créé l'objet playlist avec les musiques
        return new Playlist(
            id: $playlistId,
            title: $playlistTitle,
            isPublic: $playlistPublic,
            description: $playlistDescription,
            cover_path: $playlistCover,
            musics: array_values($musics)
        );
    }

    /**
     * Convertir les données de la base en objets Playlist
     * @param array $rows
     * @return Playlist
     */
    public static function ConvertRowToPlaylists(array $row): ?Playlist {
        if ($row === [] || !isset($row['playlist_id'])) {
            return null; // aucune playlist trouvée
        }

        // On récupère les infos de la playlist depuis la première ligne
        $playlistId = $row['playlist_id'];
        $playlistTitle = $row['playlist_title'];
        $playlistPublic = (bool) $row['playlist_public'];
        $playlistDescription = $row['playlist_description'] ?? null;
        $playlistCover = $row['playlist_cover'] ?? null;

        // On créé l'objet playlist sans les musiques
        return new Playlist(
            id: $playlistId,
            title: $playlistTitle,
            isPublic: $playlistPublic,
            description: $playlistDescription,
            cover_path: $playlistCover,
            musics: []
        );
    }

}