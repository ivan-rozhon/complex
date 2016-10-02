<?php

class Admin {
    public $system;

    public function __construct(System $system) {
       $this->system = $system;
    }

    public function admin() {
        echo '
            <!DOCTYPE html>
            <html lang="en">
                <head>
                    <title>Admin</title>
                </head>
                <body>
                    Admin
                </body>
            </html>
        ';
    }
}

$admin = new Admin($system);

$admin->admin();