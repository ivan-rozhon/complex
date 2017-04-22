<?php

class WebBodyFooter {
    public $webBody;

    public function __construct(WebBody $webBody) {
        $this->webBody = $webBody;
        $this->templateProvider = $this->webBody->web->templateProvider;
    }

    public function webBodyFooter() {
        $title = $this->webBody->web->webSectionData('web-body-footer')['title'];
        return $this->templateProvider->sharedTemplateProvider(
            [
                'title' => $title
            ]
            , '_core/web/web-body-footer.html');
    }
}