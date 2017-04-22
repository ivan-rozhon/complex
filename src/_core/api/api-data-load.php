<?php

class ApiDataLoad {

    public function __construct(Api $api) {
        $this->api = $api;
    }

    public function apiDataLoad() {
        // request headers
        $headers = getallheaders();

        // decode incoming token
        $decodedJWT = $this->api->decodeToken($headers);

        // verify token
        $this->api->verifyToken($decodedJWT);

        // first uppercase letter fix
        $dataId = $headers['data'] ? 'data' : 'Data';
        $templateId = $headers['template'] ? 'template' : 'Template';

        // get dataKey & templateKey
        $dataKey = $headers[$dataId];
        $templateKey = $headers[$templateId];

        // get template path
        $templatePath = substr($templateKey, 0, strlen('template')) === 'template' ? '_core/web/templates/'.$templateKey.'.json' :
            (substr($templateKey, 0, strlen('web')) === 'web' ? '_core/web/'.$templateKey.'.json' : '-');

        if (file_exists('_source/data/'.$dataKey.'.json') && file_exists($templatePath)) {
            // load data model
            $dataModel = file_get_contents('_source/data/'.$dataKey.'.json');

            // load template metadata
            $dataConfig = json_encode(json_decode(file_get_contents($templatePath), TRUE)['_metadata']['data']);

            // create JWT
            $token = $this->api->createToken($decodedJWT->{'id'}, $decodedJWT->{'user'});

            // response data object
            $data = array('token' => $token, 'data' => $dataModel, 'config' => $dataConfig);

            // successful response
            echo json_encode($data);
        }
    }
}