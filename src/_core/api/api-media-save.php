<?php

class ApiMediaSave {

    public function __construct(Api $api) {
        $this->api = $api;
    }

    public function apiMediaSave($post, $pathParams) {
        // decode incoming token
        $decodedJWT = $this->api->decodeToken(getallheaders());

        // verify token
        $this->api->verifyToken($decodedJWT);

        // type of media
        $mediaType = array_key_exists(0, $pathParams) ? $pathParams[0] : '';

        // create JWT
        $token = $this->api->createToken($decodedJWT->{'id'}, $decodedJWT->{'user'});

        if ($_FILES) {
            // reorder icoming array of files
            $fileArr = $this->reArrayFiles($_FILES['files']);

            // directory to upload files
            $targetDir = $this->mediaDir($mediaType);

            // loop through file array and save each
            foreach ($fileArr as $file) {
                // get image name
                $imageName = basename($file['name']);

                // get whole resized image as binary image
                $image = $this->scaleImageFileToBlob($file['tmp_name'], 1024, 768);
                // create image thumbnail (also binary image)
                $imageThumb = $this->scaleImageFileToBlob($file['tmp_name'], 200, 150);

                // check if image does no exists
                if (!file_exists($targetDir.'/'.$imageName)) {
                    // save image & thumbnail
                    file_put_contents($targetDir.'/'.$imageName, $image);
                    file_put_contents($targetDir.'/thumb/thumb_'.$imageName, $imageThumb);

                    // if PNG recreate the image - reduce size
                    if ($file['type'] === 'image/png') {
                        $imageToRecreate = imagecreatefrompng($targetDir.'/'.$imageName);
                        $imageThumbToRecreate = imagecreatefrompng($targetDir.'/thumb/thumb_'.$imageName);
                        // convert to JPG (smaller)
                        imagejpeg($imageToRecreate, $targetDir.'/'.$imageName, 90);
                        imagejpeg($imageThumbToRecreate, $targetDir.'/thumb/thumb_'.$imageName, 90);
                    }
                }
            }

            // successful response
            echo $this->api->dataResponse(null, $token, true);
        }
    }

    // reorder file array from post request to the cleaner array
    private function reArrayFiles(&$filePost) {

        $fileArr = array();
        $fileCount = count($filePost['name']);
        $fileKeys = array_keys($filePost);

        for ($i = 0; $i < $fileCount; $i++) {
            foreach ($fileKeys as $key) {
                $fileArr[$i][$key] = $filePost[$key][$i];
            }
        }

        return $fileArr;
    }

    private function mediaDir($mediaType) {
        $baseDir = '_source/media/';

        $dirArr = [
            'image' => 'images',
            'gallery' => 'gallery'
        ];

        return array_key_exists($mediaType, $dirArr)
            ? $baseDir.$dirArr[$mediaType]
            : null;
    }

    // scale uploaded image
    // http://php.net/manual/en/function.imagejpeg.php#89866
    private function scaleImageFileToBlob($file, $maxWidth, $maxHeight) {

        list($width, $height, $imageType) = getimagesize($file);

        switch ($imageType) {
            case 1: $src = imagecreatefromgif($file); break;
            case 2: $src = imagecreatefromjpeg($file);  break;
            case 3: $src = imagecreatefrompng($file); break;
            default: return '';  break;
        }

        $xRatio = $maxWidth / $width;
        $yRatio = $maxHeight / $height;

        if (($width <= $maxWidth) && ($height <= $maxHeight)) {
            // image is smaller then required width/height
            $tnWidth = $width;
            $tnHeight = $height;
        } elseif (($xRatio * $height) < $maxHeight) {
            $tnHeight = ceil($xRatio * $height);
            $tnWidth = $maxWidth;
        } else {
            $tnWidth = ceil($yRatio * $width);
            $tnHeight = $maxHeight;
        }

        $tmp = imagecreatetruecolor($tnWidth, $tnHeight);

        /* Check if this image is PNG or GIF, then set if Transparent*/
        if (($imageType == 1) OR ($imageType==3)) {
            imagealphablending($tmp, false);
            imagesavealpha($tmp, true);
            $transparent = imagecolorallocatealpha($tmp, 255, 255, 255, 127);
            imagefilledrectangle($tmp, 0, 0, $tnWidth, $tnHeight, $transparent);
        }

        imagecopyresampled($tmp, $src, 0, 0, 0, 0, $tnWidth, $tnHeight, $width, $height);

        ob_start();

        switch ($imageType) {
            case 1: imagegif($tmp); break;
            case 2: imagejpeg($tmp, NULL, 90);  break; // best quality
            case 3: imagepng($tmp, NULL, 0); break; // no compression
            default: echo ''; break;
        }

        $finalImage = ob_get_contents();

        ob_end_clean();

        return $finalImage;
    }
}