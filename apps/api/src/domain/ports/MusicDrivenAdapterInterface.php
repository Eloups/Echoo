<?php 

namespace Api\Domain\Ports;

interface MusicDrivenAdapterInterface {
    public function getMusicList(): array;
}