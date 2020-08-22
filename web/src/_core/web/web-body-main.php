<?php

class WebBodyMain {
    public $webBody, $currentQueryArr;

    public function __construct(WebBody $webBody) {
        $this->webBody = $webBody;
        $this->currentQueryArr = $this->webBody->web->currentQueryArr;
        $this->templateProvider = $this->webBody->web->templateProvider;
    }

    public function webBodyMain($template) {
        return $this->templateProvider->sharedTemplateProvider(['template' => $template], '_core/web/web-body-main.html');
    }
}