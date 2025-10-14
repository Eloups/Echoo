<?php

use Api\Domain\Class\Playlist;
use Api\Domain\Class\Rating;
use PHPUnit\Framework\TestCase;
use Api\Domain\Class\Artist;
use Api\Domain\Class\Network;
use Api\Domain\Class\Project;
use Api\Domain\Class\ProjectType;
use Api\Domain\Class\User;
use Api\Domain\Class\Library;
use Api\Domain\Class\Genre;
use Api\Domain\Class\Message;
use Api\Domain\Class\Music;
use Api\Domain\Class\UserRole;
use Api\Domain\Class\Conversation;

/**
 * Classe de test unitaire pour les classes du domaine
 */
class DomainClassTest extends TestCase
{
    /**
     * Méthode pour tester Artist.php
     * @return void
     */
    public function test_artist_class()
    {
        // Création des données de tests
        $id = null;
        $name = "Elouan";
        $isVerified = false;
        $description = "Description";
        $image_path = "image_path";
        $network = [
            new Network(1, "instagram", "instagram/Elouan"),
            new Network(2, "discord", "discord/Elouan"),
        ];
        $projects = [
            new Project(
                null,
                "title",
                new DateTime("2025-10-09 14:33:00"),
                "cover_path",
                new ProjectType(1, "album"),
                [], "color1", "color2"
            ),
        ];
        $featuring = [];

        $artist = new Artist(
            $id,
            $name,
            $isVerified,
            $description,
            $image_path,
            $network,
            $projects,
            $featuring
        );

        // Assertion pour vérifier que l'objet est bien créé
        $this->assertEquals($id, $artist->getId());
        $this->assertEquals($name, $artist->getName());
        $this->assertFalse($isVerified, $artist->getIsVerified());
        $this->assertEquals($description, $artist->getDescription());
        $this->assertEquals($image_path, $artist->getImagePath());
        $this->assertEquals($network, $artist->getNetwork());
        $this->assertEquals($projects, $artist->getProjects());
        $this->assertEquals($featuring, $artist->getFeaturedMusic());
    }

    /**
     * Méthode pour tester Conversation.php
     * @return void
     */
    public function test_conversation_class()
    {
        // Création des données de tests
        $id = null;
        $name = "Thibault";
        $createdAt = new DateTime("2023-05-12 14:30:25");
        $imagePath = "image_path";
        $creator = new User(
            null,
            "name",
            "email",
            "password",
            "image_path",
            new Library(null, [], [], []),
            new UserRole(1, "admin"),
            [],
            [],
            [],
            null
        );
        $messages = [
            new Message(
                null,
                new DateTime("2023-05-12 14:30:25"),
                "content",
                new Music(
                    null,
                    "title",
                    120,
                    new DateTime("2023-05-12 14:30:25"),
                    "file_path",
                    [new Genre(1, "pop")],
                    20000,
                    []
                ),
                new User(
                    null,
                    "username",
                    "email",
                    "password",
                    "image_path",
                    new Library(null, [], [], []),
                    new UserRole(1, "admin"),
                    [],
                    [],
                    [],
                    null
                )
            ),
        ];
        $participants = [
            new Message(
                null,
                new DateTime("2023-05-12 14:30:25"),
                "content",
                new Music(
                    null,
                    "title",
                    120,
                    new DateTime("2023-05-12 14:30:25"),
                    "file_path",
                    [new Genre(1, "pop")],
                    20000,
                    []
                ),
                new User(
                    null,
                    "username",
                    "email",
                    "password",
                    "image_path",
                    new Library(null, [], [], []),
                    new UserRole(1, "admin"),
                    [],
                    [],
                    [],
                    null
                )
            ),
        ];

        $conversation = new Conversation(
            $id,
            $name,
            $createdAt,
            $imagePath,
            $messages,
            $creator,
            $participants
        );

        // Assertion pour vérifier que l'objet est bien créé
        $this->assertEquals($id, $conversation->getId());
        $this->assertEquals($name, $conversation->getName());
        $this->assertEquals($createdAt, $conversation->getCreatedAt());
        $this->assertEquals($imagePath, $conversation->getImagePath());
        $this->assertEquals($messages, $conversation->getMessages());
        $this->assertEquals($creator, $conversation->getCreator());
        $this->assertEquals($participants, $conversation->getParticipants());
    }

    /**
     * Méthode pour tester Genre.php
     * @return void
     */
    public function test_genre_class()
    {
        // Création des données de tests
        $id = null;
        $name = "name";

        $genre = new Genre($id, $name);

        // Assertion pour vérifier que l'objet est bien créé
        $this->assertEquals($id, $genre->getId());
        $this->assertEquals($name, $genre->getName());
    }

