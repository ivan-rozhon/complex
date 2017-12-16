<?php

class WebBodyHeader {
    public $webBody;

    public function __construct(WebBody $webBody) {
        $this->webBody = $webBody;
        $this->templateProvider = $this->webBody->web->templateProvider;
    }

    public function webBodyHeader() {

        return $this->templateProvider->sharedTemplateProvider(
            [],
             '_core/web/web-body-header.html'
            );
    }
}