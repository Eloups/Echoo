<?php

namespace Api\Adapter;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

function listMusics(Request $request): Response {
    return new Response(json_encode(['code' => 200, 'message' => 'Réussi']), 200);
}