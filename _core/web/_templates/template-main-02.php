<?php 

class TemplateMain02 {
    public $web;

    public function __construct(Web $web) {
        $this->web = $web;
    }

    public function templateMain02() {
        return '
            '.$this->web->templateData['text'].'
        ';
    }
}

$templateMain02 = new TemplateMain02($web);