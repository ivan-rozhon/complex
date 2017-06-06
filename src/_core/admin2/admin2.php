<?php

class Admin2 {
    public $system, $sharedRouter, $adminConfig;

    public function __construct(System $system, SharedRouter $sharedRouter, SharedTemplateProvider $sharedTemplateProvider) {
        $this->system = $system;
        $this->sharedRouter = $sharedRouter;
        $this->templateProvider = $sharedTemplateProvider;
        $this->adminConfig = json_decode(file_get_contents('_source/admin-config.json'), TRUE)['adminConfig'];
    }

    public function admin2($admin2Head, $admin2Body) {
        $lang = $this->adminConfig['lang'];
        echo $this->templateProvider->sharedTemplateProvider(
                [
                    'lang' => $lang,
                    'adminHead' => $admin2Head,
                    'adminBody' => $admin2Body
                ],
                '_core/admin2/admin2.html'
            );
    }
}

$admin2 = new Admin2($system, $sharedRouter, $sharedTemplateProvider);

$admin2Head = new Admin2Head($admin2);
$admin2Body = new Admin2Body($admin2);

$admin2->admin2(
    $admin2Head->admin2Head(),
    $admin2Body->admin2Body()
);