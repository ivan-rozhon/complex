<?php

class WebBody {
    public $web;

    public function __construct(Web $web) {
       $this->web = $web;
    }

    public function webBody($webBodyNav, $webBodyMain, $webBodyFooter) {
        return '
            <body>
                '.$webBodyNav.'
                '.$webBodyMain.'
                '.$webBodyFooter.'
                <!-- jQuery -->
                <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
                <!-- Bootstrap core JavaScript -->
                <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js" integrity="sha384-Tc5IQib027qvyjSMfHjOMaLkfuWVxZxUPnCJA7l2mCWNIpG9mGCD8wGNIcPD7Txa" crossorigin="anonymous"></script>
            </body>
        ';
    }
}

$webBody = new webBody($web);

require './_core/web/web-body-header.php';
require './_core/web/web-body-nav.php';
require './_core/web/web-body-main.php';
require './_core/web/web-body-footer.php';