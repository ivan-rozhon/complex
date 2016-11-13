<?php 

class TemplateError {
    public $web;

    public function __construct(Web $web) {
        $this->web = $web;
    }

    public function templateError() {
        return '
            '.$this->web->templateData['text'].'
        ';
    }
}

$templateError = new TemplateError($web);