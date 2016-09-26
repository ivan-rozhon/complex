<?php

class Web {
    public $system, $title;

    public function __construct(System $system) {
       $this->system = $system;
    }

    public function webTemplate($webHead, $webBody) {
        echo '
            <!DOCTYPE html>
            <html>
            <head>
                '.$webHead.'
            </head>
            <body>
                '.$webBody.'
            </body>
            </html>
        ';
    }
}

$web = new Web($system);

require './_core/web/web-head.php';
require './_core/web/web-body.php';

$web->webTemplate($webHead->webHeadTemplate($web->system->title),$webBody->webBodyTemplate());