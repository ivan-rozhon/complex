<?php

class ApiLogin {

    public function __construct(Api $api) {
        $this->api = $api;
        assert_options(ASSERT_CALLBACK, function($file, $line, $code, $status) {
            http_response_code($this->$status[0]);
            $data = array('message' => $this->$status[1]);
            echo json_encode($data);
        });
    }

    public function apiLogin($post) {
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
        $userIndex = $this->api->findHashIndex($this->api->apiUsers['apiUsers'], 'u', $this->username);

        // check if user exists
        $this->assertStatus = [422, 'No user found'];
        assert($userIndex !== -1, 'assertStatus');

        // 10 seconds after each try to login
        $this->assertStatus = [400, 'Please wait 10 seconds'];
        assert(($this->api->apiUsers['apiUsers'][$userIndex]['t'] + 10) < time(), 'assertStatus');
        // set actual time()
        $this->api->apiUsers['apiUsers'][$userIndex]['t'] = time();
        file_put_contents('_source/api-users.json', json_encode($this->api->apiUsers));

        // verify password
        $this->assertStatus = [401, 'Invalid password'];
        assert(password_verify($this->password, $this->api->apiUsers['apiUsers'][$userIndex]['p']), 'assertStatus');

        // rehash & set password
        $this->api->apiUsers['apiUsers'][$userIndex]['u'] = password_hash($this->username, PASSWORD_BCRYPT);
        $this->api->apiUsers['apiUsers'][$userIndex]['p'] = password_hash($this->password, PASSWORD_BCRYPT);
        file_put_contents('_source/api-users.json', json_encode($this->api->apiUsers));

        // create JWT
        $token = $this->api->createToken($this->api->apiUsers['apiUsers'][$userIndex]['i'], $this->username);

        // successful response
        $data = array('message' => '', 'token' => $token);
        echo json_encode($data);
    }
}