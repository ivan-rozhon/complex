<?php

class WebBody {
    public $web;

    public function __construct(Web $web) {
       $this->web = $web;
    }

    public function webBody($webBodyNav) {
        echo '
            '.$webBodyNav.'<br>
            TODO:<br>
            - dynamic template<br>
            - header<br>
            - nav<br>
            - main<br>
            - footer<br>
        ';
    }
}

$webBody = new webBody($web);

require './_core/web/web-body-nav.php';