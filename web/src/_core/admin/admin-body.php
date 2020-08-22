<?php

class AdminBody {
    public $admin;

    public function __construct(Admin $admin) {
        $this->admin = $admin;
        $this->templateProvider = $this->admin->templateProvider;
    }

    public function adminBody() {
        $jsPolyfillsVersion = filemtime("_core/admin/admin-app/polyfills.js");
        $jsVendorVersion = filemtime("_core/admin/admin-app/vendor.js");
        $jsAppVersion = filemtime("_core/admin/admin-app/app.js");
        $baseUrl = $this->admin->sharedRouter->baseUrl();

        return $this->templateProvider->sharedTemplateProvider(
                [
                    'jsPolyfillsVersion' => $jsPolyfillsVersion,
                    'jsVendorVersion' => $jsVendorVersion,
                    'jsAppVersion' => $jsAppVersion
                ],
                '_core/admin/admin-body.html'
            );
    }
}