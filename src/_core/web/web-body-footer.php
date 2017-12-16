<?php

class WebBodyFooter {
    public $webBody;

    public function __construct(WebBody $webBody) {
        $this->webBody = $webBody;
        $this->templateProvider = $this->webBody->web->templateProvider;
    }

    public function webBodyFooter() {
        $baseUrl = $this->webBody->web->sharedRouter->baseUrl();
        $basePath = $this->webBody->web->sharedRouter->basePath();

        return $this->templateProvider->sharedTemplateProvider(
            [
                'baseUrl' => $baseUrl,
                'basePath' => $basePath
            ]
            , '_core/web/web-body-footer.html');
    }
}