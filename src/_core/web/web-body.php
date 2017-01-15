<?php

class WebBody {
    public $web;

    public function __construct(Web $web) {
        $this->web = $web;
        $this->templateProvider = $this->web->templateProvider;
    }

    public function webBody($webBodyHeader, $webBodyNav, $webBodyMain, $webBodyFooter) {
        $jsVersion = filemtime("_core/web/_scripts/web.min.js");
        return $this->templateProvider->sharedTemplateProvider(
                [
                    'webBodyHeader' => $webBodyHeader,
                    'webBodyNav' => $webBodyNav,
                    'webBodyMain' => $webBodyMain,
                    'webBodyFooter' => $webBodyFooter,
                    'jsVersion' => $jsVersion
                ],
                '_core/web/web-body.html'
            );
    }
}