<?php

class ApiMediaRemove {

    public function __construct(Api $api) {
        $this->api = $api;
    }

    public function apiMediaRemove($pathParams) {
        // decode incoming token
        $decodedJWT = $this->api->decodeToken(getallheaders());

        // verify token
        $this->api->verifyToken($decodedJWT);
    }
}