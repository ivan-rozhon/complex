<?php

class ApiDataNew {

    public function __construct(Api $api) {
        $this->api = $api;
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

        // get template path
        $templatePath = substr($template, 0, strlen('template')) === 'template' ? '_core/web/templates/'.$template.'.json' :
            (substr($template, 0, strlen('web')) === 'web' ? '_core/web/'.$template.'.json' : '-');

        if (file_exists($templatePath)) {
            // load template prototype
            $templatePrototype = json_encode(json_decode(file_get_contents($templatePath), TRUE)['_metadata']['prototype']);

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
}