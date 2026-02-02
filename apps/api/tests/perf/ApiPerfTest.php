<?php

use function Pest\Stressless\stress;

it('test last listened musics', function () {
    $result = stress('http://127.0.0.1:8000/user/1/listened/musics')->get();

    expect($result->requests()->duration()->med())->toBeLessThan(100);
});

it('test last followed artist released', function () {
    $result = stress('http://127.0.0.1:8000/user/1/follows/artists/releases')->get();

    expect($result->requests()->duration()->med())->toBeLessThan(100);
});

it('test add listened music', function () {
    $result = stress('http://127.0.0.1:8000/user/listened/musics/add')->post(['id_user' => '1', 'id_music' => 1]);

    expect($result->requests()->duration()->med())->toBeLessThan(100);
});

it('test user last listened musics of the month', function () {
    $result = stress('http://127.0.0.1:8000/user/1/lastListened/musics')->get();

    expect($result->requests()->duration()->med())->toBeLessThan(100);
});

it('test get users', function () {
    $result = stress('http://127.0.0.1:8000/users')->get();

    expect($result->requests()->duration()->med())->toBeLessThan(100);
});

it('test update user', function () {
    $result = stress('http://127.0.0.1:8000/users/1')->put(['username' => 'test', 'email' => 'test@test.com', 'image_path' => '/test', 'id_role' => 1]);

    expect($result->requests()->duration()->med())->toBeLessThan(100);
});

it('test get one user', function () {
    $result = stress('http://127.0.0.1:8000/users/1')->get();

    expect($result->requests()->duration()->med())->toBeLessThan(100);
});

it('test get one project', function () {
    $result = stress('http://127.0.0.1:8000/project/1')->get();

    expect($result->requests()->duration()->med())->toBeLessThan(100);
});

it('test get all projects from a library', function () {
    $result = stress('http://127.0.0.1:8000/project/library/1/all')->get();

    expect($result->requests()->duration()->med())->toBeLessThan(100);
});

it('test get an image', function (): void {
    $result = stress('http://127.0.0.1:8000/images/playlist_5.jpg')->get();

    expect($result->requests()->duration()->med())->toBeLessThan(100);
});

it('test update playlist', function () {
    $result = stress('http://127.0.0.1:8000/playlist/1')->patch(['title' => 'test', 'isPublic' => true, 'description' => 'description update', 'cover_path' => '/playlist_5.jpg']);

    expect($result->requests()->duration()->med())->toBeLessThan(100);
});

it('test get all playlists from a library', function () {
    $result = stress('http://127.0.0.1:8000/playlist/library/1/all')->get();

    expect($result->requests()->duration()->med())->toBeLessThan(100);
});

it('test get one playlist', function () {
    $result = stress('http://127.0.0.1:8000/playlist/1')->get();

    expect($result->requests()->duration()->med())->toBeLessThan(100);
});

it('test add playlist', function () {
    $result = stress('http://127.0.0.1:8000/playlist/add')->post(['id_library' => '1', 'title' => 'test', 'isPublic' => false, 'description' => 'une description', 'cover_path' => 'playlist_5.jpg', 'musics' => [1, 2, 3]]);

    expect($result->requests()->duration()->med())->toBeLessThan(100);
});

it('test get musics from an artist', function () {
    $result = stress('http://127.0.0.1:8000/musics/artist/1')->get();

    expect($result->requests()->duration()->med())->toBeLessThan(100);
});

it('test get music ratings', function () {
    $result = stress('http://127.0.0.1:8000/musics/1/ratings')->get();

    expect($result->requests()->duration()->med())->toBeLessThan(100);
});

it('test get music cover path', function () {
    $result = stress('http://127.0.0.1:8000/music/1/coverPath')->get();

    expect($result->requests()->duration()->med())->toBeLessThan(100);
});

it('test get a music stream', function () {
    $result = stress('http://127.0.0.1:8000/stream/vampire.mp3')->get();

    expect($result->requests()->duration()->med())->toBeLessThan(100);
});

it('test get artists in library', function () {
    $result = stress('http://127.0.0.1:8000/artist/library/1/all')->get();

    expect($result->requests()->duration()->med())->toBeLessThan(100);
});

it('test get albums of an artist', function () {
    $result = stress('http://127.0.0.1:8000/artist/1/albums')->get();

    expect($result->requests()->duration()->med())->toBeLessThan(100);
});

it('test get most listened artist of the month', function () {
    $result = stress('http://127.0.0.1:8000/artist/listened/month')->get();

    expect($result->requests()->duration()->med())->toBeLessThan(100);
});

it('test get artist page', function () {
    $result = stress('http://127.0.0.1:8000/artist/1/page')->get();

    expect($result->requests()->duration()->med())->toBeLessThan(100);
});

it('test research in artist', function () {
    $result = stress('http://127.0.0.1:8000/artist/search/ind')->get();

    expect($result->requests()->duration()->med())->toBeLessThan(100);
});
