<?php

class Api {
    public $system, $requestMethod;

    public function __construct(System $system) {
        $this->system = $system;
        $this->requestMethod = $_SERVER['REQUEST_METHOD'];
    }

    public function api() {
        // echo filter_input(INPUT_GET, 'action');
        // echo $this->requestMethod;
        // TO DO
        // - metadata (depth, path, variables, etc.) - to identify json
        switch($this->requestMethod) {
            case 'GET':
                // echo file_get_contents('_source/_data/data-about.json');
                // echo file_get_contents('_source/_data/data-contact.json');
                echo $_GET['param'];
                break;
            case 'POST':
                var_dump($_POST);
                $post = json_decode(file_get_contents('php://input'),true);
                var_dump($post);
                $json_string = $post['json'];
                // echo $input['json'];
                // echo $input['action'];
                file_put_contents('_source/_data/data-contact.json', $json_string);
                break;
        }
    }
}

$api = new Api($system);

$api->api();