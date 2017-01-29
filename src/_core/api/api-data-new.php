<?php

class ApiDataNew {

    public function __construct(Api $api) {
        $this->api = $api;
        assert_options(ASSERT_CALLBACK, function($file, $line, $code, $status) {
            http_response_code($this->$status[0]);
            $data = array('message' => $this->$status[1]);
            echo json_encode($data);
        });
    }

    public function apiDataNew($post) {
        // decode incoming token
        $decodedJWT = $this->api->decodeToken(getallheaders());

        // verify token
        $this->api->verifyToken($decodedJWT);

        // request arguments
        $template = $post['template'];

        // generate new (unique) data key
        $dataKey = $this->api->newDataKey();

        // load template prototype
        $templatePrototype = json_encode(json_decode(file_get_contents('_core/web/_templates/'.$template.'.json'), TRUE)['_metadata']['prototype']);

        // create new data model
        $success = file_put_contents('_source/data/'.$dataKey.'.json', $templatePrototype) === FALSE ? FALSE : TRUE;

        // create JWT
        $token = $this->api->createToken($decodedJWT->{'id'}, $decodedJWT->{'user'});

        // response data object
        $data = array('token' => $token, 'data' => $dataKey, 'success' => $success);

        // successful response
        echo json_encode($data);
    }
}