<?php

class ApiDataRemove {

    public function __construct(Api $api) {
        $this->api = $api;
    }

    public function apiDataRemove($pathParams) {
        // decode incoming token
        $decodedJWT = $this->api->decodeToken(getallheaders());

        // verify token
        $this->api->verifyToken($decodedJWT);

        // get requested data id
        $dataId = array_key_exists(0, $pathParams) ? $pathParams[0] : '';

        // path to data file
        $path = '_source/data/'.$dataId.'.json';

        if (file_exists($path)) {
            // remove data file if exists
            unlink($path);
        }

        // create JWT
        $token = $this->api->createToken($decodedJWT->{'id'}, $decodedJWT->{'user'});

        // successful response
        echo $this->api->dataResponse(null, $token, true);
    }
}