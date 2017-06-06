<?php

class Admin2Head {
    public $admin2;

    public function __construct(Admin2 $admin2) {
        $this->admin = $admin2;
        $this->templateProvider = $this->admin->templateProvider;
    }

    public function admin2Head() {
        $baseUrl = $this->admin->sharedRouter->baseUrl();
        $description = $this->admin->adminConfig['description'];
        $keywords = $this->admin->adminConfig['keywords'];
        $author = $this->admin->adminConfig['author'];
        $title = $this->admin->adminConfig['title'];
        $faviconVersion = filemtime("favicon.ico");
        $cssAppVersion = filemtime("_core/admin2/admin-app/app.css");
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
                '_core/admin2/admin2-head.html'
            );
    }
}