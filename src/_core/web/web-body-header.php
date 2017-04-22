<?php

class WebBodyHeader {
    public $webBody;

    public function __construct(WebBody $webBody) {
        $this->webBody = $webBody;
        $this->templateProvider = $this->webBody->web->templateProvider;
    }

    public function webBodyHeader() {
        $title = $this->webBody->web->webSectionData('web-body-header')['title'];
        return $this->templateProvider->sharedTemplateProvider(
            [
                'title' => $title
            ]
            ,'_core/web/web-body-header.html');
    }
}