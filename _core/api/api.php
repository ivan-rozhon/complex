<?php

class Api {
    public $system;

    public function __construct(System $system) {
        $this->system = $system;
    }

    public function api() {
        // echo 'hello';
        // echo filter_input(INPUT_GET, 'action');
        // echo $_SERVER['REQUEST_METHOD'];
    }
}

$api = new Api($system);

$api->api();