<?php

class TemplateHome {
    public $web;

    public function __construct(Web $web, SharedTemplateProvider $sharedTemplateProvider) {
        $this->web = $web;
        $this->templateProvider = $sharedTemplateProvider;
    }

    public function templateHome() {
        return $this->templateProvider->sharedTemplateProvider(
                [],
                '_core/web/templates/template-home.html'
            );
    }
}

$templateHome = new TemplateHome($web, $sharedTemplateProvider);