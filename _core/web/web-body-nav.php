<?php

class WebBodyNav {
    public $webBody;

    public function __construct(WebBody $webBody) {
        $this->webBody = $webBody;
    }

    public function webBodyNav() {
        return '
            <nav class="navbar navbar-default">
                <div class="container-fluid">
                '/*.var_dump($this->webBody->web->sharedRouter->sharedRouter()[0]["id"])*/.'
                    <ul class="nav navbar-nav">
                        <li><a href="">Home</a></li>
                        <li class="dropdown">
                        <a class="dropdown-toggle" data-toggle="dropdown" href="#">Page 1 <span class="caret"></span></a>
                        <ul class="dropdown-menu">
                            <li><a href="#">Page 1-1</a></li>
                            <li><a href="#">Page 1-2</a></li>
                            <li><a href="#">Page 1-3</a></li>
                        </ul>
                        </li>
                    </ul>
                </div>
            </nav>
        ';
    }
}

$webBodyNav = new webBodyNav($webBody, $sharedRouter);