<?php 

class TemplateWebmap {
    public $web;

    public function __construct(Web $web) {
        $this->web = $web;
    }

    public function templateWebmap() {
        return '
            Webmap
        ';
    }
}

$templateWebmap = new TemplateWebmap($web);