<?php

class Admin2Body {
    public $admin2;

    public function __construct(Admin2 $admin2) {
        $this->admin = $admin2;
        $this->templateProvider = $this->admin->templateProvider;
    }

    public function admin2Body() {
        $jsPolyfillsVersion = filemtime("_core/admin2/admin-app/polyfills.js");
        $jsVendorVersion = filemtime("_core/admin2/admin-app/vendor.js");
        $jsAppVersion = filemtime("_core/admin2/admin-app/app.js");
        $baseUrl = $this->admin->sharedRouter->baseUrl();

        return $this->templateProvider->sharedTemplateProvider(
                [
                    'jsPolyfillsVersion' => $jsPolyfillsVersion,
                    'jsVendorVersion' => $jsVendorVersion,
                    'jsAppVersion' => $jsAppVersion
                ],
                '_core/admin2/admin2-body.html'
            );
    }
}