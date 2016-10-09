<?php 

class TemplateHome {
    public $web;

    public function __construct(Web $web) {
        $this->web = $web;
    }

    public function templateHome() {
        return '
            '.$this->web->templateData['text'].'
        ';
    }
}

$templateHome = new TemplateHome($web);