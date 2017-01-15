<?php

class TemplateError {
    public $web;

    public function __construct(Web $web, SharedTemplateProvider $sharedTemplateProvider) {
        $this->web = $web;
        $this->templateProvider = $sharedTemplateProvider;
    }

    public function templateError() {
        $text = $this->web->templateData['text'];
        return $this->templateProvider->sharedTemplateProvider(['text' => $text], '_core/web/_templates/template-error.html');
    }
}

$templateError = new TemplateError($web, $sharedTemplateProvider);