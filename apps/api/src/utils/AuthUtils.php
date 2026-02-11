<?php
namespace Api\Utils;

use Api\Exception\ApiCustomException;
use Symfony\Component\HttpFoundation\Request;

class AuthUtils
{
    /**
     * Authenticate the input request
     * @param Request $req
     * @throws ApiCustomException if the authentication failed
     * @return void
     */
    public static function authenticate(Request $req): void
    {
        $authHeader = $req->headers->get('Authorization');
        [$authType, $token] = explode(' ', $authHeader);

        if ($authType !== 'Bearer') {
            throw new ApiCustomException("Unauthorized", 401);
        }

        $authBaseUrl = EnvironmentUtils::checkEnvironment($_ENV['AUTH_SERVICE_URL']);

        $ch = curl_init($authBaseUrl . '/api/auth/verify');

        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode(['token' => $token]));
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Content-Type: application/json',
        ]);

        curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

        if (curl_errno($ch)) {
            throw new ApiCustomException('Internal server error.', 500);
        }

        if ($httpCode === 401) {
            throw new ApiCustomException("Unauthorized", 401);
        }
        if ($httpCode !== 200) {
            throw new ApiCustomException('Internal server error.', 500);
        }

        curl_close($ch);
    }
}