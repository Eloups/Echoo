<?php

declare(strict_types=1);

namespace Tests\Api;

use Tests\Support\ApiTester;

final class UsersCest
{
    public function GetOneUser(ApiTester $I): void
    {
        $I->haveHttpHeader('accept', 'application/json');
        $I->haveHttpHeader('content-type', 'application/json');
        $response = $I->sendGet('/users/1');
        $I->seeResponseCodeIs(200);
        $I->seeResponseIsJson();
    }

    /**
     * Test de /user/3/listened/musics
     * @param ApiTester $I
     * @return void
     */
    public function getLastListenedMusics(ApiTester $I)
    {
        $I->haveHttpHeader('accept', 'application/json');
        $I->haveHttpHeader('content-type', 'application/json');
        $response = $I->sendGet('/user/3/listened/musics');
        $I->seeResponseCodeIs(200);
        $I->seeResponseMatchesJsonType([
            'musics' => [
                [
                    'id' => 'integer',
                    'title' => 'string',
                    'duration' => 'integer',
                    'release' => 'string',
                    'filePath' => 'string',
                    'genres' => 'array',
                    'nbStreams' => 'integer',
                    'rates' => 'array|null',
                    'nameArtist' => 'string|null',
                ]
            ]
        ]);
    }

    /**
     * Test de /user/listened/musics/add
     * @param ApiTester $I
     * @return void
     */
    public function AddListenedMusic(ApiTester $I)
    {
        $I->haveHttpHeader('accept', 'application/json');
        $I->haveHttpHeader('content-type', 'application/json');
        $I->sendPost(
            '/user/listened/musics/add',
            json_encode([
                'id_user' => "1",
                'id_music' => 1
            ])
        );
        $I->seeResponseCodeIs(201);
        $I->seeResponseContainsJson([
            'code' => 201,
            'message' => 'Musique ajoutée aux musiques écoutées'
        ]);
    }

    /**
     * Test de /user/3/lastListened/musics
     * @param ApiTester $I
     * @return void
     */
    public function getMostListenedMusics(ApiTester $I)
    {
        $I->haveHttpHeader('accept', 'application/json');
        $I->haveHttpHeader('content-type', 'application/json');
        $response = $I->sendGet('/user/3/lastListened/musics');
        $I->seeResponseCodeIs(200);
        $I->seeResponseMatchesJsonType([
            'musics' => 'array'
        ]);
    }

    /**
     * Test de create /users
     * @param ApiTester $I
     * @return void
     */
    public function createUser(ApiTester $I)
    {
        $I->haveHttpHeader('accept', 'application/json');
        $I->haveHttpHeader('content-type', 'application/json');
        $I->sendPost(
            '/users',
            json_encode([
                "id" => "52TESTIs",
                "username" => "test",
                "email" => "tessst@test.com",
                "image_path" => null,
                "id_role" => 1,
                "id_artist" => null
            ])
        );
        $I->seeResponseCodeIs(201);
        $I->seeResponseContainsJson([
            'code' => 201,
            'message' => 'User created'
        ]);
    }

    /**
     * Test de update /users/1
     * @param ApiTester $I
     * @return void
     */
    public function updateUser(ApiTester $I)
    {
        $I->haveHttpHeader('accept', 'application/json');
        $I->haveHttpHeader('content-type', 'application/json');
        $I->sendPut(
            '/users/1',
            json_encode([
                "username" => "test",
                "email" => "tssest@test.com",
                "image_path" => "imgTest.png",
                "id_role" => 1
            ])
        );
        $I->seeResponseCodeIs(200);
        $I->seeResponseContainsJson([
            'code' => 200,
            'message' => 'User updated'
        ]);
    }


    /**
     * Test de delete /users/1
     * @param ApiTester $I
     * @return void
     */
    public function deleteUser(ApiTester $I)
    {
        $I->haveHttpHeader('accept', 'application/json');
        $I->haveHttpHeader('content-type', 'application/json');
        $I->sendDelete('/users/1');
        $I->seeResponseCodeIs(200);
        $I->seeResponseContainsJson([
            'code' => 200,
            'message' => 'User deleted'
        ]);
    }

    /**
     * Test de get /user/2/follows/artists/releases
     * @param ApiTester $I
     * @return void
     */
    public function getLastFollowArtistsReleases(ApiTester $I)
    {
        $I->haveHttpHeader('accept', 'application/json');
        $I->haveHttpHeader('content-type', 'application/json');
        $response = $I->sendGet('/user/2/follows/artists/releases');
        $I->seeResponseCodeIs(200);
        $I->seeResponseMatchesJsonType([
            'projects' => [
                [
                    'id' => 'integer',
                    'title' => 'string',
                    'release' => 'string',
                    'coverPath' => 'string',
                    'projectType' => 'string',
                    'musics' => 'array',
                    'color1' => 'string',
                    'color2' => 'string',
                    'rates' => 'array|null',
                    'avgRate' => 'float|null',
                ]
            ]
        ]);
    }

    /**
     * Test de get all /users
     * @param ApiTester $I
     * @return void
     */
    public function getAllUsers(ApiTester $I)
    {
        $I->haveHttpHeader('accept', 'application/json');
        $I->haveHttpHeader('content-type', 'application/json');
        $response = $I->sendGet('/users');
        $I->seeResponseCodeIs(200);
        $I->seeResponseMatchesJsonType([
            'users' => [
                [
                    'id' => 'string',
                    'username' => 'string',
                    'email' => 'string',
                    'password' => 'string|null',
                    'imagePath' => 'string|null',
                    'library' => [
                        'id' => 'string',
                        'authors' => 'array',
                        'playlists' => 'array',
                        'projects' => 'array',
                    ],
                    'userRole' => [
                        'id' => 'integer',
                        'name' => 'string',
                    ],
                    'artist' => 'array|null',
                    'friends' => 'array|null',
                    'conversations' => 'array|null',
                    'rates' => 'array|null',
                ]
            ]
        ]);
    }

    public function getLikedPlaylist(ApiTester $I)
    {
        $I->haveHttpHeader('accept', 'application/json');
        $I->haveHttpHeader('content-type', 'application/json');
        $response = $I->sendGet('/users/5/liked/playlist');
        $I->seeResponseCodeIs(200);
        $I->seeResponseMatchesJsonType([
            'playlist' => [
                'id' => 'integer',
                'title' => 'string',
                'public' => 'boolean',
                'description' => 'string',
                'coverPath' => 'string',
                'musics' => [
                    [
                        'id' => 'integer',
                        'title' => 'string',
                        'duration' => 'integer',
                        'release' => 'string',
                        'filePath' => 'string',
                        'genres' => 'array',
                        'nbStreams' => 'integer',
                        'rates' => 'array',
                        'nameArtist' => 'string|null',
                    ]
                ],
                'nbMusics' => 'integer|null',
            ]
        ]);
    }
}
