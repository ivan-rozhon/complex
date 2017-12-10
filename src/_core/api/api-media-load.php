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

        // type of media (image/gallery)
        $mediaType = array_key_exists(0, $pathParams) ? $pathParams[0] : '';

        // path to images
        $dir = '_source/media/'.$mediaType.'/';

        // array of images/galleries
        $data = [];

        switch($mediaType) {
            case 'images':
                // get all images in directory matches the pattern
                $scan = is_dir($dir) ? preg_grep('/\.(jpg|jpeg|png)(?:[\?\#].*)?$/i', scandir($dir)) : [];

                // reorder the array (start from index 0) and structure each item
                foreach($scan as $key => $value) {
                    array_push($data, [
                        'name' => $value,
                        'thumbName' => 'thumb_'.$value
                    ]);
                }

                break;

            case 'gallery':
                $scan = array_map('basename', glob($dir.'/*' , GLOB_ONLYDIR));

                // reorder the array (start from index 0) and structure each item
                foreach($scan as $key => $value) {
                    array_push($data, [
                        'name' => $value
                    ]);
                }

                break;

        }

        // create JWT
        $token = $this->api->createToken($decodedJWT->{'id'}, $decodedJWT->{'user'});

        // successful response
        echo $this->api->dataResponse($data, $token, true);
    }
}