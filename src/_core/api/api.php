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
    }

    public function apiPOST() {
        $post = json_decode(file_get_contents('php://input'),true);

        switch($this->queryString) {
            // Login authentication
            case 'api/login':
                // check if username exists
                $this->assertStatus = [400, 'Please include a username'];
                assert(array_key_exists('username', $post), 'assertStatus');
                // check if password exists
                $this->assertStatus = [400, 'Please include a password'];
                assert(array_key_exists('password', $post), 'assertStatus');

                // get username & password from http POST request
                $this->username = base64_decode($post['username']);
                $this->password = base64_decode($post['password']);
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

            // Save schema
            case 'api/schema':
                // decode incoming token
                $decodedJWT = $this->decodeToken(getallheaders());

                // verify token
                $this->verifyToken($decodedJWT);

                // schema (json string)
                $schema = json_encode($post['schema']);

                // check if schema exists
                $this->assertStatus = [400, 'No data'];
                assert($schema !== 'null', 'assertStatus');

                // backup if put fail
                $schemaBackup = file_get_contents('_source/web-schema.json');

                // get result of update/put old version
                $success = file_put_contents('_source/web-schema.json', $schema) > 10 ? true : false;

                // apply backup if file_put_contents() failed
                if (!$success) { file_put_contents('_source/web-schema.json', $schemaBackup); }

                // create JWT
                $token = $this->createToken($decodedJWT->{'id'}, $decodedJWT->{'user'});

                // response data object
                $data = array('token' => $token, 'success' => $success);

                // successful response
                echo json_encode($data);

                break;

            // Update data model
            case 'api/data':
                // decode incoming token
                $decodedJWT = $this->decodeToken(getallheaders());

                // verify token
                $this->verifyToken($decodedJWT);

                // data (json string)
                $data = json_encode($post['data']);
                $template = json_encode($post['template']);

                // check if data exists

                // check if template exists

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

                    // response data object
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
        // first uppercase letter fix
        $key = $headers['authorization'] ? 'authorization' : 'Authorization';

        // explode authorization header
        $authorization = explode(' ', $headers[$key]);

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