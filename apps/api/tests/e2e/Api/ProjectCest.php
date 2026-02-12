<?php

declare(strict_types=1);

namespace Tests\Api;

use Tests\Support\ApiTester;

final class ProjectCest
{
    /**
     * Test de /project/3
     * @param ApiTester $I
     * @return void
     */
    public function getOneProject(ApiTester $I)
    {
        $I->haveHttpHeader('accept', 'application/json');
        $I->haveHttpHeader('content-type', 'application/json');
        $I->sendGet('/project/3');
        $I->seeResponseCodeIs(200);
        $I->seeResponseMatchesJsonType([
            'project' => [
                'id' => 'integer',
                'title' => 'string',
                'release' => 'string',
                'coverPath' => 'string',
                'projectType' => 'string',
                'musics' => [
                    [
                        'id' => 'integer',
                        'title' => 'string',
                        'duration' => 'integer',
                        'release' => 'string',
                        'filePath' => 'string',
                        'genres' => 'array|null',
                        'nbStreams' => 'integer',
                        'rates' => 'array|null',
                        'nameArtist' => 'string|null',
                    ]
                ],
                'color1' => 'string',
                'color2' => 'string',
                'rates' => 'array|null',
                'avgRate' => 'float|null',
                'artistName' => 'string|null',
            ]
        ]);
    }

    /**
     * Test de /project/library/3/all
     * @param ApiTester $I
     * @return void
     */
    public function getAllProjectsInLibrary(ApiTester $I)
    {
        $I->haveHttpHeader('accept', 'application/json');
        $I->haveHttpHeader('content-type', 'application/json');
        $I->sendGet('/project/library/3/all');
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
                    'rates' => 'array',
                    'avgRate' => 'float|null',
                    'artistName' => 'string'
                ]
            ]
        ]);
    }

    /**
     * Test de /project/like
     * @param ApiTester $I
     * @return void
     */
    public function postLikeProject(ApiTester $I)
    {
        $I->haveHttpHeader('accept', 'application/json');
        $I->haveHttpHeader('content-type', 'application/json');
        $I->sendPost(
            '/project/like',
            json_encode([
                'id_user' => 6,
                'id_project' => 7
            ])
        );
        $I->seeResponseCodeIs(200);
        $I->seeResponseContainsJson([
            'code' => 200,
            'message' => 'Like ajouté avec succès'
        ]);
    }
}