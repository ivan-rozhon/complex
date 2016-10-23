<?php

class Api {
    public $system, $requestMethod;

    public function __construct(System $system) {
        $this->system = $system;
        $this->requestMethod = $_SERVER['REQUEST_METHOD'];
    }

    public function api() {
        // TO DO
        // - metadata (depth, path, variables, etc.) - to identify json
        switch($this->requestMethod) {
            case 'GET':
                // echo file_get_contents('_source/data/data-about.json');
                $file = filter_input(INPUT_GET, 'file');
                $folder = filter_input(INPUT_GET, 'folder');
                if (file_exists('_source/'.$file.'.json')) {
                    echo file_get_contents('_source/'.$file.'.json');
                }
                // echo $_GET['file'];
                // echo file_get_contents('_source/web-schema.json');
                break;
            case 'POST':
                // var_dump($_POST);
                $post = json_decode(file_get_contents('php://input'),true);
                // var_dump($post);
                $json_string = $post['json'];
                echo $json_string;
                // echo $input['json'];
                // echo $input['action'];
                // file_put_contents('_source/data/data-contact.json', $json_string);
                break;
        }
    }
}

$api = new Api($system);

$api->api();