<?php

class ApiDataLoad {

    public function __construct(Api $api) {
        $this->api = $api;
        assert_options(ASSERT_CALLBACK, function($file, $line, $code, $status) {
            http_response_code($this->$status[0]);
            $data = array('message' => $this->$status[1]);
            echo json_encode($data);
        });
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

        if (file_exists('_source/data/'.$dataKey.'.json')) {
            // load data model
            $dataModel = file_get_contents('_source/data/'.$dataKey.'.json');

            // load template metadata
            $dataConfig = json_encode(json_decode(file_get_contents('_core/web/_templates/'.$templateKey.'.json'), TRUE)['_metadata']['data']);

            // create JWT
            $token = $this->api->createToken($decodedJWT->{'id'}, $decodedJWT->{'user'});

            // response data object
            $data = array('token' => $token, 'data' => $dataModel, 'config' => $dataConfig);

            // successful response
            echo json_encode($data);
        }
    }
}