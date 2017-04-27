<?php

class WebBody {
    public $web;

    public function __construct(Web $web) {
        $this->web = $web;
        $this->templateProvider = $this->web->templateProvider;
    }

    public function webBody($webBodyHeader, $webBodyNav, $webBodyMain, $webBodyFooter) {
        $jsVersion = filemtime("_core/web/scripts/web.min.js");
        $jsLibVersion = filemtime("_core/web/scripts/lib.min.js");
        $baseUrl = $this->web->sharedRouter->baseUrl();

        return $this->templateProvider->sharedTemplateProvider(
                [
                    'webBodyHeader' => $webBodyHeader,
                    'webBodyNav' => $webBodyNav,
                    'webBodyMain' => $webBodyMain,
                    'webBodyFooter' => $webBodyFooter,
                    'jsVersion' => $jsVersion,
                    'jsLibVersion' => $jsLibVersion,
                    'baseUrl' => $baseUrl,
                ],
                '_core/web/web-body.html'
            );
    }
}