    /**
     * Méthode pour tester Library.php
     * @return void
     */
    public function test_library_class()
    {
        // Création des données de tests
        $id = null;
        $authors = [
            new Artist(
                null,
                "Elouan",
                false,
                "Description",
                "image_path",
                [
                    new Network(1, "instagram", "instagram/Elouan"),
                    new Network(2, "discord", "discord/Elouan"),
                ],
                [
                    new Project(
                        null,
                        "title",
                        new DateTime("2025-10-09 14:33:00"),
                        "cover_path",
                        new ProjectType(1, "album"),
                        [], "color1", "color2"
                    ),
                ],
                []
            ),
        ];
        $playlists = [
            new Playlist(null, "title", true, null, null, [
                new Music(
                    null,
                    "title",
                    120,
                    new DateTime("2023-05-12 14:30:25"),
                    "file_path",
                    [new Genre(1, "pop")],
                    20000,
                    []
                ),
                new User(
                    null,
                    "username",
                    "email",
                    "password",
                    "image_path",
                    new Library(null, [], [], []),
                    new UserRole(1, "admin"),
                    [],
                    [],
                    [],
                    null
                ),
            ]),
        ];
        $projects = [
            new Project(
                null,
                "title",
                new DateTime("2025-10-09 14:33:00"),
                "cover_path",
                new ProjectType(1, "album"),
                [], "color1", "color2"
            ),
        ];

        $library = new Library($id, $authors, $playlists, $projects);

        // Assertion pour vérifier que l'objet est bien créé
        $this->assertEquals($id, $library->getId());
        $this->assertEquals($authors, $library->getAuthors());
        $this->assertEquals($playlists, $library->getPlaylists());
        $this->assertEquals($projects, $library->getProjects());
    }
    /**
     * Méthode pour tester Message.php
     * @return void
     */
    public function test_message_class()
    {
        // Création des données de tests
        $id = null;
        $sendAt = new DateTime("2025-04-19 13:25:04");
        $content = "content";
        $music = new Music(
            null,
            "title",
            120,
            new DateTime("2023-05-12 14:30:25"),
            "file_path",
            [new Genre(1, "pop")],
            20000,
            []
        );
        $user = new User(
            null,
            "username",
            "email",
            "password",
            "image_path",
            new Library(null, [], [], []),
            new UserRole(1, "admin"),
            [],
            [],
            [],
            null
        );

        $message = new Message($id, $sendAt, $content, $music, $user);

        // Assertion pour vérifier que l'objet est bien créé
        $this->assertEquals($id, $message->getId());
        $this->assertEquals($sendAt, $message->getSendAt());
        $this->assertEquals($content, $message->getContent());
        $this->assertEquals($music, $message->getMusic());
        $this->assertEquals($user, $message->getUser());
    }

    /**
     * Méthode pour tester Music.php
     * @return void
     */
    public function test_music_class()
    {
        // Création des données de tests
        $id = null;
        $title = "title";
        $duration = 120;
        $release = new DateTime("2023-05-12 14:30:25");
        $file_path = "file_path";
        $genre = [new Genre(1, "pop")];
        $nbstreams = 20000;

        $rates = [
            new Rating(
                null,
                4,
                null,
                new User(
                    null,
                    "username",
                    "email",
                    "password",
                    "image_path",
                    new Library(null, [], [], []),
                    new UserRole(1, "admin"),
                    [],
                    [],
                    [],
                    null
                )
            ),
        ];

        $music = new Music(
            $id,
            $title,
            $duration,
            $release,
            $file_path,
            $genre,
            $nbstreams,
            $rates
        );

        // Assertion pour vérifier que l'objet est bien créé

        $this->assertEquals($id, $music->getId());
        $this->assertEquals($title, $music->getTitle());
        $this->assertEquals($duration, $music->getDuration());
        $this->assertEquals($release, $music->getRelease());
        $this->assertEquals($file_path, $music->getFilePath());
        $this->assertEquals($genre, $music->getGenres());
        $this->assertEquals($nbstreams, $music->getNbstreams());
        $this->assertEquals($rates, $music->getRates());
    }

    /**
     * Méthode pour tester Network.php
     * @return void
     */
    public function test_network_class()
    {
        // Création des données de tests
        $id = null;
        $name = "Instagram";
        $link = "instagram/romain";

        $network = new Network($id, $name, $link);

        // Assertion pour vérifier que l'objet est bien créé

        $this->assertEquals($id, $network->getId());
        $this->assertEquals($name, $network->getName());
        $this->assertEquals($link, $network->getLink());
    }

