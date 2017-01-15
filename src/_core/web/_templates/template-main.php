<?php

class TemplateMain {
    public $web;

    public function __construct(Web $web, SharedTemplateProvider $sharedTemplateProvider) {
        $this->web = $web;
        $this->templateProvider = $sharedTemplateProvider;
    }

    public function templateMain() {
        $text = $this->web->templateData['text'];
        return $this->templateProvider->sharedTemplateProvider(['text' => $text], '_core/web/_templates/template-main.html');
    }
}

$templateMain = new TemplateMain($web, $sharedTemplateProvider);