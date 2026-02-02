<?php

use Api\Exception\ApiCustomException;
use PHPUnit\Framework\TestCase;
use Symfony\Component\HttpFoundation\Response;

class ApiCustomExceptionTest extends TestCase
{
    public function test_ApiCustomException(): void
    {
        $code = 422;
        $message = "Une erreur personnalisée";

        $exception = new ApiCustomException($message, $code);

        $response = $exception->intoResponse();

        $this->assertInstanceOf(Response::class, $response);

        $this->assertEquals($code, $response->getStatusCode());

        $decoded = json_decode($response->getContent(), true);

        $this->assertIsArray($decoded);
        $this->assertArrayHasKey('code', $decoded);
        $this->assertArrayHasKey('message', $decoded);

        $this->assertEquals($code, $decoded['code']);
        $this->assertEquals($message, $decoded['message']);
    }
}