    /**
     * Méthode pour tester Playlist.php
     * @return void
     */
    public function test_playlist_class()
    {
        // Création des données de tests
        $id = null;
        $title = "title";
        $isPublic = true;
        $description = "description";
        $cover_path = "cover_path";
        $musics = [
            new Music(
                null,
                "title",
                120,
                new DateTime("2023-05-12 14:30:25"),
                "file_path",
                [new Genre(1, "pop")],
                20000,
                []
            ),
        ];

        $playlist = new Playlist(
            $id,
            $title,
            $isPublic,
            $description,
            $cover_path,
            $musics
        );

        // Assertion pour vérifier que l'objet est bien créé
        $this->assertEquals($id, $playlist->getId());
        $this->assertEquals($title, $playlist->getTitle());
        $this->assertTrue($isPublic, $playlist->isPublic());
        $this->assertEquals($description, $playlist->getDescription());
        $this->assertEquals($cover_path, $playlist->getCoverPath());
        $this->assertEquals($musics, $playlist->getMusics());
    }

    /**
     * Méthode pour tester Project.php
     * @return void
     */
    public function test_project_class()
    {
        // Création des données de tests
        $id = null;
        $title = "title";
        $release = new DateTime("2025-02-14 10:26:25");
        $cover_path = "cover_path";
        $projectType = new ProjectType(2, "single");
        $musics = [
            new Music(
                null,
                "title",
                120,
                new DateTime("2023-05-12 14:30:25"),
                "file_path",
                [new Genre(1, "pop")],
                20000,
                []
            ),
        ];
        $color1 = "color1";
        $color2 = "color2";

        $project = new Project(
            $id,
            $title,
            $release,
            $cover_path,
            $projectType,
            $musics,
            $color1,
            $color2
        );

        // Assertion pour vérifier que l'objet est bien créé
        $this->assertEquals($id, $project->getId());
        $this->assertEquals($title, $project->getTitle());
        $this->assertEquals($release, $project->getRelease());
        $this->assertEquals($cover_path, $project->getCoverPath());
        $this->assertEquals($musics, $project->getMusics());
    }

    /**
     * Méthode pour tester ProjectType.php
     * @return void
     */
    public function test_project_type_class()
    {
        // Création des données de tests
        $id = null;
        $name = "album";

        $projectType = new ProjectType($id, $name);

        // Assertion pour vérifier que l'objet est bien créé
        $this->assertEquals($id, $projectType->getId());
        $this->assertEquals($name, $projectType->getName());
    }

    /**
     * Méthode pour tester Rating.php
     * @return void
     */
    public function test_Rating_class()
    {
        // Création des données de tests
        $id = null;
        $rate = 3;
        $comment = "un commentaire";
        $user = new User(
            null,
            "username",
            "email",
            "password",
            "image_path",
            new Library(null, [], [], []),
            new UserRole(1, "admin"),
            [],
            [],
            [],
            null
        );

        $rating = new Rating($id, $rate, $comment, $user);

        // Assertion pour vérifier que l'objet est bien créé
        $this->assertEquals($id, $rating->getId());
        $this->assertEquals($rate, $rating->getRate());
        $this->assertEquals($comment, $rating->getComment());
    }

