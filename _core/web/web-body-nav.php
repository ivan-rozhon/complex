<?php

class WebBodyNav {
    public $webBody;

    public function __construct(WebBody $webBody) {
       $this->webBody = $webBody;
    }

    public function webBodyNav() {
        return '
            <nav>
                Nav
                '.$this->webBody->web->sharedRouter->sharedRouter().'
            </nav>
        ';
    }
}

$webBodyNav = new webBodyNav($webBody, $sharedRouter);