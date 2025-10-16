<?php 

namespace Api\Utils;

use Symfony\Component\Serializer\Serializer;
use Symfony\Component\Serializer\Encoder\JsonEncoder;
use Symfony\Component\Serializer\Normalizer\ObjectNormalizer;

class SerializerUtils {
    private Serializer $serializer;
    private static SerializerUtils $instance;

    private function __construct() {
        $encoders = [new JsonEncoder()];
        $normalizers = [new ObjectNormalizer()];
        $this->serializer = new Serializer($normalizers, $encoders);;
    }

    public static function get(): Serializer {
        if (!isset(self::$instance)) {
            self::$instance = new self();
        }
        return self::$instance->serializer;
    }
}