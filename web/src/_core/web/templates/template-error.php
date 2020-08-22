<?php

class TemplateError {
    public $web;

    public function __construct(Web $web, SharedTemplateProvider $sharedTemplateProvider) {
        $this->web = $web;
        $this->templateProvider = $sharedTemplateProvider;
    }

    public function templateError() {
        return $this->templateProvider->sharedTemplateProvider(
            '_core/web/templates/template-error.html'
        );
    }
}

$templateError = new TemplateError($web, $sharedTemplateProvider);