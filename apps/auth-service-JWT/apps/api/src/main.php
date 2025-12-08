<?php
use BetterAuthJwt\Api\JWTVerifier;
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PUT,DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, token");

if ($_SERVER['REQUEST_METHOD'] === "OPTIONS")
  die();

$output = [];

try {
  $headers = getallheaders();
  if (!isset($headers['token']))
    throw new Exception("token header is missing");

  $token = $headers['token'];
  $decodedPayload = JWTVerifier::verify($token);

  $output = [
    "status" => "SUCCESS",
    "token" => $token,
    "decoded" => $decodedPayload,
  ];
} catch (\Firebase\JWT\ExpiredException $e) {
  http_response_code(401);
  $output = [
    "status" => "ERROR",
    "code" => "TOKEN_EXPIRED",
    "message" => "❌ Le JWT a expiré : " . $e->getMessage(),
  ];
} catch (\Firebase\JWT\SignatureInvalidException $e) {
  http_response_code(401);
  $output = [
    "status" => "ERROR", 
    "code" => "INVALID_SIGNATURE", 
    "message" => "❌ Signature invalide : " . $e->getMessage(),
  ];
} catch (\Exception $e) {
  http_response_code(500);
  $output = [
    "status"  => "ERROR",
    "code" => "UNKNOWN_ERROR",
    "message" => $e->getMessage(),
    "trace" => $e->getTraceAsString(),
  ];
} finally {
  echo trim(json_encode($output));
  // die();
}
