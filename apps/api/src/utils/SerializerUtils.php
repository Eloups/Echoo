<?php 

namespace Api\Utils;

use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\DateTimeNormalizer;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;

/**
 * Classe utils pour serialiser les objets en json
 */
class SerializerUtils {
    /**
     * Le serializer
     * @var Serializer
     */
    private Serializer $serializer;
    /**
     * Instance du Serializer
     * @var SerializerUtils
     */
    private static SerializerUtils $instance;

    /**
     * Constructeur du serializer
     */
    private function __construct() {
        $encoders = [new JsonEncoder()];
        $normalizers = [
            new DateTimeNormalizer([DateTimeNormalizer::FORMAT_KEY => 'Y-m-d']),
            new ObjectNormalizer()
        ];
        $this->serializer = new Serializer($normalizers, $encoders);;
    }

    /**
     * Méthode static pour appeler le serializer
     * @return Serializer
     */
    public static function get(): Serializer {
        if (!isset(self::$instance)) {
            self::$instance = new self();
        }
        return self::$instance->serializer;
    }
}