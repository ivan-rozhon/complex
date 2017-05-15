<?php

class AdminBody {
    public $admin;

    public function __construct(Admin $admin) {
        $this->admin = $admin;
        $this->templateProvider = $this->admin->templateProvider;
    }

    public function adminBody() {
        $jsLibVersion = filemtime("_core/admin/admin-app/js/lib.min.js");
        $jsAppVersion = filemtime("_core/admin/admin-app/js/app.min.js");
        $baseUrl = $this->admin->sharedRouter->baseUrl();

        return $this->templateProvider->sharedTemplateProvider(
                [
                    'jsLibVersion' => $jsLibVersion,
                    'jsAppVersion' => $jsAppVersion,
                    'baseUrl' => $baseUrl
                ],
                '_core/admin/admin-body.html'
            );
    }
}