<?php

class WebBody {
    public $web;

    public function __construct(Web $web) {
        $this->web = $web;
        $this->templateProvider = $this->web->templateProvider;
    }

    public function webBody($webBodyHeader, $webBodyNav, $webBodyMain, $webBodyFooter) {
        $jsVersion = filemtime("_core/web/scripts/web.js");
        $jsVendorVersion = filemtime("_core/web/scripts/vendor.js");
        $jsPolyfillsVersion = filemtime("_core/web/scripts/polyfills.js");
        $baseUrl = $this->web->sharedRouter->baseUrl();

        return $this->templateProvider->sharedTemplateProvider(
                [
                    'webBodyHeader' => $webBodyHeader,
                    'webBodyNav' => $webBodyNav,
                    'webBodyMain' => $webBodyMain,
                    'webBodyFooter' => $webBodyFooter,
                    'jsVersion' => $jsVersion,
                    'jsVendorVersion' => $jsVendorVersion,
                    'jsPolyfillsVersion' => $jsPolyfillsVersion,
                    'baseUrl' => $baseUrl,
                ],
                '_core/web/web-body.html'
            );
    }
}