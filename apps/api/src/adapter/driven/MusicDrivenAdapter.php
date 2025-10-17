<?php

namespace Api\Adapter;

use Api\Database\PgsqlServer;
use Api\Database\Requests\PgsqlMusicRequests;
use Api\Domain\Class\Music;
use Api\Domain\Ports\MusicDrivenAdapterInterface;
use Api\Utils\ConvertUtils;
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
        $rows = $request->getAllMusics();

        // Conversion du résultat en tableau d'objets 
        $musics = ConvertUtils::convertToMusic($rows);
        return $musics;
    }
}