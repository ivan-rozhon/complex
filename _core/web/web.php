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

require './_core/web/web-head.php';
require './_core/web/web-body.php';

$web = new Web($system);
$webHead = new webHead($web);
$webBody = new webBody($web);

$web->webTemplate($webHead->webHeadTemplate($web->system->title),$webBody->webBodyTemplate());