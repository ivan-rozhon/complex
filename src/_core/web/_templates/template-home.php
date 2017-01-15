<?php

class TemplateHome {
    public $web;

    public function __construct(Web $web, SharedTemplateProvider $sharedTemplateProvider) {
        $this->web = $web;
        $this->templateProvider = $sharedTemplateProvider;
    }

    public function templateHome() {
        $text = $this->web->templateData['text'];
        return $this->templateProvider->sharedTemplateProvider(['text' => $text], '_core/web/_templates/template-home.html');
    }
}

$templateHome = new TemplateHome($web, $sharedTemplateProvider);