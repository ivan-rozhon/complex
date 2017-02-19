<?php

class TemplateWebmap {
    public $web;

    public function __construct(Web $web, SharedTemplateProvider $sharedTemplateProvider) {
        $this->web = $web;
        $this->templateProvider = $sharedTemplateProvider;
    }

    public function templateWebmap() {
        $title = $this->web->templateData['title'];
        return $this->templateProvider->sharedTemplateProvider(['title' => $title], '_core/web/templates/template-webmap.html');
    }
}

$templateWebmap = new TemplateWebmap($web, $sharedTemplateProvider);