<?php

class ApiSchemaSave {

    public function __construct(Api $api) {
        $this->api = $api;
    }

    public function apiSchemaSave($post) {
        // decode incoming token
        $decodedJWT = $this->api->decodeToken(getallheaders());

        // verify token
        $this->api->verifyToken($decodedJWT);

        // schema (json string)
        $schema = json_encode($post['schema']);

        // check if schema exists
        $this->api->assertStatus = [400, 'No data'];
        assert($schema !== 'null', 'assertStatus');

        // backup if put fail
        $schemaBackup = file_get_contents('_source/web-schema.json');

        // get result of update/put
        $success = file_put_contents('_source/web-schema.json', $schema) > 10 ? true : false;

        // apply backup if file_put_contents() failed
        if (!$success) { file_put_contents('_source/web-schema.json', $schemaBackup); }

        // TODO... do clean (remove all unused data files)

        // create JWT
        $token = $this->api->createToken($decodedJWT->{'id'}, $decodedJWT->{'user'});

        // response data object
        $data = array('token' => $token, 'success' => $success);

        // successful response
        echo json_encode($data);
    }
}