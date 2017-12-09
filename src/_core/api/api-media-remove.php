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

        // type of media
        $mediaType = array_key_exists(0, $pathParams) ? $pathParams[0] : '';

        // name of media (path)
        $mediaName = array_key_exists(1, $pathParams) ? $pathParams[1] : '';

        // path to media
        $path = '_source/media/'.$mediaType.'/'.$mediaName;

        // check if requested media to delete exists
        if (file_exists($path)) {

            // delete file (image)
            unlink($path);

            // TODO... delete thumbnail
            // ...temporary solution:
            $thumbPath = '_source/media/'.$mediaType.'/thumb/thumb_'.$mediaName;
            unlink($thumbPath);

            // create JWT
            $token = $this->api->createToken($decodedJWT->{'id'}, $decodedJWT->{'user'});

            // successful response
            echo $this->api->dataResponse(null, $token, true);
        }
    }
}