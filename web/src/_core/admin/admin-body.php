<?php

class AdminBody {
    public $admin;

    public function __construct(Admin $admin) {
        $this->admin = $admin;
        $this->templateProvider = $this->admin->templateProvider;
    }

    public function adminBody() {
        $jsAppVersion = filemtime("_core/admin/admin-app/admin-app.js");
        $baseUrl = $this->admin->sharedRouter->baseUrl();

        return $this->templateProvider->sharedTemplateProvider(
                [
                    'jsAppVersion' => $jsAppVersion
                ],
                '_core/admin/admin-body.html'
            );
    }
}