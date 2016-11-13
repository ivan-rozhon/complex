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
                
                <!-- Bower Components Lib -->
                <script src="_core/admin/admin-app/js/lib.min.js?v='.filemtime("_core/admin/admin-app/js/lib.min.js").'"></script>

                <!-- adminApp -->
                <script src="_core/admin/admin-app/js/app.min.js?v='.filemtime("_core/admin/admin-app/js/app.min.js").'"></script>
            </body>
        ';
    }
}