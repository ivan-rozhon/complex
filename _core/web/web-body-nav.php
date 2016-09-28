<?php

class WebBodyNav {
    public $webBody;

    public function __construct(WebBody $webBody, SharedRouter $sharedRouter) {
       $this->webBody = $webBody;
       $this->sharedRouter = $sharedRouter;
    }

    public function webBodyNav() {
        return '
            <nav>
                Nav
                '.$this->sharedRouter->sharedRouter().'
            </nav>
        ';
    }
}

$webBodyNav = new webBodyNav($webBody, $sharedRouter);