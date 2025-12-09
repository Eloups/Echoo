<?php

namespace Api\Database\Requests;

use Api\Domain\Class\Project;
use Api\Utils\ConvertUtils;
use Api\Utils\RequestUtils;
use PDO;

/**
 * Classe permettant de lancer des requêtes SQL sur les artistes de la base de données
 */
class PgsqlArtistRequests
{
    /**
     * Connection à la base de données
     * @var PDO
     */
    private PDO $pdo;

    /**
     * Constructeur de la classe PgsqlArtistRequests.
     * @param PDO $pdo
     */
    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    /**
     * Requête pour récupérer les données des artistes
     * @return array
     */
    public function getArtist(int $idArtist): array
    {
        $getArtist = "SELECT * FROM artist WHERE id = :id_artist";
        $request = $this->pdo->prepare($getArtist);
        $request->execute([":id_artist" => $idArtist]);
        $result = $request->fetchAll();
        return $result;
    }

    /**
     * Requête pour récupérer les likes d'un artiste
     * @param int $idArtist
     * @return array
     */
    public function getLikesArtist(int $idArtist): array
    {
        $getLikes = "SELECT COUNT(*) AS likes
        FROM library_artist
        WHERE id_artist = :id_artist;";
        $request = $this->pdo->prepare($getLikes);
        $request->execute([":id_artist" => $idArtist]);
        $result = $request->fetchAll();
        return $result;
    }

    /**
     * Requête pour récupérer l'id des musiques les plus populaires d'un artiste
     * @param int $idArtist
     * @param int $limit
     * @return array
     */
    public function getIdPopularMusics(int $idArtist, int $limit)
    {
        $getPopularMusics = "SELECT 
            m.id AS music_id
        FROM artist a
        JOIN artist_project ap
            ON a.id = ap.id_artist
        JOIN project p
            ON ap.id_project = p.id
        JOIN project_music pm
            ON p.id = pm.id_project
        JOIN music m
            ON pm.id_music = m.id
        WHERE a.id = :id_artist
        GROUP BY m.id
        ORDER BY m.nb_streams DESC
        LIMIT :limit;";

        $request = $this->pdo->prepare($getPopularMusics);
        $request->execute([":id_artist" => $idArtist, ":limit" => $limit]);
        $result = $request->fetchAll();

        return $result;
    }

    /**
     * Requête pour récupérer l'id des dernières musiques publiées d'un artiste
     * @param int $idArtist
     * @param int $limit
     * @return array
     */
    public function getIdLastReleasesArtist(int $idArtist, int $limit): array
    {
        $getLastReleases = "SELECT 
            m.id AS music_id
        FROM artist a
        JOIN artist_project ap
            ON a.id = ap.id_artist
        JOIN project p
            ON ap.id_project = p.id
        JOIN project_music pm
            ON p.id = pm.id_project
        JOIN music m
            ON pm.id_music = m.id
        WHERE a.id = :id_artist
        ORDER BY m.release DESC
        LIMIT :limit;";

        $request = $this->pdo->prepare($getLastReleases);
        $request->execute([":id_artist" => $idArtist, ":limit" => $limit]);
        $result = $request->fetchAll();

        return $result;
    }

    /**
     * Requête pour récupérer les notes et genres d'une musiques à partir de l'id de la musique
     * @param int $idMusic
     * @return \Api\Domain\Class\Music[]
     */
    public function getMusicsWithRatingAndGenres(int $idMusic)
    {
        $getMusicsWithRatingAndGenres = "SELECT
            m.id AS music_id,
            m.title AS music_title,
            m.duration AS music_duration,
            m.release AS music_release,
            m.nb_streams AS music_streams,
            m.file_path AS music_path,
            
            g.id AS genre_id,
            g.name AS genre_name,
            
            r.id AS rate_id,
            r.rating AS rate_rate,
            r.comment AS rate_comment
        FROM music m
        LEFT JOIN music_genre mg
            ON m.id = mg.id_music
        LEFT JOIN genre g
            ON mg.id_genre = g.id
        LEFT JOIN music_rating r
            ON m.id = r.id_music
        WHERE m.id = :id_music;";

        $request = $this->pdo->prepare($getMusicsWithRatingAndGenres);
        $request->execute([":id_music" => $idMusic]);
        $result = $request->fetchAll();

        $musics = ConvertUtils::convertRowToMusic($result);

        return $musics;
    }

    /**
     * Requête pour ajouter un like à un artiste
     * @param int $id_user
     * @param int $id_artist
     * @return void
     */
    public function addLike(int $id_user, int $id_artist): void {
        $getIdLibrary = "SELECT id_library
        FROM \"user\"
        WHERE \"user\".id = :id_user;";

        $request = $this->pdo->prepare($getIdLibrary);
        $request->execute([":id_user" => $id_user]);
        $idLibrary = intval($request->fetchAll());

        $request = $this->pdo->prepare("
            INSERT INTO library_artist (id_library, id_artist)
            VALUES (:id_library, :id_artist)
        ");
        
        $request->execute([
            ":id_library" => $idLibrary,
            ":id_artist" => $id_artist
        ]);
    }

    /**
     * Requête pour récupérer les artistes d'une library
     * @param int $id_library
     * @return array
     */
    public function getArtistsInLibrary(int $id_library): array {
        $getArtistsInLibrary = "SELECT a.* FROM artist a
        INNER JOIN library_artist 
            ON a.id = library_artist.id_artist 
        WHERE library_artist.id_library = :id_library
        GROUP BY a.id;";

        $request = $this->pdo->prepare($getArtistsInLibrary);
        $request->execute([":id_library" => $id_library]);
        $result = $request->fetchAll();
        return $result;
    }

    /**
     * Requête pour récupérer les ids des albums d'un artiste (sans single)
     * @param int $id_artist
     * @return array
     */
    public function getArtistIdAlbums(int $id_artist): array {
        $getArtistIdAlbums = "SELECT p.id AS project_id
        FROM project p
        JOIN artist_project ap ON p.id = ap.id_project
        JOIN project_type pt ON p.id_type = pt.id
        WHERE ap.id_artist = :id_artist
        AND pt.name != 'Single';";

        $request = $this->pdo->prepare($getArtistIdAlbums);
        $request->execute([":id_artist" => $id_artist]);
        $result = $request->fetchAll();
        return $result;
    }

    /**
     * Requête pour récupérer un projet et ses notes à partir de son id
     * @param int $id_album
     * @return void
     */
    public function getAlbumsWithRates(int $id_album) : Project {
        $getRatesAlbums = "SELECT
            p.id,
            p.title,
            p.release,
            p.color1,
            p.color2,
            p.cover_path,
            pr.id AS id_rating,
            pr.rating,
            pr.comment,
            pr.created_at,
            pr.id_user,
            pt.name AS project_type
        FROM project_rating pr
        INNER JOIN project p ON p.id = pr.id_project
        INNER JOIN project_type pt ON p.id = pt.id
        WHERE pr.id_project = :id_album;";

        $request = $this->pdo->prepare($getRatesAlbums);
        $request->execute([":id_album" => $id_album]);
        $result = $request->fetchAll();

        $album = ConvertUtils::ConvertAlbumToProject($result);
        return $album;
    }
}