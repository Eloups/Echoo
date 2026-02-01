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
}
