<?php

class WebBodyFooter {
    public $webBody;

    public function __construct(WebBody $webBody) {
        $this->webBody = $webBody;
        $this->templateProvider = $this->webBody->web->templateProvider;
    }

    public function webBodyFooter() {
        $title = $this->webBody->web->webSectionData('web-body-footer')['title'];
        $baseUrl = $this->webBody->web->sharedRouter->baseUrl();
        $basePath = $this->webBody->web->sharedRouter->basePath();

        return $this->templateProvider->sharedTemplateProvider(
            [
                'title' => $title,
                'baseUrl' => $baseUrl,
                'basePath' => $basePath
            ]
            , '_core/web/web-body-footer.html');
    }
}