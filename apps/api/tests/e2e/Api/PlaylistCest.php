<?php

declare(strict_types=1);

namespace Tests\Api;

use Tests\Support\ApiTester;

final class PlaylistCest
{
    /**
     * Test de /playlist/add
     * @param ApiTester $I
     * @return void
     */
    public function createPlaylist(ApiTester $I)
    {
        $I->haveHttpHeader('accept', 'application/json');
        $I->haveHttpHeader('content-type', 'application/json');
        $I->sendPost(
            '/playlist/add',
            json_encode([
                "id_library" => "2",
                "title" => "test",
                "isPublic" => false,
                "description" => "une description",
                "cover_path" => "/test/path",
                "musics" => [1, 5, 3]
            ])
        );
        $I->seeResponseCodeIs(200);
        $I->seeResponseContainsJson([
            'code' => 200,
            'message' => 'playlist créée avec succès'
        ]);
    }

    /**
     * Test de /playlist/add/music
     * @param ApiTester $I
     * @return void
     */
    public function addMusicToPlaylist(ApiTester $I)
    {
        $I->haveHttpHeader('accept', 'application/json');
        $I->haveHttpHeader('content-type', 'application/json');
        $I->sendPost(
            '/playlist/add/music',
            json_encode([
                "id_playlist" => 4,
                "id_music" => 3
            ])
        );
        $I->seeResponseCodeIs(200);
        $I->seeResponseContainsJson([
            'code' => 200,
            'message' => 'musique ajoutée à la playlist avec succès'
        ]);
    }

    /**
     * Test de /playlist/library/3/all
     * @param ApiTester $I
     * @return void
     */
    public function getAllPlaylistsInLibrary(ApiTester $I)
    {
        $I->haveHttpHeader('accept', 'application/json');
        $I->haveHttpHeader('content-type', 'application/json');
        $I->sendGet('/playlist/library/3/all');
        $I->seeResponseCodeIs(200);
        $I->seeResponseMatchesJsonType([
            'playlists' => [
                [
                    'id' => 'integer',
                    'title' => 'string',
                    'isPublic' => 'boolean',
                    'description' => 'string',
                    'coverPath' => 'string',
                    'musics' => 'array',
                    'nbMusics' => 'integer',
                ]
            ]
        ]);
    }

    /**
     * Test de /playlist/5
     * @param ApiTester $I
     * @return void
     */
    public function getOnePlaylist(ApiTester $I)
    {
        $I->haveHttpHeader('accept', 'application/json');
        $I->haveHttpHeader('content-type', 'application/json');
        $I->sendGet('/playlist/5');
        $I->seeResponseCodeIs(200);
        $I->seeResponseMatchesJsonType([
            'playlist' => [
                'id' => 'integer',
                'title' => 'string',
                'isPublic' => 'boolean',
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

    /**
     * Test de update /playlist/3
     * @param ApiTester $I
     * @return void
     */
    public function updatePlaylist(ApiTester $I)
    {
        $I->haveHttpHeader('accept', 'application/json');
        $I->haveHttpHeader('content-type', 'application/json');
        $I->sendPatch(
            '/playlist/3',
            json_encode([
                "title" => "test",
                "isPublic" => true,
                "description" => "description update",
                "cover_path" => "cover_path update"
            ])
        );
        $I->seeResponseCodeIs(200);
        $I->seeResponseContainsJson([
            'code' => 200,
            'message' => 'playlist modifiée avec succès'
        ]);
    }

    /**
     * Test de delete /playlist/delete/music
     * @param ApiTester $I
     * @return void
     */
    public function deleteMusicInPlaylist(ApiTester $I)
    {
        $I->haveHttpHeader('accept', 'application/json');
        $I->haveHttpHeader('content-type', 'application/json');
        $I->sendDelete(
            '/playlist/delete/music',
            [
                "id_playlist" => 3,
                "id_music" => 5
            ]
        );
        $I->seeResponseCodeIs(200);
        $I->seeResponseContainsJson([
            'code' => 200,
            'message' => 'musique supprimée de la playlist avec succès'
        ]);
    }

    /**
     * Test de delete /playlist/12
     * @param ApiTester $I
     * @return void
     */
    public function deletePlaylist(ApiTester $I)
    {
        $I->haveHttpHeader('accept', 'application/json');
        $I->haveHttpHeader('content-type', 'application/json');
        $I->sendDelete('/playlist/12');
        $I->seeResponseCodeIs(200);
        $I->seeResponseContainsJson([
            'code' => 200,
            'message' => 'playlist supprimée avec succès'
        ]);
    }
}