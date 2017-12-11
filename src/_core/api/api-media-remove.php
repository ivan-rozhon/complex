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

        // name of media (path) - name of image or gallery
        $mediaName = array_key_exists(1, $pathParams) ? $pathParams[1] : '';

        // name of media inside of $mediaName (image in gallery)
        $deepMediaName = array_key_exists(2, $pathParams) ? $pathParams[2] : null;

        // path to media
        $path = $deepMediaName
            ? '_source/media/'.$mediaType.'/'.$mediaName.'/'.$deepMediaName
            : '_source/media/'.$mediaType.'/'.$mediaName;

        // check if requested media to delete exists
        if (file_exists($path)) {

            switch($mediaType) {
                case 'images':
                    // delete file (image)
                    unlink($path);

                    // delete thumbnail
                    $thumbPath = '_source/media/'.$mediaType.'/thumb/thumb_'.$mediaName;
                    unlink($thumbPath);

                    break;

                case 'gallery':
                    if ($deepMediaName) {
                        // remove file (image) in specific gallery
                        unlink($path);

                        // delete thumbnail
                        $thumbPath = '_source/media/'.$mediaType.'/'.$mediaName.'/thumb/thumb_'.$deepMediaName;
                        unlink($thumbPath);

                    } else {
                        // remove whole directory of gallery
                        $this->deleteDirectory($path);
                    }

                    break;
            }

            // create JWT
            $token = $this->api->createToken($decodedJWT->{'id'}, $decodedJWT->{'user'});

            // successful response
            echo $this->api->dataResponse(null, $token, true);
        }
    }

    // delete non empty directory
    // http://us3.php.net/manual/en/function.rmdir.php#92050
    private function deleteDirectory($dir) {
        if (!file_exists($dir)) { return true; }

        if (!is_dir($dir) || is_link($dir)) { return unlink($dir); }

        foreach (scandir($dir) as $item) {
            if ($item == '.' || $item == '..') { continue; }

            if (!$this->deleteDirectory($dir . "/" . $item)) {
                chmod($dir . "/" . $item, 0777);

                if (!$this->deleteDirectory($dir . "/" . $item)) { return false; }
            }
        }

        return rmdir($dir);
    }
}