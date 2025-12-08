<?php

namespace BetterAuthJwt\Api;

use Firebase\JWT\JWT;
use Firebase\JWT\CachedKeySet;
use GuzzleHttp\Client;
use GuzzleHttp\Psr7\HttpFactory;
use Phpfastcache\CacheManager;
use \Firebase\JWT\ExpiredException;
use \Firebase\JWT\SignatureInvalidException;
use Throwable;

/**
 * Utility class to verify a JWT Token
 */
class JWTVerifier
{

  /**
   * The URL where the JWKS can be obtain in order to validate the JWT signature
   * @var string
   */
  private string $jwks_url;

  /**
   * HTTP Client used for retrieving JWKS
   * @var Client
   */
  private Client $httpClient;

  /**
   * HTTP Client factory used by the JWT CachedKeySet
   * @var HttpFactory
   */
  private HttpFactory $httpFactory;

  /**
   * The caching item pool used by the JWT CachedKeySet
   * @var 
   */
  private $cacheItemPool;

  /**
   * The singleton instance
   * @var JWTVerifier|null
   */
  private static JWTVerifier|null $instance = null;

  private function __construct()
  {
    // Set up through the /docker-compose.yml service environment
    $this->jwks_url = $_ENV['AUTH_SERVICE_URL'] . '/api/auth/jwks';
    $this->httpClient = new Client();
    $this->httpFactory = new HttpFactory();
    $this->cacheItemPool = CacheManager::getInstance('files');
  }

  /**
   * Retrieves the JWKS Keys from the auth-service
   * @return CachedKeySet
   */
  private function get_jwks_keys()
  {
    try {
      return new CachedKeySet(
        $this->jwks_url,
        $this->httpClient,
        $this->httpFactory,
        $this->cacheItemPool,
        null,
        true,
      );
    } catch (Throwable $e) {
      echo "❌ Erreur lors de la récupération des clés : " . $e->getMessage() . "\n";
      die();
    }
  }

  /**
   * Gets the singleton instance
   * @return JWTVerifier
   */
  static private function getInstance(): JWTVerifier
  {
    if (self::$instance === null)
      self::$instance = new JWTVerifier();

    return self::$instance;
  }

  /**
   * Checks if the JWT token is valid :
   * - Not expired
   * - Well formed
   * - Valid signature
   * 
   * @param string $token
   * @throws ExpiredException Thrown when the token has expired
   * @throws SignatureInvalidException Thrown when the signature is invalid
   * @return \stdClass
   */
  static public function verify(string $token)
  {
    $instance = self::getInstance();
    return JWT::decode($token, $instance->get_jwks_keys());
  }
}
