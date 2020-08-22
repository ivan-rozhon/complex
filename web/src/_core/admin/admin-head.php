<?php

class AdminHead {
    public $admin;

    public function __construct(Admin $admin) {
        $this->admin = $admin;
        $this->templateProvider = $this->admin->templateProvider;
    }

    public function adminHead() {
        $baseUrl = $this->admin->sharedRouter->baseUrl();
        $description = $this->admin->adminConfig['description'];
        $keywords = $this->admin->adminConfig['keywords'];
        $author = $this->admin->adminConfig['author'];
        $title = $this->admin->adminConfig['title'];
        $faviconVersion = filemtime("favicon.ico");
        $cssAppVersion = filemtime("_core/admin/admin-app/admin-app.css");
        $baseUrl = $this->admin->sharedRouter->baseUrl();

        return $this->templateProvider->sharedTemplateProvider(
                [
                    'description' => $description,
                    'keywords' => $keywords,
                    'author' => $author,
                    'title' => $title,
                    'faviconVersion' => $faviconVersion,
                    'cssAppVersion' => $cssAppVersion,
                    'baseUrl' => $baseUrl
                ],
                '_core/admin/admin-head.html'
            );
    }
}