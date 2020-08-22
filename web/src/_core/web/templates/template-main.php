<?php

class TemplateMain {
    public $web;

    public function __construct(Web $web, SharedTemplateProvider $sharedTemplateProvider) {
        $this->web = $web;
        $this->templateProvider = $sharedTemplateProvider;
    }

    public function templateMain() {
        $content = $this->composeContent($this->web->templateData['generic']);

        return $this->templateProvider->sharedTemplateProvider(
            ['content' => $content],
            '_core/web/templates/template-main.html'
        );
    }

    private function composeContent($schema) {
        $content = '';

        foreach((array) $schema as $key => $value) {

            foreach($value as $subKey => $subValue) {
                if ($subKey === 'gallery') {
                    // $content .= $this->composeGallery($this->web->webGallery($subValue));
                } else {
                    $content .= $value[$subKey];
                }
            }

        }

        return $content;
    }
}

$templateMain = new TemplateMain($web, $sharedTemplateProvider);