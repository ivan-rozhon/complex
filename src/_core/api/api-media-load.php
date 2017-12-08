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

        // get all images in directory matches the pattern
        $scan = is_dir($dir) ? preg_grep('/\.(jpg|jpeg|png)(?:[\?\#].*)?$/i', scandir($dir)) : [];

        // array of images
        $images = [];

        // reorder the array (start from index 0) and structure each
        foreach($scan as $key => $value) {
            array_push($images, [
                'name' => $value,
                'thumbName' => 'thumb_'.$value
            ]);
        }

        // create JWT
        $token = $this->api->createToken($decodedJWT->{'id'}, $decodedJWT->{'user'});

        // successful response
        echo $this->api->dataResponse($images, $token, true);
    }
}