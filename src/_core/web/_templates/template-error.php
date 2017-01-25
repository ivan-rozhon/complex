<?php

class TemplateError {
    public $web;

    public function __construct(Web $web, SharedTemplateProvider $sharedTemplateProvider) {
        $this->web = $web;
        $this->templateProvider = $sharedTemplateProvider;
    }

    public function templateError() {
        $title = $this->web->templateData['title'];
        return $this->templateProvider->sharedTemplateProvider(['title' => $title], '_core/web/_templates/template-error.html');
    }
}

$templateError = new TemplateError($web, $sharedTemplateProvider);