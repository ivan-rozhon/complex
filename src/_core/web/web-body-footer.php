<?php

class WebBodyFooter {
    public $webBody;

    public function __construct(WebBody $webBody) {
        $this->webBody = $webBody;
        $this->templateProvider = $this->webBody->web->templateProvider;
    }

    public function webBodyFooter() {
        return $this->templateProvider->sharedTemplateProvider([], '_core/web/web-body-footer.html');
    }
}