<?php

class System {
    public $url, $pathPrefix;

    public function __construct(){
        $this->url = "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
        $this->pathPrefix = __DIR__.'/';
    }
}

$system = new System;

// shared
require $system->pathPrefix.'_core/shared/shared-router.php';

// router
require $system->pathPrefix.$sharedRouter->sharedRouter();