<?php 

class TemplateMain01 {
    public $web;

    public function __construct(Web $web) {
        $this->web = $web;
    }

    public function templateMain01() {
        return '
            '.$this->web->templateData['text'].'
        ';
    }
}

$templateMain01 = new TemplateMain01($web);