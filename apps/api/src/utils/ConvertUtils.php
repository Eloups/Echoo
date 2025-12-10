<?php

namespace Api\Utils;

use Api\Domain\Class\Artist;
use Api\Domain\Class\Genre;
use Api\Domain\Class\Music;
use Api\Domain\Class\Playlist;
use Api\Domain\Class\Project;
use Api\Domain\Class\Rating;
use DateTime;
use Symfony\Component\Serializer\Context\Normalizer\FormErrorNormalizerContextBuilder;

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
                        id_user: null
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

    /**
     * Convertir les données de la base en objets Project
     * @param array $rows
     * @return Project
     */
    public static function ConvertRowToProject(array $rows): Project
    {
        $release = new DateTime($rows['release']);

        return new Project(
            isset($rows['id']) ? (int) $rows['id'] : null,
            $rows['title'],
            $release,
            $rows['cover_path'],
            $rows['project_type'],
            [],
            $rows['color1'],
            $rows['color2'],
            [],
            null
        );
    }

    /**
     * Convertir les données de la base en objets Project
     * @param array $rows
     * @return Project
     */
    public static function ConvertAlbumToProject(array $rows): Project
    {

        $id = $rows[0]['id'];
        $title = $rows[0]['title'];
        $release = new DateTime($rows[0]['release']);
        $color1 = $rows[0]['color1'];
        $color2 = $rows[0]['color2'];
        $cover_path = $rows[0]['cover_path'];
        $project_type = $rows[0]['project_type'];

        $rates = [];
        foreach($rows as $row) {
            if ($row['id_rating'] === null) {
                continue;
            }

            $idRating = $row['id_rating'];

            // Création de l'objet Music
            if (!isset($rates[$idRating])) {

                $created_at = new DateTime($row['created_at']);

                $rates[$idRating] = new Rating(
                    $idRating,
                     $row['rating'],
                     $row['comment'], 
                     $row['id_user']
                );
            }
        }

        return new Project(
            isset($id) ? $id : null,
            $title,
            $release,
            $cover_path,
            $project_type,
            [],
            $color1,
            $color2,
            $rates,
            null
        );
    }

    public static function ConvertRowsToProjectWithAvgRate(array $rows, float $avgRate): Project
    {
        if ($rows === []) {
            throw new \Exception("No project data provided.");
        }

        // On prend la première ligne pour construire les infos du projet
        $first = $rows[0];

        $projectId = $first['project_id'];
        $projectTitle = $first['project_title'];
        $projectRelease = new DateTime($first['project_release']);
        $projectCover = $first['cover_path'];
        $projectType = $first['project_type'];
        $color1 = $first['color1'];
        $color2 = $first['color2'];

        $musics = [];

        foreach ($rows as $row) {
            $musicId = $row['music_id'];

            // Si la musique est NULL, c’est que le projet n’a aucune musique
            if ($musicId === null) {
                continue;
            }

            // Évite les doublons si jointures multiples
            if (!isset($musics[$musicId])) {
                $musicRelease = new DateTime($row['music_release']);

                $musics[$musicId] = new Music(
                    id: $musicId,
                    title: $row['music_title'],
                    duration: $row['duration'],
                    release: $musicRelease,
                    file_path: $row['file_path'],
                    genres: null,
                    nbStreams: $row['nb_streams'],
                    rates: null
                );
            }
        }

        // On n'utilise pas les notes individuelles ici → null
        $rates = null;

        return new Project(
            id: $projectId,
            title: $projectTitle,
            release: $projectRelease,
            cover_path: $projectCover,
            projectType: $projectType,
            musics: array_values($musics), // réindexation propre
            color1: $color1,
            color2: $color2,
            rates: $rates,
            avgRate: $avgRate
        );

    }
}