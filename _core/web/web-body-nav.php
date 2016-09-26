<?php

class WebBodyNav {
    public $webBody;

    public function __construct(WebBody $webBody) {
       $this->webBody = $webBody;
    }

    public function webBodyNav() {
        echo '
            navigation
        ';
    }
}

$webBodyNav = new webBodyNav($webBody);