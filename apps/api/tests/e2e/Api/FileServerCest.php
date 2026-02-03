<?php

declare(strict_types=1);

namespace Tests\Api;

use Tests\Support\ApiTester;

final class FileServerCest
{
    /**
     * Test de /images/playlist_5.jpg
     * @param ApiTester $I
     * @return void
     */
    public function getImage(ApiTester $I) {
        $I->haveHttpHeader('accept', 'application/json');
        $I->haveHttpHeader('content-type', 'application/json');
        $I->sendGet('/images/playlist_5.jpg');
        $I->seeResponseCodeIs(200);
    }
}