<?php

namespace Api\Adapter;

use Api\Database\PgsqlServer;
use Api\Database\Requests\PgsqlMusicRequests;
use Api\Domain\Ports\MusicDrivenAdapterInterface;
use Api\Utils\ConvertUtils;

/**
 * Classe Driven Adapter pour les musiques
 */
class MusicDrivenAdapter implements MusicDrivenAdapterInterface
{
    /**
     * Méthode pour récupérer la liste des musiques
     * @return array
     */
    public function getMusicList(int $idArtist): array
    {
        // On appelle la connexion à la base de données
        $pgslserver = new PgsqlServer();

        $pdo = $pgslserver->getConnection();
        $request = new PgsqlMusicRequests($pdo);

        // On exécute la requête
        $rows = $request->getAllMusics($idArtist);

        // Conversion du résultat en tableau d'objets 
        $musics = ConvertUtils::convertRowToMusic($rows, true);
        return $musics;
    }

    /**
     * Méthode pour ajouter un like à une musique
     * @param string $id_user
     * @param int $id_music
     * @return void
     */
    public function addLike(string $id_user, int $id_music): void
    {
        $pgslserver = new PgsqlServer();

        $pdo = $pgslserver->getConnection();
        $request = new PgsqlMusicRequests($pdo);

        // On exécute la requête
        $request->addLike($id_user, $id_music);
    }

    /**
     * Récupération des notes d'une musique
     * @param int $musicId
     * @param int $limit
     * @return array
     */
    public function getMusicsRatings(int $musicId, int $limit): array
    {
        $pgslserver = new PgsqlServer();

        $pdo = $pgslserver->getConnection();
        $request = new PgsqlMusicRequests($pdo);

        $ratingsRows = $request->getMusicsRatings($musicId, $limit);
        $ratings = ConvertUtils::convertRowsToMusicRatings($ratingsRows);

        return $ratings;
    }

    /**
     * Méthode pour récupérer le cover file d'un projet à partir de l'id musique
     * @param int $id_music
     * @return string
     */
    public function getCoverFileProject(int $id_music): string
    {
        $pgslserver = new PgsqlServer();

        $pdo = $pgslserver->getConnection();
        $request = new PgsqlMusicRequests($pdo);

        $cover_path = $request->getCoverFileProject($id_music);

        return $cover_path[0]["cover_path"];
    }

    /**
     * Méthode pour vérifier si une musique est likée par un utilisateur
     * @param string $id_user
     * @param int $id_music
     * @return bool
     */
    public function getIsMusicLikeByUser(string $id_user, int $id_music): bool {
        $pgslserver = new PgsqlServer();
        $pdo = $pgslserver->getConnection();
        $request = new PgsqlMusicRequests($pdo);
        $isLike = $request->getIsMusicLikeByUser($id_user, $id_music);
        return $isLike;
    }
}