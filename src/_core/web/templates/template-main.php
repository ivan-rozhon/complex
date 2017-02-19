<?php

class TemplateMain {
    public $web;

    public function __construct(Web $web, SharedTemplateProvider $sharedTemplateProvider) {
        $this->web = $web;
        $this->templateProvider = $sharedTemplateProvider;
    }

    public function templateMain() {
        $title = $this->web->templateData['title'];
        return $this->templateProvider->sharedTemplateProvider(['title' => $title], '_core/web/templates/template-main.html');
    }
}

$templateMain = new TemplateMain($web, $sharedTemplateProvider);