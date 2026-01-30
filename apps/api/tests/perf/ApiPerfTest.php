<?php

use function Pest\Stressless\stress;

it('test last listened musics', function () {
    $result = stress('http://127.0.0.1:8000/user/1/listened/musics');

    expect($result->requests()->duration()->med())->toBeLessThan(100); // < 100.00ms
});