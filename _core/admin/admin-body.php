<?php

class AdminBody {
    public $admin;

    public function __construct(Admin $admin) {
        $this->admin = $admin;
    }

    public function adminBody() {
        return '
            <body>
                <p>Administration</p>
            </body>
        ';
    }
}

$adminBody = new AdminBody($admin);