    /**
     * Méthode pour tester User.php
     * @return void
     */
    public function test_user_class()
    {
        // Création des données de tests
        $id = null;
        $username = "Romain";
        $email = "romain@gmail.com";
        $password = "password";
        $imagePath = "/img/image.png";
        $library = new Library(
            null,
            [
                new Artist(
                    $id,
                    $username,
                    false,
                    "description",
                    "image_path",
                    [
                        new Network(1, "instagram", "instagram/Elouan"),
                        new Network(2, "discord", "discord/Elouan"),
                    ],
                    [
                        new Project(
                            null,
                            "title",
                            new DateTime("2025-10-09 14:33:00"),
                            "cover_path",
                            new ProjectType(1, "album"),
                            [], "color1", "color2"
                        ),
                    ],
                    []
                ),
            ],
            [
                new Playlist(null, "title", true, null, null, [
                    new Music(
                        null,
                        "title",
                        120,
                        new DateTime("2023-05-12 14:30:25"),
                        "file_path",
                        [new Genre(1, "pop")],
                        20000,
                        []
                    ),
                    new User(
                        null,
                        "username",
                        "email",
                        "password",
                        "image_path",
                        new Library(null, [], [], []),
                        new UserRole(1, "admin"),
                        [],
                        [],
                        [],
                        null
                    ),
                ]),
            ],
            [
                new Project(
                    null,
                    "title",
                    new DateTime("2025-10-09 14:33:00"),
                    "cover_path",
                    new ProjectType(1, "album"),
                    [], "color1", "color2"
                ),
            ]
        );
        $userRole = new UserRole(null, "modérateur");
        $friends = [
            new User(
                null,
                "username",
                "email",
                "password",
                "image_path",
                new Library(null, [], [], []),
                new UserRole(1, "admin"),
                [],
                [],
                [],
                null
            ),
            new User(
                null,
                "name",
                "email",
                "password",
                "image_path",
                new Library(null, [], [], []),
                new UserRole(1, "admin"),
                [],
                [],
                [],
                null
            ),
            new User(
                null,
                "username",
                "email",
                "password",
                "image_path",
                new Library(null, [], [], []),
                new UserRole(1, "admin"),
                [],
                [],
                [],
                null
            ),
            new User(
                null,
                "name",
                "email",
                "password",
                "image_path",
                new Library(null, [], [], []),
                new UserRole(1, "admin"),
                [],
                [],
                [],
                null
            ),
        ];
        $conversations = [
            new Conversation(
                null,
                "Thibault",
                new DateTime("2023-05-12 14:30:25"),
                "image_path",
                [
                    new Message(
                        null,
                        new DateTime("2023-05-12 14:30:25"),
                        "content",
                        new Music(
                            null,
                            "title",
                            120,
                            new DateTime("2023-05-12 14:30:25"),
                            "file_path",
                            [new Genre(1, "pop")],
                            20000,
                            []
                        ),
                        new User(
                            null,
                            "username",
                            "email",
                            "password",
                            "image_path",
                            new Library(null, [], [], []),
                            new UserRole(1, "admin"),
                            [],
                            [],
                            [],
                            null
                        )
                    ),
                ],
                new User(
                    null,
                    "name",
                    "email",
                    "password",
                    "image_path",
                    new Library(null, [], [], []),
                    new UserRole(1, "admin"),
                    [],
                    [],
                    [],
                    null
                ),
                [
                    new Message(
                        null,
                        new DateTime("2023-05-12 14:30:25"),
                        "content",
                        new Music(
                            null,
                            "title",
                            120,
                            new DateTime("2023-05-12 14:30:25"),
                            "file_path",
                            [new Genre(1, "pop")],
                            20000,
                            []
                        ),
                        new User(
                            null,
                            "username",
                            "email",
                            "password",
                            "image_path",
                            new Library(null, [], [], []),
                            new UserRole(1, "admin"),
                            [],
                            [],
                            [],
                            null
                        )
                    ),
                ]
            ),
        ];
        $rates = [
            new Rating(
                null,
                4,
                null,
                new User(
                    null,
                    "username",
                    "email",
                    "password",
                    "image_path",
                    new Library(null, [], [], []),
                    new UserRole(1, "admin"),
                    [],
                    [],
                    [],
                    null
                )
            ),
        ];
        $artist = new Artist(
            $id,
            $username,
            false,
            "description",
            "image_path",
            [
                new Network(1, "instagram", "instagram/Elouan"),
                new Network(2, "discord", "discord/Elouan"),
            ],
            [
                new Project(
                    null,
                    "title",
                    new DateTime("2025-10-09 14:33:00"),
                    "cover_path",
                    new ProjectType(1, "album"),
                    [], "color1", "color2"
                ),
            ],
            [
                new Playlist(null, "title", true, null, null, [
                    new Music(
                        null,
                        "title",
                        120,
                        new DateTime("2023-05-12 14:30:25"),
                        "file_path",
                        [new Genre(1, "pop")],
                        20000,
                        []
                    ),
                    new User(
                        null,
                        "username",
                        "email",
                        "password",
                        "image_path",
                        new Library(null, [], [], []),
                        new UserRole(1, "admin"),
                        [],
                        [],
                        [],
                        null
                    ),
                ]),
            ]
        );

        $user = new User(
            $id,
            $username,
            $email,
            $password,
            $imagePath,
            $library,
            $userRole,
            $friends,
            $conversations,
            $rates,
            $artist
        );

        // Assertion pour vérifier que l'objet est bien créé
        $this->assertEquals($id, $user->getId());
        $this->assertEquals($username, $user->getUsername());
        $this->assertEquals($email, $user->getEmail());
        $this->assertEquals($password, $user->getPassword());
        $this->assertEquals($imagePath, $user->getImagePath());
        $this->assertEquals($library, $user->getLibrary());
        $this->assertEquals($userRole, $user->getUserRole());
        $this->assertEquals($friends, $user->getFriends());
        $this->assertEquals($conversations, $user->getConversations());
        $this->assertEquals($rates, $user->getRates());
        $this->assertEquals($artist, $user->getArtist());
    }

    /**
     * Méthode pour tester UserRole.php
     * @return void
     */
    public function test_user_role_class()
    {
        // Création des données de tests
        $id = 1;
        $name = "modérateur";

        $role = new UserRole($id, $name);

        // Assertion pour vérifier que l'objet est bien créé
        $this->assertEquals($id, $role->getId());
        $this->assertEquals($name, $role->getName());
    }
}
