<?php

class WebHead {
    public $web;

    public function __construct(Web $web) {
       $this->web = $web;
    }

    public function webHeadTemplate($webHeadTitle) {
        echo '
            <title>
            '.$webHeadTitle.'
            </title>
        ';
    }
}