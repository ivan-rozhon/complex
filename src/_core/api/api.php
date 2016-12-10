<?php

class Api {
    const SECRET = 'secret-npc-admin-key';

    public $system, $sharedJWT, $requestMethod;

    public function __construct(System $system, SharedJWT $sharedJWT) {
        $this->system = $system;
        $this->sharedJWT = $sharedJWT;
        $this->requestMethod = $_SERVER['REQUEST_METHOD'];
        $this->username = 'ivan';
        $this->password = 'merlin';
    }

    public function api() {
        switch($this->requestMethod) {
            case 'POST':
                $this->apiPOST();
                break;
            case 'GET':
                break;
        }

        // TO DO
        // - metadata (depth, path, variables, etc.) - to identify json
        // switch($this->requestMethod) {
        //     case 'GET':
        //         // echo file_get_contents('_source/data/data-about.json');
        //         $file = filter_input(INPUT_GET, 'file');
        //         $folder = filter_input(INPUT_GET, 'folder');
        //         if (file_exists('_source/'.$file.'.json')) {
        //             echo file_get_contents('_source/'.$file.'.json');
        //         }
        //         // echo $_GET['file'];
        //         // echo file_get_contents('_source/web-schema.json');
        //         break;
        //     case 'POST':
        //         // var_dump($_POST);
        //         $post = json_decode(file_get_contents('php://input'),true);
        //         // var_dump($post);
        //         $json_string = $post['json'];
        //         echo $json_string;
        //         // echo $input['json'];
        //         // echo $input['action'];
        //         // file_put_contents('_source/data/data-contact.json', $json_string);
        //         break;
        // }
    }

    public function apiPOST() {
        $post = json_decode(file_get_contents('php://input'),true);

        switch($_SERVER['QUERY_STRING']) {
            case 'api/login':
                    // var_dump($post);
                    // if (array_key_exists('username', $post) && $post['username'] == $this->username) {
                    //     echo $post['username'];
                    // }
                    // var_dump(array_key_exists('username', $post) && $post['username'] == $this->username);
                    // if ($post['username'] && $post['username'] == $this->user) {
                    //     echo 'success';
                    // } else {
                    //     echo 'fail';
                    // }
                    // echo $post['username'];
                    // http_response_code(422);
                    // echo self::SECRET;
                break;
        }
    }
}

$api = new Api($system, $sharedJWT);

$api->api();