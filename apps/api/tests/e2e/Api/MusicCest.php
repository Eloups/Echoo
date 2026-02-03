<?php

declare(strict_types=1);

namespace Tests\Api;

use Tests\Support\ApiTester;

final class MusicCest
{
    /**
     * Test de /music/{id}/coverPath
     * @param ApiTester $I
     * @return void
     */
    public function GetCoverPathProjectWithIdMusic(ApiTester $I): void
    {
        $I->haveHttpHeader('accept', 'application/json');
        $I->haveHttpHeader('content-type', 'application/json');
        $response = $I->sendGet('/music/10/coverPath');
        $I->seeResponseCodeIs(200);
        $I->seeResponseIsJson('{
            "cover_path": "RadicalOptimism.jpg"
        }');
    }

    /**
     * Test de /musics/1/ratings
     * @param ApiTester $I
     * @return void
     */
    public function GetMusicRatings(ApiTester $I): void
    {
        $I->haveHttpHeader('accept', 'application/json');
        $I->haveHttpHeader('content-type', 'application/json');
        $response = $I->sendGet('/musics/1/ratings');
        $I->seeResponseCodeIs(200);
        $I->seeResponseIsJson();
        $I->seeResponseContainsJson([
            'ratings' => [
                [
                    'id' => 1,
                    'rate' => 5,
                    'createdAt' => '2025-10-03',
                    'comment' => 'Comment 1',
                    'user' => 1,
                ],
                [
                    'id' => 16,
                    'rate' => 4,
                    'createdAt' => '2025-10-18',
                    'comment' => 'Comment 16',
                    'user' => 6,
                ],
            ],
        ]);
    }

    /**
     * Test de /music/like
     * @param ApiTester $I
     * @return void
     */
    public function PostLikeMusic(ApiTester $I): void
    {
        $I->haveHttpHeader('accept', 'application/json');
        $I->haveHttpHeader('content-type', 'application/json');

        $I->sendPost(
            '/music/like',
            json_encode([
                'id_user' => 5,
                'id_music' => 11
            ])
        );

        $I->seeResponseCodeIs(200);
        $I->seeResponseIsJson();
        $I->seeResponseContainsJson([
            'code' => 200,
            'message' => 'Like ajouté avec succès'
        ]);
    }

    /**
     * Test de /musics/artist/1
     * @param ApiTester $I
     * @return void
     */
    public function GetMusicsFromArtist(ApiTester $I): void
    {
        $I->haveHttpHeader('accept', 'application/json');
        $I->haveHttpHeader('content-type', 'application/json');

        $I->sendGet('/musics/artist/1');

        $I->seeResponseCodeIs(200);
        $I->seeResponseIsJson();
        $I->seeResponseMatchesJsonType([
            'musics' => [
                [
                    'id' => 'integer',
                    'title' => 'string',
                    'duration' => 'integer',
                    'release' => 'string',
                    'filePath' => 'string',

                    'genres' => [
                        [
                            'id' => 'integer',
                            'name' => 'string',
                        ]
                    ],

                    'nbStreams' => 'integer',

                    'rates' => [
                        [
                            'id' => 'integer',
                            'rate' => 'integer',
                            'createdAt' => 'string|null',
                            'comment' => 'string|null',
                            'user' => 'integer|null',
                        ]
                    ],

                    'nameArtist' => 'string|null',
                ]
            ]
        ]);
    }
}
