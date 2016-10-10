<?php

class Api {
    public $system, $requestMethod;

    public function __construct(System $system) {
        $this->system = $system;
        $this->requestMethod = $_SERVER['REQUEST_METHOD'];
    }

    public function api() {
        // echo 'hello';
        // echo filter_input(INPUT_GET, 'action');
        // echo $this->requestMethod;
        
        switch($this->requestMethod) {
            case 'GET':
                // echo file_get_contents('_source/_data/data-about.json');
                echo file_get_contents('_source/web-schema.json');
                break;
        }
    }
}

$api = new Api($system);

$api->api();