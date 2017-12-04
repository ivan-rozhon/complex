<?php

class ApiMediaLoad {

    public function __construct(Api $api) {
        $this->api = $api;
    }

    public function apiMediaLoad($pathParams) {
        // decode incoming token
        $decodedJWT = $this->api->decodeToken(getallheaders());

        // verify token
        $this->api->verifyToken($decodedJWT);
    }
}