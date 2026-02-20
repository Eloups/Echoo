<?php

declare(strict_types=1);

namespace Tests\Api;

use Tests\Support\ApiTester;

final class StreamingCest
{
    /**
     * Test de /stream/vampire.mp3
     * @param ApiTester $I
     * @return void
     */
    public function getMusic(ApiTester $I) {
        $I->haveHttpHeader('accept', 'application/json');
        $I->haveHttpHeader('content-type', 'application/json');
        $I->sendGet('/stream/vampire.mp3');
        $I->seeResponseCodeIs(200);
    }
}