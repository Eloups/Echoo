<?php

use function Pest\Stressless\stress;

error_reporting(E_ALL & ~E_WARNING & ~E_NOTICE);

stress('http://127.0.0.1:8000/user/1/listened/musics')->dump();
