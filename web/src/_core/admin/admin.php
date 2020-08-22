<?php

class Admin {
    public $system, $sharedRouter, $adminConfig;

    public function __construct(System $system, SharedRouter $sharedRouter, SharedTemplateProvider $sharedTemplateProvider) {
        $this->system = $system;
        $this->sharedRouter = $sharedRouter;
        $this->templateProvider = $sharedTemplateProvider;
        $this->adminConfig = json_decode(file_get_contents('_source/admin-config.json'), TRUE)['adminConfig'];
    }

    public function admin($adminHead, $adminBody) {
        $lang = $this->adminConfig['lang'];
        echo $this->templateProvider->sharedTemplateProvider(
                [
                    'lang' => $lang,
                    'adminHead' => $adminHead,
                    'adminBody' => $adminBody
                ],
                '_core/admin/admin.html'
            );
    }
}

$admin = new Admin($system, $sharedRouter, $sharedTemplateProvider);

$adminHead = new AdminHead($admin);
$adminBody = new AdminBody($admin);

$admin->admin(
    $adminHead->adminHead(),
    $adminBody->adminBody()
);