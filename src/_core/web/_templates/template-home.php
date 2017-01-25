<?php

class TemplateHome {
    public $web;

    public function __construct(Web $web, SharedTemplateProvider $sharedTemplateProvider) {
        $this->web = $web;
        $this->templateProvider = $sharedTemplateProvider;
    }

    public function templateHome() {
        $title = $this->web->templateData['title'];
        return $this->templateProvider->sharedTemplateProvider(['title' => $title], '_core/web/_templates/template-home.html');
    }
}

$templateHome = new TemplateHome($web, $sharedTemplateProvider);