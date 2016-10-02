<?php

class System {
    public $url;

    public function __construct(){
        $this->url = "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
    }
}

$system = new System;

// shared
require '_core/shared/shared-router.php';

require $sharedRouter->sharedRouter();