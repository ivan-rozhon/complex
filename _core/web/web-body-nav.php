<?php

class WebBodyNav {
    public $webBody;

    public function __construct(WebBody $webBody) {
       $this->webBody = $webBody;
    }

    public function webBodyNav() {
        return '
            <nav class="navbar navbar-default">
                Nav
                '.$this->webBody->web->sharedRouter->sharedRouter().'<br>
                '.$this->webBody->web->sharedRouter->sharedRouterBaseUrl().'
            </nav>
        ';
    }
}

$webBodyNav = new webBodyNav($webBody, $sharedRouter);