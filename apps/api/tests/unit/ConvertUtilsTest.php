<?php

use Api\Domain\Class\Artist;
use Api\Domain\Class\Conversation;
use Api\Domain\Class\Genre;
use Api\Domain\Class\Library;
use Api\Domain\Class\Music;
use Api\Domain\Class\Playlist;
use Api\Domain\Class\Project;
use Api\Domain\Class\Rating;
use Api\Domain\Class\User;
use Api\Domain\Class\UserRole;
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

    /**
     * Test de la fonction ConvertAlbumToProject
     * @return void
     */
    public function test_ConvertAlbumToProjectWithAvgRate(): void
    {
        $rows = [
            [
                'project_id' => 1,
                'project_title' => 'title',
                'project_release' => '2022-05-15 12:00:00.000',
                'color1' => '#FFFFFF',
                'color2' => '#000000',
                'cover_path' => '/cover',
                'project_type' => 'project type',
                'music_id' => null,
            ],
            [
                'project_id' => 1,
                'project_title' => 'title',
                'project_release' => '2022-05-15 12:00:00.000',
                'color1' => '#FFFFFF',
                'color2' => '#000000',
                'cover_path' => '/cover',
                'project_type' => 'project type',
                'music_id' => null,
            ],
        ];

        $project = ConvertUtils::ConvertRowsToProjectWithAvgRate($rows, 4.3);

        $this->assertEquals(
            new Project(
                1,
                'title',
                new DateTime('2022-05-15 12:00:00.000'),
                '/cover',
                'project type',
                [],
                '#FFFFFF',
                '#000000',
                null,
                4.3
            ),
            $project
        );
    }

    /**
     * Test de la fonction ConvertAlbumToProject
     * @return void
     */
    public function test_ConvertRowsToArtistIds(): void
    {
        $rows = [
            ['id_artist' => 1],
            ['id_artist' => 2],
            ['id_artist' => 3]
        ];

        $artistIds = ConvertUtils::convertRowsToArtistsIds($rows);

        $this->assertEquals([1, 2, 3], $artistIds);
    }

    /**
     * Test de la fonction ConvertAlbumToProject
     * @return void
     */
    public function test_ConvertRowsToProjects(): void
    {
        $rows = [
            ['id_artist' => 1],
            ['id_artist' => 2],
            ['id_artist' => 3]
        ];

        $artistIds = ConvertUtils::convertRowsToArtistsIds($rows);

        $this->assertEquals([1, 2, 3], $artistIds);
    }

    /**
     * Test de la fonction ConvertRowsToProjects
     * @return void
     */
    public function testConvertRowsToProjects(): void
    {
        $rows = [
            [
                'id' => 1,
                'title' => 'Project One',
                'release' => '2022-05-15 12:00:00.000',
                'cover_path' => '/cover1',
                'project_type' => 'album',
                'color1' => '#FFFFFF',
                'color2' => '#000000',
            ],
            [
                'id' => 2,
                'title' => 'Project Two',
                'release' => '2023-01-10 09:30:00.000',
                'cover_path' => '/cover2',
                'project_type' => 'single',
                'color1' => '#FF0000',
                'color2' => '#00FF00',
            ],
        ];

        $projects = ConvertUtils::convertRowsToProjects($rows);

        $this->assertEquals(
            [
                new Project(
                    1,
                    'Project One',
                    new DateTime('2022-05-15 12:00:00.000'),
                    '/cover1',
                    'album',
                    [],
                    '#FFFFFF',
                    '#000000',
                    null,
                    null
                ),
                new Project(
                    2,
                    'Project Two',
                    new DateTime('2023-01-10 09:30:00.000'),
                    '/cover2',
                    'single',
                    [],
                    '#FF0000',
                    '#00FF00',
                    null,
                    null
                ),
            ],
            $projects
        );
    }

    /**
     * Test de la fonction ConvertRowsToMusicIds
     * @return void
     */
    public function test_ConvertRowsToMusicIds(): void
    {
        $rows = [
            ['id_music' => 1],
            ['id_music' => 2],
            ['id_music' => 3]
        ];

        $musicIds = ConvertUtils::convertRowsToMusicsIds($rows);

        $this->assertEquals([1, 2, 3], $musicIds);
    }

    /**
     * Test de la fonction ConvertRowsToMusicGenres
     * @return void
     */
    public function test_ConvertRowsToMusicGenres(): void
    {
        $rows = [
            ['name' => "pop"],
            ['name' => "rock"],
            ['name' => "jazz"]
        ];

        $genres = ConvertUtils::convertRowsToMusicGenres($rows);

        $this->assertEquals(["pop", "rock", "jazz"], $genres);
    }

    /**
     * Test de la fonction ConvertRowsToArtists
     * @return void
     */
    public function test_ConvertRowsToArtists(): void
    {
        $rows = [
            [
                'id' => 1,
                'name' => 'Artist One',
                'isverified' => true,
                'description' => 'First artist description',
                'image_path' => '/images/artist1.png',
            ],
            [
                'id' => 2,
                'name' => 'Artist Two',
                'isverified' => false,
                'description' => 'Second artist description',
                'image_path' => '/images/artist2.png',
            ],
        ];

        $artists = ConvertUtils::convertRowsToArtists($rows);

        $this->assertEquals(
            [
                new Artist(
                    1,
                    'Artist One',
                    true,
                    'First artist description',
                    '/images/artist1.png',
                    [],
                    [],
                    []
                ),
                new Artist(
                    2,
                    'Artist Two',
                    false,
                    'Second artist description',
                    '/images/artist2.png',
                    [],
                    [],
                    []
                ),
            ],
            $artists
        );
    }

    /**
     * Test de la fonction ConvertRowsToMusicRatings
     * @return void
     */
    public function test_ConvertRowsToMusicRatings(): void
    {
        $rows = [
            [
                'id' => 1,
                'rating' => 4,
                'created_at' => '2025-05-15 12:00:00.000',
                'comment' => 'Very good',
                'id_user' => 10,
            ],
            [
                'id' => 2,
                'rating' => 2,
                'created_at' => '2025-08-15 09:30:00.000',
                'comment' => 'Not great',
                'id_user' => 12,
            ],
        ];

        $ratings = ConvertUtils::convertRowsToMusicRatings($rows);

        $this->assertEquals(
            [
                new Rating(
                    1,
                    4,
                    new DateTime('2025-05-15 12:00:00.000'),
                    'Very good',
                    10
                ),
                new Rating(
                    2,
                    2,
                    new DateTime('2025-08-15 09:30:00.000'),
                    'Not great',
                    12
                ),
            ],
            $ratings
        );
    }

    /**
     * Test de la fonction ConvertRowsToUsers
     * @return void
     */
    public function test_ConvertRowsToUsers(): void
    {
        $rows = [
            [
                // User avec artiste
                'id' => 1,
                'username' => 'john_doe',
                'email' => 'john@test.com',
                'image_path' => '/images/user1.png',

                'id_library' => 10,

                'id_role' => 1,
                'role' => 'ROLE_USER',

                'id_artist' => 5,
                'artist_name' => 'John Artist',
                'isverified' => true,
                'description' => 'Artist description',
                'artist_image_path' => '/images/artist1.png',
            ],
            [
                // User sans artiste
                'id' => 2,
                'username' => 'jane_doe',
                'email' => 'jane@test.com',
                'image_path' => '/images/user2.png',

                'id_library' => 20,

                'id_role' => 2,
                'role' => 'ROLE_ADMIN',

                'id_artist' => null,
                'artist_name' => null,
                'isverified' => null,
                'description' => null,
                'artist_image_path' => null,
            ],
        ];

        $users = ConvertUtils::convertRowsToUsers($rows);

        $this->assertEquals(
            [
                new User(
                    1,
                    'john_doe',
                    'john@test.com',
                    null,
                    '/images/user1.png',
                    new Library(10, [], [], []),
                    new UserRole(1, 'ROLE_USER'),
                    null,
                    null,
                    null,
                    new Artist(
                        5,
                        'John Artist',
                        true,
                        'Artist description',
                        '/images/artist1.png',
                        null,
                        null,
                        null
                    )
                ),
                new User(
                    2,
                    'jane_doe',
                    'jane@test.com',
                    null,
                    '/images/user2.png',
                    new Library(20, [], [], []),
                    new UserRole(2, 'ROLE_ADMIN'),
                    null,
                    null,
                    null,
                    null
                ),
            ],
            $users
        );
    }

    /**
     * Test de la fonction ConvertRowsToUser
     * @return void
     */
    public function test_ConvertRowToUser(): void
    {
        $row = [
            'id' => 1,
            'username' => 'john_doe',
            'email' => 'john@test.com',
            'image_path' => '/images/user1.png',

            'id_library' => 10,

            'id_role' => 1,
            'role' => 'ROLE_USER',

            'id_artist' => 5,
            'artist_name' => 'John Artist',
            'isverified' => true,
            'description' => 'Artist description',
            'artist_image_path' => '/images/artist1.png',
        ];

        $userFriends = ['friend1', 'friend2'];
        $userConversations = ['conv1', 'conv2'];

        $user = ConvertUtils::convertRowToUser($row, $userFriends, $userConversations);

        $this->assertEquals(
            new User(
                1,
                'john_doe',
                'john@test.com',
                null,
                '/images/user1.png',
                new Library(10, [], [], []),
                new UserRole(1, 'ROLE_USER'),
                $userFriends,
                $userConversations,
                null,
                new Artist(
                    5,
                    'John Artist',
                    true,
                    'Artist description',
                    '/images/artist1.png',
                    null,
                    null,
                    null
                )
            ),
            $user
        );
    }

    /**
     * Test de la fonction ConvertRowsToUserFriends
     * @return void
     */
    public function test_ConvertRowsToUserFriends(): void
    {
        $rows = [
            [
                // Cas où initialUserId = u2_id
                'u1_id' => 1,
                'u1_username' => 'alice',
                'u1_email' => 'alice@test.com',
                'u1_image_path' => '/images/alice.png',
                'u1_id_library' => 11,
                'u1_id_role' => 1,
                'u1_role' => 'ROLE_USER',

                'u2_id' => '100',
                'u2_username' => 'current_user',
                'u2_email' => 'current@test.com',
                'u2_image_path' => '/images/current.png',
                'u2_id_library' => 100,
                'u2_id_role' => 2,
                'u2_role' => 'ROLE_ADMIN',
            ],
            [
                // Cas où initialUserId != u2_id
                'u1_id' => 2,
                'u1_username' => 'bob',
                'u1_email' => 'bob@test.com',
                'u1_image_path' => '/images/bob.png',
                'u1_id_library' => 12,
                'u1_id_role' => 1,
                'u1_role' => 'ROLE_USER',

                'u2_id' => '200',
                'u2_username' => 'charlie',
                'u2_email' => 'charlie@test.com',
                'u2_image_path' => '/images/charlie.png',
                'u2_id_library' => 13,
                'u2_id_role' => 3,
                'u2_role' => 'ROLE_GUEST',
            ],
        ];

        $initialUserId = '100';

        $friends = ConvertUtils::convertRowsToUserFriends($rows, $initialUserId);

        $this->assertEquals(
            [
                // initialUserId = u2_id => on prend u1
                new User(
                    1,
                    'alice',
                    'alice@test.com',
                    null,
                    '/images/alice.png',
                    new Library(11, [], [], []),
                    new UserRole(1, 'ROLE_USER'),
                    null,
                    null,
                    null,
                    null
                ),
                // initialUserId != u2_id => on prend u2
                new User(
                    '200',
                    'charlie',
                    'charlie@test.com',
                    null,
                    '/images/charlie.png',
                    new Library(13, [], [], []),
                    new UserRole(3, 'ROLE_GUEST'),
                    null,
                    null,
                    null,
                    null
                ),
            ],
            $friends
        );
    }

    /**
     * Test de la fonction ConvertRowsToConversations
     * @return void
     */
    public function testConvertRowsToConversations(): void
    {
        $rows = [
            [
                'id' => 1,
                'name' => 'Conversation One',
                'created_at' => '2025-01-15 10:00:00.000',
                'image_path' => '/images/conversation1.png',
            ],
            [
                'id' => 2,
                'name' => 'Conversation Two',
                'created_at' => '2025-02-20 15:30:00.000',
                'image_path' => '/images/conversation2.png',
            ],
        ];

        $conversations = ConvertUtils::convertRowsToConversations($rows);

        $this->assertEquals(
            [
                new Conversation(
                    1,
                    'Conversation One',
                    new DateTime('2025-01-15 10:00:00.000'),
                    '/images/conversation1.png',
                    null,
                    null,
                    null
                ),
                new Conversation(
                    2,
                    'Conversation Two',
                    new DateTime('2025-02-20 15:30:00.000'),
                    '/images/conversation2.png',
                    null,
                    null,
                    null
                ),
            ],
            $conversations
        );
    }
}