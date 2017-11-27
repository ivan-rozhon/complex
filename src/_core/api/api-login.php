<?php

class ApiLogin {

    public function __construct(Api $api) {
        $this->api = $api;
    }

    public function apiLogin($post) {
        // check if username exists
        $this->api->assertStatus = [400, 'Please include a username'];
        assert(base64_decode($post['username']) !== 'undefined', 'assertStatus');
        // check if password exists
        $this->api->assertStatus = [400, 'Please include a password'];
        assert(base64_decode($post['password']) !== 'undefined', 'assertStatus');

        // get username & password from http POST request
        $this->username = base64_decode($post['username']);
        $this->password = base64_decode($post['password']);
        // find user index in api-users.json
        $userIndex = $this->api->findHashIndex($this->api->apiUsers['apiUsers'], 'u', $this->username);

        // check if user exists
        $this->api->assertStatus = [422, 'No user found'];
        assert($userIndex !== -1, 'assertStatus');

        // 10 seconds after each try to login
        $this->api->assertStatus = [400, 'Please wait 10 seconds'];
        assert(($this->api->apiUsers['apiUsers'][$userIndex]['t'] + 10) < time(), 'assertStatus');
        // set actual time()
        $this->api->apiUsers['apiUsers'][$userIndex]['t'] = time();
        file_put_contents('_source/api-users.json', json_encode($this->api->apiUsers));

        // verify password
        $this->api->assertStatus = [401, 'Invalid password'];
        assert(password_verify($this->password, $this->api->apiUsers['apiUsers'][$userIndex]['p']), 'assertStatus');

        // rehash & set password
        $this->api->apiUsers['apiUsers'][$userIndex]['u'] = password_hash($this->username, PASSWORD_BCRYPT);
        $this->api->apiUsers['apiUsers'][$userIndex]['p'] = password_hash($this->password, PASSWORD_BCRYPT);
        file_put_contents('_source/api-users.json', json_encode($this->api->apiUsers));

        // create JWT
        $token = $this->api->createToken($this->api->apiUsers['apiUsers'][$userIndex]['i'], $this->username);

        // successful response
        echo $this->api->dataResponse(null, $token, true, 'Logged in');
    }
}