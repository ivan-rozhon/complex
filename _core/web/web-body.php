<?php

class WebBody {
    public $web;

    public function __construct(Web $web) {
       $this->web = $web;
    }

    public function webBodyTemplate() {
        echo '
            TODO:<br>
            - dynamic template<br>
            - header<br>
            - nav<br>
            - main<br>
            - footer<br>
        ';
    }
}