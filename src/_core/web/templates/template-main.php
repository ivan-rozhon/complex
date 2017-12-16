<?php

class TemplateMain {
    public $web;

    public function __construct(Web $web, SharedTemplateProvider $sharedTemplateProvider) {
        $this->web = $web;
        $this->templateProvider = $sharedTemplateProvider;
    }

    public function templateMain() {
        return $this->templateProvider->sharedTemplateProvider(
            [],
            '_core/web/templates/template-main.html'
        );
    }
}

$templateMain = new TemplateMain($web, $sharedTemplateProvider);