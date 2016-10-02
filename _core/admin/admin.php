<?php

class Admin {
    public $system, $sharedRouter, $adminSchema, $adminConfig;

    public function __construct(System $system, SharedRouter $sharedRouter) {
        $this->system = $system;
        $this->sharedRouter = $sharedRouter;
        $this->adminSchema = json_decode(file_get_contents('./_source/admin-schema.json'), TRUE)['adminSchema'];
        $this->adminConfig = json_decode(file_get_contents('./_source/admin-config.json'), TRUE)['adminConfig'];
    }

    public function admin($adminHead, $adminBody) {
        echo '
            <!DOCTYPE html>
            <html lang="'.$this->adminConfig['lang'].'">
                '.$adminHead.'
                '.$adminBody.'
            </html>
        ';
    }
}

$admin = new Admin($system, $sharedRouter);

require './_core/admin/admin-head.php';
require './_core/admin/admin-body.php';

$admin->admin(
    $adminHead->adminHead(),
    $adminBody->adminBody()
);