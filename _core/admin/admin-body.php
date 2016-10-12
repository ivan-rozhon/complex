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

                <!-- Angular Material requires Angular.js Libraries -->
                <script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular.min.js"></script>
                <script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-animate.min.js"></script>
                <script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-aria.min.js"></script>
                <script src="http://ajax.googleapis.com/ajax/libs/angularjs/1.5.5/angular-messages.min.js"></script>

                <!-- Angular Material Library -->
                <script src="http://ajax.googleapis.com/ajax/libs/angular_material/1.1.0/angular-material.min.js"></script>

                <script src="_core/admin/adminApp/index.js?v='.filemtime("_core/admin/adminApp/index.js").'"></script>
                <script src="_core/admin/adminApp/adminApp.js?v='.filemtime("_core/admin/adminApp/adminApp.js").'"></script>
            </body>
        ';
    }
}

$adminBody = new AdminBody($admin);