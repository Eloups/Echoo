<?php

declare(strict_types=1);

namespace Tests\Api;

use Tests\Support\ApiTester;

final class ArtistCest
{
    /**
     * Test de /artist/1/page
     * @param ApiTester $I
     * @return void
     */
    public function getArtistPage(ApiTester $I) {
        $I->haveHttpHeader('accept', 'application/json');
        $I->haveHttpHeader('content-type', 'application/json');
        $response = $I->sendGet('/artist/1/page');
        $I->seeResponseCodeIs(200);
        $I->seeResponseMatchesJsonType([
            'artist' => [
                'id' => 'integer',
                'name' => 'string',
                'isVerified' => 'boolean',
                'description' => 'string',
                'imagePath' => 'string',
                'nbLikes' => 'integer',
                'popularMusics' => 'array',
                'lastReleases' => 'array',
            ]
        ]);
    }

    /**
     * Test de /artist/listened/month
     * @param ApiTester $I
     * @return void
     */
    public function getMostListenedArtist(ApiTester $I) {
        $I->haveHttpHeader('accept', 'application/json');
        $I->haveHttpHeader('content-type', 'application/json');
        $response = $I->sendGet('/artist/listened/month');
        $I->seeResponseCodeIs(200);
        $I->seeResponseMatchesJsonType([
            'artists' => [
                [
                    'id' => 'integer',
                    'name' => 'string',
                    'isVerified' => 'boolean',
                    'description' => 'string',
                    'imagePath' => 'string',
                    'network' => 'array',
                    'projects' => 'array',
                    'featuredMusic' => 'array',
                ]
            ]
        ]);
    }

    /**
     * Test de /artist/like
     * @param ApiTester $I
     * @return void
     */
    public function postLikeArtist(ApiTester $I) {
        $I->haveHttpHeader('accept', 'application/json');
        $I->haveHttpHeader('content-type', 'application/json');
        $I->sendPost(
            '/artist/like',
            json_encode([
                'id_user' => "2",
                'id_artist' => 8
            ])
        );
        $I->seeResponseCodeIs(200);
        $I->seeResponseContainsJson([
            'code' => 200,
            'message' => 'Like ajouté avec succès'
        ]);
    }

    /**
     * Test de /artist/1/singles
     * @param ApiTester $I
     * @return void
     */
    public function getArtistSingles(ApiTester $I) {
        $I->haveHttpHeader('accept', 'application/json');
        $I->haveHttpHeader('content-type', 'application/json');
        $response = $I->sendGet('/artist/1/singles');
        $I->seeResponseCodeIs(200);
        $I->seeResponseMatchesJsonType([
            'singles' => 'array'
        ]);
    }

    /**
     * Test de /artist/library/3/all
     * @param ApiTester $I
     * @return void
     */
    public function getArtistInLibrary(ApiTester $I) {
        $I->haveHttpHeader('accept', 'application/json');
        $I->haveHttpHeader('content-type', 'application/json');
        $response = $I->sendGet('/artist/library/3/all');
        $I->seeResponseCodeIs(200);
        $I->seeResponseMatchesJsonType([
            'artists' => [
                [
                    'id' => 'integer',
                    'name' => 'string',
                    'isVerified' => 'boolean',
                    'description' => 'string',
                    'imagePath' => 'string',
                    'network' => 'array',
                    'projects' => 'array',
                    'featuredMusic' => 'array',
                ]
            ]
        ]);
    }

    /**
     * Test de /artist/1/albums
     * @param ApiTester $I
     * @return void
     */
    public function getArtistAlbums(ApiTester $I) {
        $I->haveHttpHeader('accept', 'application/json');
        $I->haveHttpHeader('content-type', 'application/json');
        $response = $I->sendGet('/artist/1/albums');
        $I->seeResponseCodeIs(200);
        $I->seeResponseMatchesJsonType([
            'albums' => [
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
                    'avgRate' => 'integer|null',
                ]
            ]
        ]);
    }

    /**
     * Test de /artist/search/bil
     * @param ApiTester $I
     * @return void
     */
    public function getSearchArtist(ApiTester $I) {
        $I->haveHttpHeader('accept', 'application/json');
        $I->haveHttpHeader('content-type', 'application/json');
        $response = $I->sendGet('/artist/search/bil');
        $I->seeResponseCodeIs(200);
        $I->seeResponseMatchesJsonType([
            'artists' => 'array',
            'projects' => 'array',
            'musics' => 'array',
        ]);
    }
}