<?php

class ApiDataLoad {

    public function __construct(Api $api) {
        $this->api = $api;
    }

    public function apiDataLoad($pathParams) {
        // request headers
        $headers = getallheaders();

        // decode incoming token
        $decodedJWT = $this->api->decodeToken($headers);

        // verify token
        $this->api->verifyToken($decodedJWT);

        // get dataId & templateId
        $dataId = array_key_exists(0, $pathParams) ? $pathParams[0] : '';
        $templateId = array_key_exists(1, $pathParams) ? $pathParams[1] : '';

        // get template path
        $templatePath = substr($templateId, 0, strlen('template')) === 'template' ? '_core/web/templates/'.$templateId.'.json' :
            (substr($templateId, 0, strlen('web')) === 'web' ? '_core/web/'.$templateId.'.json' : '-');

        if (file_exists('_source/data/'.$dataId.'.json') && file_exists($templatePath)) {
            // load data model
            $dataModel = file_get_contents('_source/data/'.$dataId.'.json');

            // load template metadata
            $dataConfig = json_encode(json_decode(file_get_contents($templatePath), TRUE)['_metadata']['data']);

            // response data object
            $data = array('_metadata' => $dataConfig, 'data' => $dataModel);

            // create JWT
            $token = $this->api->createToken($decodedJWT->{'id'}, $decodedJWT->{'user'});

            // successful response
            echo $this->api->dataResponse($data, $token, true);
        }
    }
}