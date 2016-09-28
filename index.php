<?php

class System {
    public $webSchema, $webConfig, $url;

    public function __construct(){
        $this->webSchema = json_decode(file_get_contents('./_source/web-schema.json'), TRUE);
        $this->webConfig = json_decode(file_get_contents('./_source/web-config.json'), TRUE);
        $this->url = "http://$_SERVER[HTTP_HOST]$_SERVER[REQUEST_URI]";
    }
}

$system = new System;

// shared
require '_core/shared/shared-router.php';

// web
require '_core/web/web.php';