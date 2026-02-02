<?php

use Api\Domain\Class\Artist;
use Api\Domain\Class\Genre;
use Api\Domain\Class\Music;
use Api\Domain\Class\Playlist;
use Api\Domain\Class\Project;
use Api\Domain\Class\Rating;
use Api\Utils\ConvertUtils;
use PHPUnit\Framework\TestCase;

class ConvertUtilsTest extends TestCase
{
    /**
     * Test de la fonction convertRowToMusic
     * @return void
     */
    public function test_convertRowToMusic(): void
    {
        $rows = [
            ["music_id" => 1, "music_title" => "musique 1", "music_duration" => 200, "music_release" => '2022-05-15 12:00:00.000', "music_path" => "/musique1", "genre_id" => 1, "genre_name" => "genre 1", "music_streams" => 150, "rate_id" => 1, "rate_rate" => 4, "rate_comment" => "Nice comment", "artist_name" => "nice artist"],
            ["music_id" => 1, "music_title" => "musique 1", "music_duration" => 200, "music_release" => '2022-05-15 12:00:00.000', "music_path" => "/musique1", "genre_id" => 2, "genre_name" => "genre 2", "music_streams" => 150, "artist_name" => "nice artist"],
            ["music_id" => 2, "music_title" => "musique 2", "music_duration" => 100, "music_release" => '2023-05-15 12:00:00.000', "music_path" => "/musique2", "genre_id" => 2, "genre_name" => "genre 2", "music_streams" => 200, "artist_name" => "nice artist 2"]
        ];

        $musics = ConvertUtils::convertRowToMusic($rows, false);

        $this->assertEquals([
            new Music(1, 'musique 1', 200, new DateTime('2022-05-15 12:00:00.000'), '/musique1', [new Genre(1, 'genre 1'), new Genre(2, 'genre 2')], 150, [new Rating(1, 4, null, 'Nice comment', null),], 'nice artist'),
            new Music(2, 'musique 2', 100, new DateTime('2023-05-15 12:00:00.000'), '/musique2', [new Genre(2, 'genre 2')], 200, [], 'nice artist 2')
        ], $musics);
    }

    /**
     * Test de la fonction ConvertRowToArtist
     * @return void
     */
    public function test_ConvertRowToArtist(): void
    {
        $row = ['id' => 1, 'name' => 'artist name', 'isverified' => true, 'description' => 'A nice description', 'image_path' => '/artist1'];

        $artist = ConvertUtils::ConvertRowToArtist($row);

        $this->assertEquals(new Artist(1, 'artist name', true, 'A nice description', '/artist1', [], [], []), $artist);
    }

    /**
     * Test de la fonction convertRowToPlaylist
     * @return void
     */
    public function test_convertRowToPlaylist(): void
    {
        $rows = [
            ['playlist_id' => 2, 'playlist_title' => 'title 2', 'playlist_public' => false, 'playlist_description' => 'A nice description again', 'playlist_cover' => '/cover2', 'music_id' => 1, 'music_title' => 'title 1', 'music_duration' => 100, 'music_release' => '2022-05-15 12:00:00.000', 'music_path' => '/path1', 'music_streams' => 1500, 'artist_name' => 'Artist 1'],
            ['playlist_id' => 2, 'playlist_title' => 'title 2', 'playlist_public' => false, 'playlist_description' => 'A nice description again', 'playlist_cover' => '/cover2', 'music_id' => 2, 'music_title' => 'title 2', 'music_duration' => 200, 'music_release' => '2025-05-15 12:00:00.000', 'music_path' => '/path2', 'music_streams' => 250, 'artist_name' => 'Artist 2']
        ];

        $playlists = ConvertUtils::convertRowToPlaylist($rows);

        $this->assertEquals(
            new Playlist(2, 'title 2', false, 'A nice description again', '/cover2', [
                new Music(1, 'title 1', 100, new DateTime('2022-05-15 12:00:00.000'), '/path1', [], 1500, [], 'Artist 1'),
                new Music(2, 'title 2', 200, new DateTime('2025-05-15 12:00:00.000'), '/path2', [], 250, [], 'Artist 2')
            ], 0),
            $playlists
        );
    }

    /**
     * Test de la fonction ConvertRowToPlaylists
     * @return void
     */
    public function test_ConvertRowToPlaylists(): void
    {
        $row = ['playlist_id' => 1, 'playlist_title' => 'title', 'playlist_public' => true, 'playlist_description' => 'Description here', 'playlist_cover' => '/cover'];

        $playlist = ConvertUtils::ConvertRowToPlaylists($row, 25);

        $this->assertEquals(new Playlist(1, 'title', true, 'Description here', '/cover', [], 25), $playlist);
    }

    /**
     * Test de la fonction ConvertRowToProject
     * @return void
     */
    public function test_ConvertRowToProject(): void
    {
        $row = ['id' => 1, 'title' => 'title', 'release' => '2022-05-15 12:00:00.000', 'cover_path' => '/cover', 'project_type' => 'project type', 'color1' => '#FFFFFF', 'color2' => '#000000'];

        $project = ConvertUtils::ConvertRowToProject($row);

        $this->assertEquals(new Project(1, 'title', new DateTime('2022-05-15 12:00:00.000'), '/cover', 'project type', [], '#FFFFFF', '#000000', [], null), $project);
    }

    /**
     * Test de la fonction ConvertAlbumToProject
     * @return void
     */
    public function test_ConvertAlbumToProject(): void
    {
        $rows = [
            ['id' => 1, 'title' => 'title', 'release' => '2022-05-15 12:00:00.000', 'color1' => '#FFFFFF', 'color2' => '#000000', 'cover_path' => '/cover', 'project_type' => 'project type', 'id_rating' => 1, 'rating' => 4, 'created_at' => '2025-05-15 12:00:00.000', 'comment' => 'comment1', 'id_user' => 1],
            ['id' => 1, 'title' => 'title', 'release' => '2022-05-15 12:00:00.000', 'color1' => '#FFFFFF', 'color2' => '#000000', 'cover_path' => '/cover', 'project_type' => 'project type', 'id_rating' => 2, 'rating' => 2, 'created_at' => '2025-08-15 12:00:00.000', 'comment' => 'comment2', 'id_user' => 2]
        ];

        $project = ConvertUtils::ConvertAlbumToProject($rows);

        $this->assertEquals(new Project(1, 'title', new DateTime('2022-05-15 12:00:00.000'), '/cover', 'project type', [], '#FFFFFF', '#000000', [
            1 => new Rating(1, 4, new DateTime('2025-05-15 12:00:00.000'), 'comment1', 1),
            2 => new Rating(2, 2, new DateTime('2025-08-15 12:00:00.000'), 'comment2', 2),
        ], null), $project);
    }
}