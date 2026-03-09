<?php

use function Pest\Stressless\stress;

error_reporting(E_ALL & ~E_WARNING & ~E_NOTICE);

stress('http://127.0.0.1:8000/user/1/listened/musics')->get()->dump();
stress('http://127.0.0.1:8000/user/1/follows/artists/releases')->get()->dump();
stress('http://127.0.0.1:8000/user/listened/musics/add')->post(['id_user' => '1', 'id_music' => 1])->dump();
stress('http://127.0.0.1:8000/user/1/lastListened/musics')->get()->dump();
stress('http://127.0.0.1:8000/users')->get()->dump();
stress('http://127.0.0.1:8000/users/1')->put(['username' => 'test', 'email' => 'test@test.com', 'image_path' => '/test', 'id_role' => 1])->dump();
stress('http://127.0.0.1:8000/users/1')->get()->dump();
stress('http://127.0.0.1:8000/project/1')->get()->dump();
stress('http://127.0.0.1:8000/project/library/1/all')->get()->dump();
stress('http://127.0.0.1:8000/images/playlist_5.jpg')->get()->dump();
stress('http://127.0.0.1:8000/playlist/1')->patch(['title' => 'test', 'isPublic' => true, 'description' => 'description update', 'cover_path' => '/playlist_5.jpg'])->dump();
stress('http://127.0.0.1:8000/playlist/library/1/all')->get()->dump();
stress('http://127.0.0.1:8000/playlist/1')->get()->dump();
stress('http://127.0.0.1:8000/playlist/add')->post(['id_library' => '1', 'title' => 'test', 'isPublic' => false, 'description' => 'une description', 'cover_path' => 'playlist_5.jpg', 'musics' => [1, 2, 3]])->dump();
stress('http://127.0.0.1:8000/musics/artist/1')->get()->dump();
stress('http://127.0.0.1:8000/musics/1/ratings')->get()->dump();
stress('http://127.0.0.1:8000/music/1/coverPath')->get()->dump();
stress('http://127.0.0.1:8000/stream/vampire.mp3')->get()->dump();
stress('http://127.0.0.1:8000/artist/library/1/all')->get()->dump();
stress('http://127.0.0.1:8000/artist/1/albums')->get()->dump();
stress('http://127.0.0.1:8000/artist/listened/month')->get()->dump();
stress('http://127.0.0.1:8000/artist/1/page')->get()->dump();
stress('http://127.0.0.1:8000/artist/search/ind')->get()->dump();
