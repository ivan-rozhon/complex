<?php

class WebHead {
    public $web;

    public function __construct(Web $web) {
       $this->web = $web;
    }

    public function webHead() {
        echo '
            <title>
            '.$this->web->system->title.'
            </title>
        ';
    }
}

$webHead = new webHead($web);