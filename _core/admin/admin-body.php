<?php

class AdminBody {
    public $admin;

    public function __construct(Admin $admin) {
        $this->admin = $admin;
    }

    public function adminBody() {
        return '
            <body ng-app="adminApp">
                <admin-app></admin-app>
            </body>
        ';
    }
}

$adminBody = new AdminBody($admin);