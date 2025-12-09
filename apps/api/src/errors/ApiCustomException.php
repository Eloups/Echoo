<?php

namespace Api\Exception;

use Exception;
use Symfony\Component\HttpFoundation\Response;

/**
 * Exception personalisée pour l'API
 */
class ApiCustomException extends Exception
{
    /**
     * Fonction pour convertir l'exception en réponse
     * @return Response
     */
    public function intoResponse(): Response
    {
        return new Response(json_encode(['code' => $this->code, 'message' => $this->getMessage()]), $this->code);
    }
}