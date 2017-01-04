<?php

class Api {
    const SECRET = 'secret-npc-admin-key';

    public $system, $sharedJWT, $requestMethod;

    public function __construct(System $system, SharedJWT $sharedJWT) {
        $this->system = $system;
        $this->sharedJWT = $sharedJWT;
        $this->requestMethod = $_SERVER['REQUEST_METHOD'];
        $this->queryString = $_SERVER['QUERY_STRING'];
        $this->apiUsers = json_decode(file_get_contents('_source/api-users.json'), TRUE);
        assert_options(ASSERT_ACTIVE, 1);
        assert_options(ASSERT_WARNING, 0);
        assert_options(ASSERT_BAIL, 1);
        assert_options(ASSERT_QUIET_EVAL, 1);
        assert_options(ASSERT_CALLBACK, function($file, $line, $code, $status) {
            http_response_code($this->$status[0]);
            $data = array('message' => $this->$status[1]);
            echo json_encode($data);
        });
    }

    public function api() {
        switch($this->requestMethod) {
            case 'POST':
                $this->apiPOST();
                break;
            case 'GET':
                $this->apiGET();
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

        switch($this->queryString) {
            case 'api/login':
                // check if username exists
                $this->assertStatus = [400, 'Please include a username'];
                assert(array_key_exists('username', $post), 'assertStatus');
                // check if password exists
                $this->assertStatus = [400, 'Please include a password'];
                assert(array_key_exists('password', $post), 'assertStatus');

                // get username & password from http POST request
                $this->username = $post['username'];
                $this->password = $post['password'];
                // find user index in api-users.json
                $userIndex = $this->findHashIndex($this->apiUsers['apiUsers'], 'u', $this->username);

                // check if user exists
                $this->assertStatus = [422, 'No user found'];
                assert($userIndex !== -1, 'assertStatus');

                // 10 seconds after each try to login
                $this->assertStatus = [400, 'Please wait 10 seconds'];
                assert(($this->apiUsers['apiUsers'][$userIndex]['t'] + 10) < time(), 'assertStatus');
                // set actual time()
                $this->apiUsers['apiUsers'][$userIndex]['t'] = time();
                file_put_contents('_source/api-users.json', json_encode($this->apiUsers));

                // verify password
                $this->assertStatus = [401, 'Invalid password'];
                assert(password_verify($this->password, $this->apiUsers['apiUsers'][$userIndex]['p']), 'assertStatus');

                // rehash & set password
                $this->apiUsers['apiUsers'][$userIndex]['u'] = password_hash($this->username, PASSWORD_BCRYPT);
                $this->apiUsers['apiUsers'][$userIndex]['p'] = password_hash($this->password, PASSWORD_BCRYPT);
                file_put_contents('_source/api-users.json', json_encode($this->apiUsers));

                // create JWT
                $token = $this->createToken($this->apiUsers['apiUsers'][$userIndex]['i'], $this->username);

                // successful response
                $data = array('message' => '', 'token' => $token);
                echo json_encode($data);

                break;
        }
    }

    public function apiGET() {
        switch($this->queryString) {
            case 'api/schema':
                // decode incoming token
                $decodedJWT = $this->decodeToken(getallheaders());

                // verify token
                $this->verifyToken($decodedJWT);

                if (file_exists('_source/web-schema.json')) {
                    $schema = file_get_contents('_source/web-schema.json');

                    // create JWT
                    $token = $this->createToken($decodedJWT->{'id'}, $decodedJWT->{'user'});

                    $data = array('token' => $token, 'schema' => $schema);

                    // successful response
                    echo json_encode($data);
                }
                break;
        }
    }

    public function createToken($id, $user) {
        $token_payload = [
            'id' => $id,
            'user' => $user,
            'exp' => time() + 3600
        ];
        return SharedJWT::encode($token_payload, self::SECRET);
    }

    public function verifyToken($decodedJWT) {
        // Error status
        $this->assertStatus = [401, 'Invalid token'];

        // find user index in api-users.json
        $userIndex = $this->findIndex($this->apiUsers['apiUsers'], 'i', $decodedJWT->{'id'});
        assert($userIndex !== -1, 'assertStatus');

        // verify username
        assert(password_verify($decodedJWT->{'user'}, $this->apiUsers['apiUsers'][$userIndex]['u']), 'assertStatus');
        // check expiration time
        assert($decodedJWT->{'exp'} > time(), 'assertStatus');
    }

    public function decodeToken($headers) {
        // explode authorization header
        $authorization = explode(' ', $headers['Authorization']);

        // check Bearer header
        $this->assertStatus = [401, 'Invalid header'];
        assert($authorization[0] === 'Bearer', 'assertStatus');

        // decode incoming token
        return SharedJWT::decode($authorization[1], self::SECRET);
    }

    public function findIndex($array, $innerKey, $innerValue) {
        $index = -1;
        foreach($array as $key => $value) {
            if ($value[$innerKey] === $innerValue) {
                $index = $key;
            }
        }
        return $index;
    }

    public function findHashIndex($array, $innerKey, $innerValue) {
        $index = -1;
        foreach($array as $key => $value) {
            if (password_verify($innerValue, $value[$innerKey])) {
                $index = $key;
            }
        }
        return $index;
    }
}

$api = new Api($system, $sharedJWT);

$api->api();